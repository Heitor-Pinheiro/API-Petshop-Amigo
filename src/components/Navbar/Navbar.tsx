import React from 'react';
import { PawPrint, Package, Calendar, LogOut, Scissors } from 'lucide-react';

interface NavbarProps {
  activeTab: 'products' | 'summary' | 'pets';
  setActiveTab: (tab: 'products' | 'summary' | 'pets') => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <PawPrint className="brand-icon" size={28} />
          <span>PetShop Amigo</span>
        </div>
        <div className="navbar-links">
          <button
            className={`nav-button ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={18} />
            Produtos
          </button>
            <button
              className={`nav-button ${activeTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              <Calendar size={18} />
              Resumo do Mês
            </button>
            <button
              className={`nav-button ${activeTab === 'pets' ? 'active' : ''}`}
              onClick={() => setActiveTab('pets')}
            >
              <Scissors size={18} />
              Serviços Pet
            </button>
            {onLogout && (
              <button className="nav-button text-negative" onClick={onLogout}>
                <LogOut size={18} />
                Sair
              </button>
            )}
          </div>
        </div>
      </nav>
    );
  };
