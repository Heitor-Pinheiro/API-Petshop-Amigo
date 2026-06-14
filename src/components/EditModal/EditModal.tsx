import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { ProductData } from '../../interface/ProductData';

interface EditModalProps {
  isOpen: boolean;
  product: ProductData | null;
  onClose: () => void;
  onSubmit: (id: number, data: ProductData) => Promise<void>;
  isSubmitting: boolean;
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, product, onClose, onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description || '');
      setPrice(product.price.toString());
      setQuantity(product.quantity.toString());
      setImage(product.image || '');
      setError('');
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

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
      if (product.id) {
        await onSubmit(product.id, {
          name,
          description,
          price: priceNum,
          quantity: qtyNum,
          image
        });
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data || 'Erro ao editar produto.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Produto</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="modal-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="edit-name">Nome do Produto *</label>
            <input 
              id="edit-name"
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-price">Preço (R$) *</label>
              <input 
                id="edit-price"
                type="number" 
                step="0.01" 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-qty">Quantidade em Estoque *</label>
              <input 
                id="edit-qty"
                type="number" 
                value={quantity} 
                onChange={e => setQuantity(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="edit-image">URL da Imagem (opcional)</label>
            <input 
              id="edit-image"
              type="url" 
              value={image} 
              onChange={e => setImage(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-desc">Descrição</label>
            <textarea 
              id="edit-desc"
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
