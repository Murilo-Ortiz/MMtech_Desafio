import React from 'react';

function ContactCard({contato, onEdit, onDelete, loggedInUserId}){
    return(
        <li className='contact-item'>
            <div className='contact-info'>
                <strong>{contato.nome}</strong>
                <strong>{contato.email}</strong>
                <strong>{contato.telefone}</strong>
            </div>
            {isOwner && (
                <div className="contact-actions">
                    <button onClick={() => onEdit(contact)}>Editar</button>
                    <button className="delete-btn" onClick={() => onDelete(contact._id)}>Apagar</button>
                </div>
            )}
        </li>
    );
}

export default ContactCard;