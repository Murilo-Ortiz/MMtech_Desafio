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
            <button type="button" className="close-form-btn" onClick={onCloseForm} aria-label="Fechar formulário de contato">&times;</button>
        </div>

        <input
          type="text"
          name="nome"
          placeholder="Nome Completo"
          value={formData.nome || ''}
          onChange={(e) => onFieldChange('nome', null, e.target.value)}
          required
        />

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
                aria-label={`E-mail ${index + 1}`}
              />
              {formData.emails.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => onRemoveField('emails', index)} aria-label={`Remover e-mail ${index + 1}`}>&ndash;</button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => onAddField('emails')} aria-label="Adicionar novo campo de e-mail">+ Adicionar E-mail</button>
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
                aria-label={`Telefone ${index + 1}`}
              />
              {formData.telefones.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => onRemoveField('telefones', index)} aria-label={`Remover telefone ${index + 1}`}>&ndash;</button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => onAddField('telefones')} aria-label="Adicionar novo campo de telefone">+ Adicionar Telefone</button>
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
