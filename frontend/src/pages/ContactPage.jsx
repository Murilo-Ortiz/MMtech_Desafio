import React, { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ContactList from '../components/ContactList.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { toast } from 'react-toastify';

const formatPhoneNumber = (value) => {
  if (!value) return '';
  const cleaned = ('' + value).replace(/\D/g, '');
  const truncated = cleaned.slice(0, 11);
  let match = truncated.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) return `(${match[1]}) ${match[2]}-${match[3]}`;
  match = truncated.match(/^(\d{2})(\d{4})(\d{4})$/);
  if (match) return `(${match[1]}) ${match[2]}-${match[3]}`;
  return truncated;
};

function ContactsPage() {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '' });

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getContacts(searchTerm);
      if (Array.isArray(response.data)) {
        setContacts(response.data.map(c => ({...c, telefone: formatPhoneNumber(c.telefone)})));
      } else {
        setContacts([]);
      }
    } catch (err) {
      setError('Falha ao carregar contatos.');
      toast.error('A sua sessão pode ter expirado. Faça login novamente.');
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, logout]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem a certeza de que deseja eliminar este contato?')) {
      try {
        await api.deleteContact(id);
        toast.success('Contato eliminado com sucesso!');
        fetchContacts();
      } catch (error) {
        toast.error('Erro ao eliminar o contato.');
      }
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData(contact);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setFormData({ nome: '', email: '', telefone: '' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, telefone: formData.telefone.replace(/\D/g, '') };
    try {
      if (editingContact) {
        await api.updateContact(editingContact._id, dataToSend);
        toast.success(`Contato de ${formData.nome} atualizado!`);
      } else {
        await api.createContact(dataToSend);
        toast.success(`Contato ${formData.nome} adicionado!`);
      }
      handleCancelEdit();
      fetchContacts();
    } catch (error) {
      toast.error('Falha ao guardar o contato.');
    }
  };

  const handleFormChange = (newFormData) => {
    if (newFormData.telefone !== formData.telefone) {
      newFormData.telefone = formatPhoneNumber(newFormData.telefone);
    }
    setFormData(newFormData);
  };

  return (
    <div className="container">
      <header className="page-header">
        <h1>Agenda de Contatos MMTech</h1>
        <div className="header-user-info">
          <span>Olá, {user?.nome || 'Utilizador'}!</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
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
          error={error}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onEditContact={handleEdit}
          onDeleteContact={handleDelete}
        />
      </main>
    </div>
  );
}

export default ContactsPage;