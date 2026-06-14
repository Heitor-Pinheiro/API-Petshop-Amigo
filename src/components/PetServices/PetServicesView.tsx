import React, { useState } from 'react';
import { Plus, CheckCircle, Dog, AlertTriangle, Loader2 } from 'lucide-react';
import { usePetServices } from '../../hooks/usePetServices';
import { CreatePetModal } from './CreatePetModal';
import { SearchBar } from '../Search/search';

export const PetServicesView: React.FC = () => {
  const [subTab, setSubTab] = useState<'active' | 'history'>('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const {
    activeServices,
    loadingActive,
    errorActive,
    historyServices,
    loadingHistory,
    errorHistory,
    createService,
    isCreating,
    completeService,
    isCompleting
  } = usePetServices();

  const handleComplete = async (id: number) => {
    if (window.confirm('Tem certeza de que o serviço foi concluído?')) {
      await completeService(id);
    }
  };

  const currentList = subTab === 'active' ? activeServices : historyServices;
  const filteredList = currentList?.filter(pet => 
    pet.petName.toLowerCase().includes(search.toLowerCase()) ||
    pet.breed.toLowerCase().includes(search.toLowerCase()) ||
    pet.ownerPhone.includes(search)
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <div>
          <h1 className="main-title">Serviços Pet</h1>
          <p className="main-subtitle">Gerencie os atendimentos do pet shop</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Novo Atendimento
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button 
          style={{ background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', color: subTab === 'active' ? 'var(--primary)' : 'var(--text-muted)' }}
          onClick={() => setSubTab('active')}
        >
          Em Andamento
        </button>
        <button 
          style={{ background: 'none', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', color: subTab === 'history' ? 'var(--primary)' : 'var(--text-muted)' }}
          onClick={() => setSubTab('history')}
        >
          Histórico
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Buscar por nome, raça ou telefone..." />

      {(subTab === 'active' ? loadingActive : loadingHistory) ? (
        <div className="loading-state">
          <Loader2 className="spinner" size={40} />
          <p>Carregando serviços...</p>
        </div>
      ) : (subTab === 'active' ? errorActive : errorHistory) ? (
        <div className="error-state">
          <AlertTriangle size={40} />
          <p>Erro ao conectar com a API. Verifique se o backend está rodando.</p>
        </div>
      ) : filteredList && filteredList.length === 0 ? (
        <div className="empty-state">
          <Dog size={60} className="empty-icon" />
          <h3>Nenhum serviço encontrado</h3>
          <p>{subTab === 'active' ? 'Não há atendimentos em andamento.' : 'O histórico está vazio.'}</p>
        </div>
      ) : (
        <div className="history-table-container">
          <div className="table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Data de Entrada</th>
                  <th>Animal</th>
                  <th>Raça</th>
                  <th>Telefone</th>
                  <th>Serviço</th>
                  {subTab === 'history' && <th>Concluído Em</th>}
                  {subTab === 'active' && <th>Ações</th>}
                </tr>
              </thead>
              <tbody>
                {filteredList?.map(item => (
                  <tr key={item.id}>
                    <td className="cell-date">{formatDate(item.createdAt)}</td>
                    <td className="cell-product-name">{item.petName}</td>
                    <td>{item.breed}</td>
                    <td>{item.ownerPhone}</td>
                    <td><span className="badge badge-edit">{item.serviceType}</span></td>
                    {subTab === 'history' && <td className="cell-date">{formatDate(item.completedAt)}</td>}
                    {subTab === 'active' && (
                      <td>
                        <button 
                          className="btn btn-primary-success" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                          onClick={() => handleComplete(item.id!)}
                          disabled={isCompleting}
                        >
                          <CheckCircle size={14} /> Concluir
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CreatePetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createService}
        isSubmitting={isCreating}
      />
    </div>
  );
};
