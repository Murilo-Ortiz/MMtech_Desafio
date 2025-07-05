import React, { useState, useEffect, useCallback } from 'react';
import * as api from './services/api.js';
import ContactForm from './components/contactForm.jsx'
import ContactList from './components/contactList.jsx'
import './App.css';

const formatPhoneNumber = (value) => {
  const cleaned = ('' + value).replace(/\D/g, '');
  const truncated = cleaned.slice(0, 11);

  let match = truncated.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  if (truncated.length > 6) {
    return `(${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`;
  }
  if (truncated.length > 2) {
    return `(${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
  }
  if (truncated.length > 0) {
    return `(${truncated}`;
  }

  return truncated;
};


function App() {

  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({nome:'', email:'', telefone:''});

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getAllData(searchTerm);
      setContacts(response.data.map(c=>({...c, telefone: formatPhoneNumber(c.telefone)})));
    } catch (err) {
      setError('Falha ao carregar contatos.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este contato?')) {
      try {
        await api.deleteContato(id);
        fetchContacts();
      } catch (err) {
        setError('Erro ao deletar contato.');
        console.error(err);
      }
    }
  };

  const handleEdit = (contact) =>{
    setEditingContact(contact);
    setFormData(contact);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setFormData({nome:'', email:'', telefone:''});
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const dataToSend = {...formData, telefone: formData.telefone.replace(/\D/g, '')};
    if(editingContact){
      await api.updateContato(editingContact._id, dataToSend);
    }else{
      await api.postNewContato(dataToSend);
    }

    handleCancelEdit();
    fetchContacts();
  }

  const handleFormChange = (newFormData) => {
    if(newFormData.telefone !== formData.telefone){
      newFormData.telefone = formatPhoneNumber(newFormData.telefone);
    }
    setFormData(newFormData);
  };

  return (
    <div className="container">
      <header>
        <h1>Agenda de Contatos MMTech</h1>
      </header>

      <main>
        <ContactForm
          formData={formData}
          isEditing={!!editingContact}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onCancelEdit={handleCancelEdit}
        />

        <ContactList
          contacts={contacts}
          isLoading={isLoading}
          error = {error}
          searchTerm = {searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onEditContact = {handleEdit}
          onDeleteContact = {handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
