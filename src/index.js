import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from '../src/components/App/App';
import { QuizProvider } from './context/QuizContext';

ReactDOM.render(
  <QuizProvider>
    <AppWrapper />
  </QuizProvider>,
  document.getElementById('root')
);
