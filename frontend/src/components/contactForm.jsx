import React from 'react';

function ContactForm({
    formData,
    isEditing,
    onFormChange,
    onSubmit,
    onCancelEdit
}){
    const handleChange =(e) =>{
        const {name, value} = e.target;
        onFormChange({...formData, [name]:value});
    };

    return(
        <div className='form-section'>
            <form onSubmit={onSubmit}>
                <h2>{isEditing ? 'Editando Contato': 'Adicionar Novo Contato'}</h2>
                <input
                    type='text'
                    name='nome'
                    placeholder='Nome'
                    value={formData.nome}
                    onChange={handleChange}
                />
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}

                />
                <input
                    type='tel'
                    name='telefone'
                    placeholder='(XX) XXXXX-XXXX'
                    value={formData.telefone}
                    onChange={handleChange}
                    maxLength='15'
                />
                <button type='submit'>{isEditing ? 'Salvar Alterações' : 'Adicionar Contato'}</button>
                {isEditing && (
                    <button type='button' onClick={onCancelEdit}> Cancelar </button>
                )}
            </form>
        </div>
    );
}

export default ContactForm;