import React, { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ContactList from '../components/contactList.jsx';
import ContactForm from '../components/contactForm.jsx';
import ConfirmationModal from '../components/confirmationModel.jsx';
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

const initialFormState = { nome: '', emails: [''], telefones: [''] };

function ContactsPage() {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const [isFormOpen, setIsFormOpen] = useState(false);


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
      setError('Falha ao carregar contatos. A sua sessão pode ter expirado.');
      toast.error('A sua sessão pode ter expirado. Faça login novamente.');
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, logout]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleDeleteRequest = (contact) => {
    setContactToDelete(contact);
  };

  const handleConfirmDelete = async () => {
    if (!contactToDelete) return;
    try {
      await api.deleteContact(contactToDelete._id);
      toast.success('Contato eliminado com sucesso!');
      fetchContacts();
    } catch (error) {
      toast.error('Erro ao eliminar o contato.');
    } finally {
      setContactToDelete(null);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      ...contact,
      emails: Array.isArray(contact.emails) ? contact.emails : [contact.emails],
      telefones: Array.isArray(contact.telefones) ? contact.telefones : [contact.telefones],
    });
    setIsFormOpen(true); 
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setFormData(initialFormState);
    setIsFormOpen(false); 
    setValidationErrors({});
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({}); 

    const dataToSend = {
      nome: formData.nome,
      emails: (formData.emails || []).filter(e => e),
      telefones: (formData.telefones || []).map(t => t.replace(/\D/g, '')).filter(t => t),
    };

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
      if (error.response && error.response.status === 400 && error.response.data.errors) {
          setValidationErrors(error.response.data.errors);
          toast.error(error.response.data.message || 'Verifique os campos do formulário.');
          setIsFormOpen(true); 
      } else {
          const errorMessage = error.response?.data?.message || 'Falha ao guardar o contato.';
          toast.error(errorMessage);
          console.error(error);
      }
    }
  };

  const handleAddField = (field) => {
    setFormData(prev => ({
       ...prev,
        [field]: [...(prev[field] || []), ''] }));
  };

  const handleRemoveField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field]||[]).filter((_, i) => i !== index),
    }));
  };

  const handleFieldChange = (field, index, value) => {
    setFormData(prev => {
      if (index === null) {
        return { ...prev, [field]: value };
      }
      const updatedArray = [...(prev[field] || [])];
      updatedArray[index] = field === 'telefones' ? formatPhoneNumber(value) : value;
      return { ...prev, [field]: updatedArray };
    });
  };

  return (
    <>
      <div className="container">
        <main>
          {!isFormOpen && (
            <button onClick={() => setIsFormOpen(true)} className="add-new-contact-btn">
              + Adicionar Novo Contato
            </button>
          )}

          {isFormOpen && (
            <ContactForm
              formData={formData}
              isEditing={!!editingContact}
              onSubmit={handleFormSubmit}
              onCancelEdit={handleCancelEdit}
              onAddField={handleAddField}
              onRemoveField={handleRemoveField}
              onFieldChange={handleFieldChange}
              validationErrors={validationErrors}
              onCloseForm={() => setIsFormOpen(false)} 
            />
          )}
          <ContactList
            contacts={contacts}
            isLoading={isLoading}
            error={error}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            onEditContact={handleEdit}
            onDeleteContact={handleDeleteRequest}
            loggedInUserId={user?.id}
          />
        </main>
      </div>

      <ConfirmationModal
        isOpen={!!contactToDelete}
        onClose={() => setContactToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminação"
      >
        <p>Tem a certeza de que deseja eliminar o contato de <strong>{contactToDelete?.nome}</strong>?</p>
        <p>Esta ação não pode ser desfeita.</p>
      </ConfirmationModal>
    </>
  );
}

export default ContactsPage;
