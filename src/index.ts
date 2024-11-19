import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { QuizProvider } from './context/QuizContext';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>,
  document.getElementById('root')
);