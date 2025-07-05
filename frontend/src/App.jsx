import React, { useState, useEffect, useCallback } from 'react';
import * as api from './services/api.js';
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
  const [newContact, setNewContact] = useState({ nome: '', email: '', telefone: '' });
  const [editingContact, setEditingContact] = useState(null);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getAllData(searchTerm);
      setContacts(response.data);
    } catch (err) {
      setError('Falha ao carregar contatos. O backend está rodando?');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);


  const handlePhoneChange = (e, formType) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    if (formType === 'new') {
      setNewContact({ ...newContact, telefone: formattedPhone });
    } else if (formType === 'edit') {
      setEditingContact({ ...editingContact, telefone: formattedPhone });
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newContact.nome || !newContact.email || !newContact.telefone) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      const contactToSend = { ...newContact, telefone: newContact.telefone.replace(/\D/g, '') };
      await api.postNewContato(contactToSend);
      setNewContact({ nome: '', email: '', telefone: '' });
      fetchContacts();
    } catch (err) {
      setError('Erro ao criar contato.');
      console.error(err);
    }
  };

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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactToUpdate = {
        nome: editingContact.nome,
        email: editingContact.email,
        telefone: editingContact.telefone.replace(/\D/g, ''),
      };
      await api.updateContato(editingContact._id, contactToUpdate);
      setEditingContact(null);
      fetchContacts();
    } catch (err) {
      setError('Erro ao atualizar contato.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Agenda de Contatos MMTech</h1>
      </header>

      <main>
        <div className="form-section">
          {editingContact ? (
            <form onSubmit={handleUpdateSubmit}>
              <h2>Editando Contato</h2>
              <input
                type="text"
                placeholder="Nome"
                value={editingContact.nome}
                onChange={(e) => setEditingContact({ ...editingContact, nome: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={editingContact.email}
                onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="(XX) XXXXX-XXXX"
                value={editingContact.telefone}
                onChange={(e) => handlePhoneChange(e, 'edit')}
                maxLength="15"
              />
              <button type="submit">Salvar Alterações</button>
              <button type="button" onClick={() => setEditingContact(null)}>Cancelar</button>
            </form>
          ) : (
            <form onSubmit={handleCreateSubmit}>
              <h2>Adicionar Novo Contato</h2>
              <input
                type="text"
                placeholder="Nome"
                value={newContact.nome}
                onChange={(e) => setNewContact({ ...newContact, nome: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="(XX) XXXXX-XXXX"
                value={newContact.telefone}
                onChange={(e) => handlePhoneChange(e, 'new')}
                maxLength="15"
              />
              <button type="submit">Adicionar Contato</button>
            </form>
          )}
        </div>

        <div className="list-section">
          <h2>Contatos</h2>
          <input
            type="search"
            placeholder="Buscar por nome..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {isLoading && <p>Carregando...</p>}
          {error && <p className="error">{error}</p>}

          {!isLoading && !error && (
            <ul className="contact-list">
              {contacts.length > 0 ? (
                contacts.map(contact => (
                  <li key={contact._id} className="contact-item">
                    <div className="contact-info">
                      <strong>{contact.nome}</strong>
                      <span>{contact.email}</span>
                      <span>{formatPhoneNumber(contact.telefone)}</span>
                    </div>
                    <div className="contact-actions">
                      <button onClick={() => setEditingContact({ ...contact, telefone: formatPhoneNumber(contact.telefone) })}>Editar</button>
                      <button className="delete-btn" onClick={() => handleDelete(contact._id)}>Deletar</button>
                    </div>
                  </li>
                ))
              ) : (
                <p>Nenhum contato encontrado.</p>
              )}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
