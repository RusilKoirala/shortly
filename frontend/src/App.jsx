import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/links" element={<h1>Links Page</h1>} />
        <Route path="/links/:id" element={<h1>Link Details</h1>} />
      </Routes>
    </AuthProvider>
  );
}

  

export default App
