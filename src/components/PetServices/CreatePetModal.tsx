import React, { useState } from 'react';
import { X, Dog, Loader2 } from 'lucide-react';
import type { PetServiceData } from '../../interface/PetServiceData';

interface CreatePetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PetServiceData) => Promise<void>;
  isSubmitting: boolean;
}

export const CreatePetModal: React.FC<CreatePetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting
}) => {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [serviceType, setServiceType] = useState('Banho');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName || !breed || !ownerPhone || !serviceType) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await onSubmit({ petName, breed, ownerPhone, serviceType });
      setPetName('');
      setBreed('');
      setOwnerPhone('');
      setServiceType('Banho');
      setError('');
      onClose();
    } catch (err) {
      setError('Erro ao cadastrar serviço.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Novo Serviço Pet</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {error && <div className="modal-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="petName">Nome do Animal *</label>
            <input
              id="petName"
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Ex: Rex"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="breed">Raça *</label>
              <input
                id="breed"
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="Ex: Poodle"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ownerPhone">Tel. do Responsável *</label>
              <input
                id="ownerPhone"
                type="text"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="serviceType">Serviço *</label>
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="search-input"
              style={{ border: '1px solid var(--border-color)', padding: '0.65rem 0.9rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-input)' }}
            >
              <option value="Banho">Banho</option>
              <option value="Tosa">Tosa</option>
              <option value="Banho e Tosa">Banho e Tosa</option>
              <option value="Consulta Veterinária">Consulta Veterinária</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="spinner" size={16} /> Salvando...
                </>
              ) : (
                <>
                  <Dog size={16} /> Cadastrar Serviço
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
