export interface HistoryData {
  id: number;
  productName: string;
  actionType: 'ADD' | 'EDIT' | 'SELL' | 'DELETE';
  quantityChange: number;
  oldPrice: number | null;
  newPrice: number | null;
  timestamp: string;
  details: string;
}
