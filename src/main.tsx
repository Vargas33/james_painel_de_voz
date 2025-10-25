import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

async function loadElevenLabsWidget() {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const response = await fetch(`${supabaseUrl}/functions/v1/elevenlabs-proxy`, {
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to load agent configuration');
    }

    const { agentId } = await response.json();

    if (agentId) {
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', agentId);
      widget.setAttribute('style', 'position: fixed !important; bottom: 120px !important; left: 50% !important; transform: translateX(-50%) !important; z-index: 10000 !important;');

      const widgetContainer = document.getElementById('elevenlabs-widget');
      if (widgetContainer) {
        widgetContainer.appendChild(widget);
      }
    }
  } catch (error) {
    console.error('Failed to initialize ElevenLabs widget:', error);
  }
}

loadElevenLabsWidget();
