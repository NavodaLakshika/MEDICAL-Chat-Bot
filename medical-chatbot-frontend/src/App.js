import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Chat from './pages/Chat';
import Train from './pages/Train';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/train" element={<Train />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
