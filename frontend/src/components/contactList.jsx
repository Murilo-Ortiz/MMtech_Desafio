import React from  'react';
import ContactCard from './contactCard';

function ContactList({
    contacts,
    isLoading,
    error,
    searchTerm,
    onSearchChange,
    onEditContact,
    onDeleteContact,
    loggedInUserId,
    onShowDetails
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
                aria-label="Buscar contatos por nome"
            />

            {isLoading && <p>Carregando...</p>}
            {error && <p className='error'>{error}</p>}

            {!isLoading&&!error&&(
                <ul className='contact-list' role="list">
                    {contacts.length > 0?(
                        contacts.map(contact=>(
                            <ContactCard
                                key={contact._id}
                                contact={contact}
                                onEdit={onEditContact}
                                onDelete={onDeleteContact}
                                loggedInUserId={loggedInUserId}
                                onShowDetails={onShowDetails}
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
