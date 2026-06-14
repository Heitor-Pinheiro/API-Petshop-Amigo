import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Plus, Loader2, AlertTriangle, Dog } from 'lucide-react';
import { Navbar } from './components/Navbar/Navbar';
import { Card } from './components/Card/Card';
import { CreateModal } from './components/CreateModal/CreateModal';
import { EditModal } from './components/EditModal/EditModal';
import { SellModal } from './components/SellModal/SellModal';
import { HistoryTable } from './components/HistoryTable/HistoryTable';
import { SearchBar } from './components/Search/search';
import { useProductData } from './hooks/useProductData';
import { useHistoryData } from './hooks/useHistoryData';
import { useProductMutations } from './hooks/useProductMutations';
import type { ProductData } from './interface/ProductData';
import { Login } from './components/Login/Login';
import { PetServicesView } from './components/PetServices/PetServicesView';

const queryClient = new QueryClient();

function MainContent({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'products' | 'summary' | 'pets'>('products');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [sellingProduct, setSellingProduct] = useState<ProductData | null>(null);

  const [productSearch, setProductSearch] = useState('');
  const [historySearch, setHistorySearch] = useState('');

  // Queries
  const { data: products, isLoading: loadingProducts, isError: errorProducts } = useProductData();
  const { data: historyList, isLoading: loadingHistory, isError: errorHistory } = useHistoryData();

  // Mutations
  const { createProduct, isCreating, updateProduct, isUpdating, deleteProduct, sellProduct, isSelling } = useProductMutations();

  const handleCreate = async (data: ProductData) => {
    await createProduct(data);
  };

  const handleEdit = async (id: number, data: ProductData) => {
    await updateProduct({ id, data });
  };

  const handleSell = async (id: number, quantity: number) => {
    await sellProduct({ id, quantity });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza de que deseja excluir este produto do catálogo?")) {
      try {
        await deleteProduct(id);
      } catch (err: any) {
        alert(err.response?.data || 'Erro ao excluir o produto.');
      }
    }
  };

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(productSearch.toLowerCase()) || 
    product.description.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredHistory = historyList?.filter(item => 
    item.productName.toLowerCase().includes(historySearch.toLowerCase()) ||
    item.actionType.toLowerCase().includes(historySearch.toLowerCase()) ||
    (item.details && item.details.toLowerCase().includes(historySearch.toLowerCase()))
  );

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className="container">
        {activeTab === 'products' ? (
          <div className="tab-content">
            <div className="section-header">
              <div>
                <h1 className="main-title">Catálogo de Produtos</h1>
                <p className="main-subtitle">Gerencie o estoque e vendas do pet shop</p>
              </div>
              <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
                <Plus size={18} />
                Novo Produto
              </button>
            </div>

            <SearchBar value={productSearch} onChange={setProductSearch} placeholder="Buscar produtos..." />

            {loadingProducts ? (
              <div className="loading-state">
                <Loader2 className="spinner" size={40} />
                <p>Carregando catálogo...</p>
              </div>
            ) : errorProducts ? (
              <div className="error-state">
                <AlertTriangle size={40} />
                <p>Erro ao conectar com a API. Verifique se o backend está rodando.</p>
              </div>
            ) : filteredProducts && filteredProducts.length === 0 ? (
              <div className="empty-state">
                <Dog size={60} className="empty-icon" />
                <h3>Nenhum produto encontrado</h3>
                <p>Não há produtos com esse termo no momento.</p>
                {productSearch === '' && (
                  <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
                    Cadastrar Primeiro Produto
                  </button>
                )}
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts?.map((product) => (
                  <Card
                    key={product.id}
                    product={product}
                    onEdit={setEditingProduct}
                    onDelete={handleDelete}
                    onSell={setSellingProduct}
                  />
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'summary' ? (
          <div className="tab-content">
            <div className="section-header">
              <div>
                <h1 className="main-title">Resumo do Mês</h1>
                <p className="main-subtitle">Registro de todas as inclusões e atualizações feitas</p>
              </div>
            </div>

            <SearchBar value={historySearch} onChange={setHistorySearch} placeholder="Buscar no histórico..." />

            {loadingHistory ? (
              <div className="loading-state">
                <Loader2 className="spinner" size={40} />
                <p>Carregando histórico de atualizações...</p>
              </div>
            ) : errorHistory ? (
              <div className="error-state">
                <AlertTriangle size={40} />
                <p>Erro ao conectar com a API. Verifique se o backend está rodando.</p>
              </div>
            ) : (
              <HistoryTable historyList={filteredHistory || []} />
            )}
          </div>
        ) : (
          <PetServicesView />
        )}
      </main>

      {/* Modals */}
      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
        isSubmitting={isCreating}
      />

      <EditModal
        isOpen={editingProduct !== null}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleEdit}
        isSubmitting={isUpdating}
      />

      <SellModal
        isOpen={sellingProduct !== null}
        product={sellingProduct}
        onClose={() => setSellingProduct(null)}
        onSubmit={handleSell}
        isSubmitting={isSelling}
      />
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MainContent onLogout={handleLogout} />
    </QueryClientProvider>
  );
}
