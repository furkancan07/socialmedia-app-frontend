import { useEffect, useState } from 'react'

import './App.css'

import SignUp from './pages/SignUp'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Forgot from './pages/Forgot'
import { AuthProvider } from './context/AuthContext'
import UserPage from './pages/UserPage'
import TopBar from './pages/TopBar'



function App() {
  const [count, setCount] = useState(0)
  const [giris, setGiris] = useState(false);
  const [name, setName] = useState("");
  
 const gonder=(kontrol,username) => {
   setGiris(kontrol)
   setName(username)
   localStorage.setItem('giris', kontrol ? true : false);

   
 }
  const navigate = useNavigate();
  const cikisYap = (logout) => {
    
    setGiris(logout)

    alert("Çıkış Yapıldı")
    navigate("/login")
    localStorage.setItem('giris', logout ? true : false);


  }
  useEffect(() => {
    const storedGiris = localStorage.getItem('giris');
  setGiris(storedGiris === 'true');
  },[])
  return (
    <div className='App'>
      {
        giris ? <TopBar cikis={cikisYap} name={name}></TopBar> : <></>
      }
      
      <Routes>
        <Route path='/' element={<SignUp></SignUp>}></Route>
        
        <Route path='/home' element={<Home girisYapildimi={giris}></Home>}></Route> 
        
           <Route path='/login' element={<Login girisYaptimi={giris} gonder={gonder}></Login>}></Route>
         <Route path='/profil'  element={<UserPage girisYapildimi={giris} name={name}></UserPage>}></Route>
        
        
        <Route path='/forgotPassword' element={<Forgot></Forgot>}></Route>
        </Routes>
      
    </div>
  )
}

export default App
