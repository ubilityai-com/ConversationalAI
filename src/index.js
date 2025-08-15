import { ReactFlowProvider } from '@xyflow/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatPage from './components/iframe-components/chat-page';
import './index.css';
import MainFunction from './main-migration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ReactFlowProvider>
      <Routes>
        <Route path="/" element={<MainFunction />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:botToken" element={<ChatPage />} />
        <Route path="/:botID" element={<MainFunction />} />
      </Routes>
    </ReactFlowProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
