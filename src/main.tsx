import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

if (agentId) {
  const widget = document.createElement('elevenlabs-convai');
  widget.setAttribute('agent-id', agentId);
  widget.setAttribute('style', 'position: fixed !important; bottom: 120px !important; left: 50% !important; transform: translateX(-50%) !important; z-index: 10000 !important;');

  const widgetContainer = document.getElementById('elevenlabs-widget');
  if (widgetContainer) {
    widgetContainer.appendChild(widget);
  }
}
