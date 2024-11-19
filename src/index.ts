// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { QuizProvider } from './context/QuizContext';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>,
  rootElement
);