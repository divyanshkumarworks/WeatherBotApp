import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Home from './components/Home';
import BotSettings from './components/BotSettings';
import UserManagement from './components/UserManagement';
import Navbar from './components/Navbar'
import GoogleLogin from './components/GoogleLogin'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Navigate to="/auth/google"/>} />
        <Route path='/auth/google' element={<GoogleLogin/>} />
        <Route path="/bot-settings" element={<BotSettings/>} />
        <Route path="/user-management" element={<UserManagement/>} />
      </Routes>
    </Router>
  );
}

export default App;
