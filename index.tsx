
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Falha ao renderizar App React:", err);
    container.innerHTML = `<div style="padding:40px; color:red; text-align:center;">
      <h1>Erro de Carregamento</h1>
      <p>Ocorreu um problema ao iniciar o Dashboard. Por favor, recarregue a página.</p>
    </div>`;
  }
} else {
  console.error("Elemento root não encontrado no HTML.");
}
