import React from 'react';

function ContactCard({ contact, onEdit, onDelete, loggedInUserId }) {
  const isOwner = loggedInUserId === contact.userId;

  return (
    <li className="contact-item">
      <div className="contact-info">
        <strong>{contact.nome}</strong>
        <span>{contact.email}</span>
        <span>{contact.telefone}</span>
      </div>
      
      {isOwner && (
        <div className="contact-actions">
          <button onClick={() => onEdit(contact)}>Editar</button>
          <button className="delete-btn" onClick={() => onDelete(contact)}>Apagar</button>
        </div>
      )}
    </li>
  );
}

export default ContactCard;
