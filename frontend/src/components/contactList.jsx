import React from  'react';
import ContactCard from './contactCard';

function ContactList({
    contacts,
    isLoading,
    error,
    searchTerm,
    onSearchChange, 
    onEditContact,
    onDeleteContact
}){
    return(
        <div className='list-section'>
            <h2>Contatos</h2>
            <input
                type='search'
                placeholder='Buscar por Nome'
                className='search-input'
                value={searchTerm}
                onChange={onSearchChange}
            />

            {isLoading && <p>Carregando...</p>}
            {error && <p className='error'>{error}</p>}

            {!isLoading&&!error&&(
                <ul className='contact-list'>
                    {contacts.length > 0?(
                        contacts.map(contact=>(
                            <ContactCard
                                key={contact._id}
                                contato={contact}
                                onEdit={onEditContact}
                                onDelete={onDeleteContact}
                            />
                        ))
                    ):(
                        <p>Nenhum Contato encontrado.</p>
                    )}
                </ul> 
            )}
        </div>
    );
}

export default ContactList;