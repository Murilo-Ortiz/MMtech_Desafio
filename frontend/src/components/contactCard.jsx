import React from 'react';

function ContactCard({contato, onEdit, onDelete}){
    return(
        <li className='contact-item'>
            <div className='contact-info'>
                <strong>{contato.name}</strong>
                <strong>{contato.email}</strong>
                <strong>{contato.telefone}</strong>
            </div>
            <div className='contact-actions'>
                <button onClick={()=> onEdit(contato)}>Editar</button>
                <button className='delete-btn' onClick={()=>onDelete(contato._id)}>Deletar</button>
            </div>
        </li>
    );
}

export default ContactCard;