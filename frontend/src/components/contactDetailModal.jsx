import React from 'react';

function ContactDetailModal({ isOpen, onClose, contact }) {
  if (!isOpen || !contact) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalhes do Contato</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p><strong>Nome:</strong> {contact.nome}</p>
          <p><strong>E-mails:</strong></p>
          <ul>
            {contact.emails && contact.emails.length > 0 ? (
              contact.emails.map((email, index) => (
                <li key={index}>{email}</li>
              ))
            ) : (
              <li>Nenhum e-mail cadastrado.</li>
            )}
          </ul>
          <p><strong>Telefones:</strong></p>
          <ul>
            {contact.telefones && contact.telefones.length > 0 ? (
              contact.telefones.map((telefone, index) => (
                <li key={index}>{telefone}</li>
              ))
            ) : (
              <li>Nenhum telefone cadastrado.</li>
            )}
          </ul>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default ContactDetailModal;
