import './App.css';
import Login from './pages/Login.js';
import {  Router, Routes, Route, Navigate, useLocation, BrowserRouter } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import  Register from "./pages/Register";
import  Dashboard  from "./pages/Dashboard";
import ChangePassword from './pages/ChangePassword.js';
import SearchDocument from './pages/SearchDocument.js';
import ForgotPassword from './pages/ForgotPassword.js';

const checkIfLoggedIn = () => {
  
  const token = localStorage.getItem('access_token'); 

  if (!token) 
    return false;
  
  try 
  {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 

    return decodedToken.exp > currentTime;
  }
  catch (error) 
  {
    console.log('Error decoding token:', error);
    return false;
  }
};

const App = () => {

  const isLoggedIn = checkIfLoggedIn();

  return (
    <BrowserRouter>
    <Routes>
      {isLoggedIn ? (
          <>
            <Route path="/" element = { <Navigate to="/dashboard" /> } />
            <Route path="/login" element={<Navigate to={'/dashboard'} />} />
            <Route path="/register" element={<Navigate to="/dashboard" />} />
            <Route path="/forgot-password" element = { <Navigate to="/dashboard" /> } />
            <Route path="/change-password" element = { <Navigate to="/dashboard" /> } />
            <Route path="/dashboard" element = { <Dashboard /> } />
            <Route path="/search" element = { <SearchDocument/> } />
          </>
        ) : (
          <>
            <Route path="/" element = { <Login/> } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element = { <ForgotPassword/> } /> 
            <Route path="/change-password" element = { <ChangePassword/> } />
            <Route path="/search" element = { <Navigate to="/login" /> } />
          </>
        )}
    </Routes>
    </BrowserRouter>

  );
}

export default App;
