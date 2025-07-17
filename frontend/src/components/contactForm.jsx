import React from 'react';

function ContactForm({
  formData,
  isEditing,
  onSubmit,
  onCancelEdit,
  onAddField,
  onRemoveField,
  onFieldChange,
  validationErrors,
  onCloseForm 
}) {

  return (
    <div className="form-section">
      <form onSubmit={onSubmit} noValidate>
        <div className="form-header"> 
            <h2>{isEditing ? 'Editando Contato' : 'Adicionar Novo Contato'}</h2>
            <button type="button" className="close-form-btn" onClick={onCloseForm}>&times;</button>
        </div>

        <input
          type="text"
          name="nome"
          placeholder="Nome Completo"
          value={formData.nome || ''}
          onChange={(e) => onFieldChange('nome', null, e.target.value)}
          required
        />
        {validationErrors.nome && (
            <p className="validation-error">{validationErrors.nome.join(', ')}</p>
        )}

        <div className="dynamic-field-group">
          <label>E-mails</label>
          {(formData.emails || []).map((email, index) => (
            <div key={index} className="dynamic-field">
              <input
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => onFieldChange('emails', index, e.target.value)}
                required
              />
              {formData.emails.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => onRemoveField('emails', index)}>&ndash;</button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => onAddField('emails')}>+ Adicionar E-mail</button>
          {validationErrors.emails && (
              <p className="validation-error">{validationErrors.emails.join(', ')}</p>
          )}
        </div>

        <div className="dynamic-field-group">
          <label>Telefones</label>
          {(formData.telefones || []).map((telefone, index) => (
            <div key={index} className="dynamic-field">
              <input
                type="tel"
                placeholder="(XX) XXXXX-XXXX"
                value={telefone}
                onChange={(e) => onFieldChange('telefones', index, e.target.value)}
                maxLength="15"
                required
              />
              {formData.telefones.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => onRemoveField('telefones', index)}>&ndash;</button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => onAddField('telefones')}>+ Adicionar Telefone</button>
          {validationErrors.telefones && (
              <p className="validation-error">{validationErrors.telefones.join(', ')}</p>
          )}
        </div>

        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Adicionar Contato'}</button>
        {isEditing && (
          <button type="button" onClick={onCancelEdit}>Cancelar</button>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
