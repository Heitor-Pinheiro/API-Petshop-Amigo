import React from 'react';
import { Edit2, Trash2, ShoppingCart } from 'lucide-react';
import type { ProductData } from '../../interface/ProductData';

interface CardProps {
  product: ProductData;
  onEdit: (product: ProductData) => void;
  onDelete: (id: number) => void;
  onSell: (product: ProductData) => void;
}

export const Card: React.FC<CardProps> = ({ product, onEdit, onDelete, onSell }) => {
  const fallbackImage = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400"; // Beautiful cute dog

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img 
          src={product.image || fallbackImage} 
          alt={product.name} 
          className="product-card-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
        />
        {product.quantity === 0 && (
          <span className="out-of-stock-badge">Esgotado</span>
        )}
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-description">{product.description || "Sem descrição disponível."}</p>
        <div className="product-card-info">
          <span className="product-card-price">{formattedPrice}</span>
          <span className={`product-card-stock ${product.quantity <= 3 ? 'low-stock' : ''}`}>
            Estoque: {product.quantity}
          </span>
        </div>
      </div>
      <div className="product-card-actions">
        <button 
          className="btn-action btn-sell" 
          onClick={() => onSell(product)}
          disabled={product.quantity === 0}
          title="Registrar Venda"
        >
          <ShoppingCart size={16} />
          Vender
        </button>
        <button 
          className="btn-action btn-edit" 
          onClick={() => onEdit(product)}
          title="Editar Produto"
        >
          <Edit2 size={16} />
          Editar
        </button>
        <button 
          className="btn-action btn-delete" 
          onClick={() => product.id && onDelete(product.id)}
          title="Deletar Produto"
        >
          <Trash2 size={16} />
          Excluir
        </button>
      </div>
    </div>
  );
};
