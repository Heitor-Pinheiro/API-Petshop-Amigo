import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { ProductData } from '../../interface/ProductData';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductData) => Promise<void>;
  isSubmitting: boolean;
}

export const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('O nome é obrigatório.');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('O preço deve ser um número maior que zero.');
      return;
    }

    const qtyNum = parseInt(quantity);
    if (isNaN(qtyNum) || qtyNum < 0) {
      setError('A quantidade deve ser um número maior ou igual a zero.');
      return;
    }

    try {
      await onSubmit({
        name,
        description,
        price: priceNum,
        quantity: qtyNum,
        image
      });
      // Clear fields
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setImage('');
      onClose();
    } catch (err: any) {
      setError(err.response?.data || 'Erro ao cadastrar produto.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Adicionar Novo Produto</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="modal-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="prod-name">Nome do Produto *</label>
            <input 
              id="prod-name"
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Ex: Ração para Gatos 1kg"
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prod-price">Preço (R$) *</label>
              <input 
                id="prod-price"
                type="number" 
                step="0.01" 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                placeholder="0.00"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="prod-qty">Quantidade em Estoque *</label>
              <input 
                id="prod-qty"
                type="number" 
                value={quantity} 
                onChange={e => setQuantity(e.target.value)} 
                placeholder="0"
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="prod-image">URL da Imagem (opcional)</label>
            <input 
              id="prod-image"
              type="url" 
              value={image} 
              onChange={e => setImage(e.target.value)} 
              placeholder="https://exemplo.com/imagem.png"
            />
          </div>

          <div className="form-group">
            <label htmlFor="prod-desc">Descrição</label>
            <textarea 
              id="prod-desc"
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Breve descrição do produto..."
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Cadastrando...' : 'Adicionar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
