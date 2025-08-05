import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

// Render the React app
const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}