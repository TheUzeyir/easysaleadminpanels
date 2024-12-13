import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userName: email,
      password: password,
    };

    try {
      const response = await fetch(
        'https://restartbaku-001-site4.htempurl.com/api/auth',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );


      if (!response.ok) {
        if (response.status === 500) {
          alert('Daxili server xətası. Zəhmət olmasa sonra yenidən yoxlayın.');
        } else if (response.status === 401 || response.status === 403) {
          alert('Email və ya şifrə yanlışdır. Zəhmət olmasa yenidən yoxlayın.');
        } else {
          alert('Xəta baş verdi. Zəhmət olmasa giriş məlumatlarını yenidən yoxlayın.');
        }
        return;
      }

      const result = await response.json();
      localStorage.setItem('token', result.token);
      localStorage.setItem('refreshToken', result.refreshToken);

      alert('Uğurlu giriş!');
      navigate('/main');
    } catch (error) {
      console.error('Xəta:', error);
      alert('Gözlənilməz xəta baş verdi. Zəhmət olmasa sonra yenidən yoxlayın.');
    }
  };

  return (
    <div className="loginPage">
      <form className="formControl" onSubmit={handleSubmit}>
        <p className="title">Login</p>
        <div className="inputFieled">
          <input
            required
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label">Email daxil edin</label>
        </div>
        <div className="inputFieled">
          <input
            required
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="label">Şifrə daxil edin</label>
        </div>
        <button type="submit" className="submit-btn">
          Giriş
        </button>
      </form>
    </div>
  );
};

export default Login;
