import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="container-fluid"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #00264d, #004080)',
        color: 'white', // Para melhor legibilidade
        
      }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{ paddingTop: '20px' }} // Ajuste a distância do topo
      >
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
