// AuthContext.js
import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [giris, setGiris] = useState(false);
  const [name, setName] = useState('');

  const gonder = (kontrol, username) => {
    setGiris(kontrol);
    setName(username);
  };

  const cikisYap = (logout) => {
    setGiris(logout);
    alert('Çıkış Yapıldı');
  };

  return (
    <AuthContext.Provider value={{ giris, name, gonder, cikisYap }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };