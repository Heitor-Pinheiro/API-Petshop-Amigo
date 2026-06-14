import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { ProductData } from '../../interface/ProductData';

interface SellModalProps {
  isOpen: boolean;
  product: ProductData | null;
  onClose: () => void;
  onSubmit: (id: number, quantity: number) => Promise<void>;
  isSubmitting: boolean;
}

export const SellModal: React.FC<SellModalProps> = ({ isOpen, product, onClose, onSubmit, isSubmitting }) => {
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setQuantity('1');
      setError('');
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const qtyNum = parseInt(quantity);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      setError('A quantidade deve ser um número maior que zero.');
      return;
    }

    if (qtyNum > product.quantity) {
      setError(`Quantidade máxima disponível para venda é de ${product.quantity} unidades.`);
      return;
    }

    try {
      if (product.id) {
        await onSubmit(product.id, qtyNum);
        onClose();
      }
    } catch (err: any) {
      setError(err.response?.data || 'Erro ao processar venda.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-content-small">
        <div className="modal-header">
          <h2>Registrar Venda</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="modal-error">{error}</div>}
          
          <div className="sell-info-summary">
            <p><strong>Produto:</strong> {product.name}</p>
            <p><strong>Preço Unitário:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</p>
            <p><strong>Estoque Disponível:</strong> {product.quantity} un.</p>
          </div>

          <div className="form-group">
            <label htmlFor="sell-qty">Quantidade a Vender *</label>
            <input 
              id="sell-qty"
              type="number" 
              min="1" 
              max={product.quantity}
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} 
              required 
            />
          </div>

          {quantity && !isNaN(parseInt(quantity)) && parseInt(quantity) > 0 && parseInt(quantity) <= product.quantity && (
            <div className="sell-total-preview">
              <span>Total da Venda:</span>
              <strong>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price * parseInt(quantity))}
              </strong>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary btn-primary-success" disabled={isSubmitting}>
              {isSubmitting ? 'Processando...' : 'Confirmar Venda'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
