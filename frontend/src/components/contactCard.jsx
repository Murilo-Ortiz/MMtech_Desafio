import React from 'react';

function ContactCard({ contact, onEdit, onDelete, loggedInUserId }) {
  const isOwner = loggedInUserId === contact.userId;

  return (
    <li className="contact-item">
      <div className="contact-info">
        <strong>{contact.nome}</strong>
        <div className="contact-details">
          {contact.emails.map((email, index) => <span key={index}>{email}</span>)}
        </div>
        <div className="contact-details">
          {contact.telefones.map((telefone, index) => <span key={index}>{telefone}</span>)}
        </div>
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
