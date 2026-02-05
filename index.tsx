
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Captura erros globais de runtime para evitar tela branca silenciosa
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Erro Global Detectado:", message, "em", source, ":", lineno);
  return false;
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Erro Crítico: Elemento #root não encontrado no DOM.");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erro ao inicializar o React:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; text-align: center;">
        <h2>Ocorreu um erro ao carregar o aplicativo.</h2>
        <p>Verifique o console do navegador para mais detalhes.</p>
      </div>
    `;
  }
}
