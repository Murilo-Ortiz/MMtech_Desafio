import React, { useState } from 'react';
import { useAuth } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ContactsPage from './pages/ContactPage.jsx';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

function App() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <p>A carregar aplicação...</p>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated && (
        <header className="fixed-header">
          <h1>Agenda de Contatos MMTech</h1>
          <div className="header-user-info">
            <span>Olá, {user?.nome || 'Utilizador'}!</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </header>
      )} 

      {isAuthenticated? (
        <div className="content-after-fixed-header">
          <ContactsPage />
        </div>):(
                <div className="auth-page-wrapper">
          {showLogin ? (
            <LoginPage onSwitchToRegister={() => setShowLogin(false)} />
          ) : (
            <RegisterPage onSwitchToLogin={() => setShowLogin(true)} />
          )}
        </div>  
        )}
        
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" 
      />
    </>
  );
}

export default App;