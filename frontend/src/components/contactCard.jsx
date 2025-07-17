import React from 'react';
import { formatPhoneNumber } from '../pages/ContactPage.jsx';

function ContactCard({ contact, onEdit, onDelete, onShowDetails, loggedInUserId }) {
  const isOwner = loggedInUserId === contact.userId;

  const firstEmail = contact.emails && contact.emails.length > 0 ? contact.emails[0] : 'N/A';
  const firstTelefone = contact.telefones && contact.telefones.length > 0 ? formatPhoneNumber(contact.telefones[0]) : 'N/A';

  const hasMoreEmails = contact.emails && contact.emails.length > 1;
  const hasMoreTelefones = contact.telefones && contact.telefones.length > 1;

  return (
    <li className="contact-item" aria-labelledby={`contact-name-${contact._id}`}>
      <div className="contact-info">
        <strong id={`contact-name-${contact._id}`}>{contact.nome}</strong>
        <div className="contact-details email-display">
          <span>{firstEmail} {hasMoreEmails && `(+${contact.emails.length - 1} mais)`}</span>
        </div>
        <div className="contact-details">
          <span>{firstTelefone} {hasMoreTelefones && `(+${contact.telefones.length - 1} mais)`}</span>
        </div>
      </div>
      
      <div className="contact-actions">
        {isOwner && (
          <>
            <button onClick={() => onEdit(contact)} aria-label={`Editar contato de ${contact.nome}`}>Editar</button>
            <button className="delete-btn" onClick={() => onDelete(contact)} aria-label={`Apagar contato de ${contact.nome}`}>Apagar</button>
          </>
        )}
        <button onClick={() => onShowDetails(contact)} className="view-details-btn" aria-label={`Ver detalhes de ${contact.nome}`}>Ver Detalhes</button>
      </div>
    </li>
  );
}

export default ContactCard;
