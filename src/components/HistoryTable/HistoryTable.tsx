import React from 'react';
import type { HistoryData } from '../../interface/HistoryData';
import { PlusCircle, Edit, ShoppingBag, Trash } from 'lucide-react';

interface HistoryTableProps {
  historyList: HistoryData[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ historyList }) => {
  const getActionBadge = (type: string) => {
    switch (type) {
      case 'ADD':
        return (
          <span className="badge badge-add">
            <PlusCircle size={12} />
            Adição
          </span>
        );
      case 'EDIT':
        return (
          <span className="badge badge-edit">
            <Edit size={12} />
            Edição
          </span>
        );
      case 'SELL':
        return (
          <span className="badge badge-sell">
            <ShoppingBag size={12} />
            Venda
          </span>
        );
      case 'DELETE':
        return (
          <span className="badge badge-delete">
            <Trash size={12} />
            Exclusão
          </span>
        );
      default:
        return <span className="badge">{type}</span>;
    }
  };

  const formatCurrency = (val: number | null) => {
    if (val === null || val === undefined) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date);
    } catch {
      return dateString;
    }
  };

  if (!historyList || historyList.length === 0) {
    return (
      <div className="empty-history-container">
        <p className="empty-history-text">Nenhuma atividade registrada este mês.</p>
      </div>
    );
  }

  return (
    <div className="history-table-container">
      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Ação</th>
              <th>Produto</th>
              <th>Alteração no Estoque</th>
              <th>Preço Antigo</th>
              <th>Preço Novo</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {historyList.map((item) => (
              <tr key={item.id}>
                <td className="cell-date">{formatDate(item.timestamp)}</td>
                <td>{getActionBadge(item.actionType)}</td>
                <td className="cell-product-name">{item.productName}</td>
                <td className={`cell-stock-change ${item.quantityChange > 0 ? 'text-positive' : item.quantityChange < 0 ? 'text-negative' : ''}`}>
                  {item.quantityChange > 0 ? `+${item.quantityChange}` : item.quantityChange}
                </td>
                <td className="cell-price">{formatCurrency(item.oldPrice)}</td>
                <td className="cell-price">{formatCurrency(item.newPrice)}</td>
                <td className="cell-details">{item.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
