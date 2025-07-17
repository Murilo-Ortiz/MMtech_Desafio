import React from 'react';

function ContactCard({ contact, onEdit, onDelete, onShowDetails, loggedInUserId }) {
  const isOwner = loggedInUserId === contact.userId;

  const firstEmail = contact.emails && contact.emails.length > 0 ? contact.emails[0] : 'N/A';
  const firstTelefone = contact.telefones && contact.telefones.length > 0 ? contact.telefones[0] : 'N/A';

  const hasMoreEmails = contact.emails && contact.emails.length > 1;
  const hasMoreTelefones = contact.telefones && contact.telefones.length > 1;

  return (
    <li className="contact-item">
      <div className="contact-info">
        <strong>{contact.nome}</strong>
        <div className="contact-details">
          <span>{firstEmail} {hasMoreEmails && `(+${contact.emails.length - 1})`}</span>
        </div>
        <div className="contact-details">
          <span>{firstTelefone} {hasMoreTelefones && `(+${contact.telefones.length - 1})`}</span>
        </div>
      </div>
      
      <div className="contact-actions">
        {isOwner && (
          <>
            <button onClick={() => onEdit(contact)}>Editar</button>
            <button className="delete-btn" onClick={() => onDelete(contact)}>Apagar</button>
          </>
        )}
        <button onClick={() => onShowDetails(contact)} className="view-details-btn">Ver Detalhes</button>
      </div>
    </li>
  );
}

export default ContactCard;
