// src/App.js (exemplo inicial)
import React, { useState, useEffect } from 'react';
import { getAllData } from './services/api';

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await getAllData();
        setContacts(response.data);
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
      <h1>Time MMTech</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.nome} - {contact.email} - {contact.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;