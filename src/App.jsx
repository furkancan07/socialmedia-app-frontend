import { useEffect, useState } from 'react'

import './App.css'

import SignUp from './pages/SignUp'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Forgot from './pages/Forgot'

import UserPage from './pages/UserPage'
import TopBar from './pages/TopBar'
import PostAddPage from './pages/PostAddPage'



function App() {
  const [giris, setGiris] = useState(false);
  const [name, setName] = useState('');

  const gonder = (kontrol, username) => {
    setGiris(kontrol);
    setName(username);
    localStorage.setItem('giris', kontrol ? 'true' : 'false');
    localStorage.setItem('name', username);
  };

  const cikisYap = () => {
    setGiris(false);
    setName('');
    localStorage.setItem('giris', 'false');
    localStorage.removeItem('name');
    alert('Çıkış Yapıldı');
  };

  useEffect(() => {
    const storedGiris = localStorage.getItem('giris');
    const storedName = localStorage.getItem('name');
    setGiris(storedGiris === 'true');
    setName(storedName);
  }, []);
  return (
    <div className='App'>
      {
        giris ? <TopBar cikis={cikisYap} name={name}></TopBar> : <></>
      }
      
      <Routes>
        <Route path='/' element={<SignUp></SignUp>}></Route>
        
         <Route
          path='/home'
          element={<Home girisYapildimi={giris} key={giris.toString()} />} // girisYapildimi değiştiğinde bileşenin tekrar render edilmesini sağlamak için key ekledik
        />
        
           <Route path='/login' element={<Login girisYaptimi={giris} gonder={gonder}></Login>}></Route>
         <Route path='/profil'  element={<UserPage girisYapildimi={giris} name={name}></UserPage>}></Route>
         <Route
          path='/postAdd'
          element={<PostAddPage girisYaptimi={giris} name={name} key={giris.toString()}/>} // girisYapildimi değiştiğinde bileşenin tekrar render edilmesini sağlamak için key ekledik
        />
        
        <Route path='/forgotPassword' element={<Forgot></Forgot>}></Route>
        </Routes>
      
    </div>
  )
}

export default App
