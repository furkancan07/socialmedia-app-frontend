
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { kaydolma } from "../api/server";
import Home from "./Home";

const SignUp = ({girisYaptimi}) => {
  const [bilgi, setBilgi] = useState({
        username: null,
        display: null,
        sifre: null,
        tekrar: null,
       
    })
  const [status500, setStatus] = useState("");
    const [errors, setErrors] = useState({
        
    })
  const navigate = useNavigate();
  const [btnDisabled, setDisabled] = useState(false);

    const inputChange=(event) => {
        const value = event.target.value
      const name = event.target.name
      
        setErrors({...errors,[name]: undefined})
        setBilgi(
        {...bilgi,[name] : value}
        )
        console.log(bilgi.sifre)
  }
  const kaydol=(event) => {
    event.preventDefault();
    setDisabled(true);
    const body = {
       username: bilgi.username,
            display: bilgi.display,
            sifre: bilgi.sifre,
           tekrar: bilgi.tekrar
    }
    if (body.sifre != body.tekrar) {
        setErrors({ ...errors, tekrar: "Şifreler uyuşmuyor" })
        setDisabled(false);
    }
    else {
      kaydolma(body).then(response => {
        setStatus("");
        setDisabled(false);
        if (response.status == 200) {
          
          alert("Kayıt olundu Giriş Yapma Ekranına gidebilirsiniz")
          navigate('/login')
        }
      }).catch(err => {
         if (err.response.data.message.indexOf('Unique')) {
               console.log(true);
               setStatus("bu kullanici adi daha önce seçilmiş")
          }
        setDisabled(false);
        setErrors({
                   ...errors,
                   username: err.response.data.validationErrors.username,
                   display: err.response.data.validationErrors.display,
                   sifre: err.response.data.validationErrors.sifre,
                   tekrar : err.response.data.validationErrors.tekrar
               })
      })
    }
  }
    
  // const kullaniciadiniAL=(event) => {
  //     setKullanici(event.target.value)
  //     console.log(kullanici)
        
  // }
  // const ikinciadiAl=(event) => {
  //   setIkinci(event.target.value)
  // }
  // const sifreAl = (event) => {
  //     setSifre(event.target.value)
      
  // }
  // const tekrarSifreAl=(event) => {
  //   setTekrar(event.target.value)
  // }
  return (
    <>
    {girisYaptimi ? <Home girisYapildimi={girisYaptimi}></Home> : <div>
      <h1>Kaydol</h1>
      <form >
        <div className='inputDiv'>
          <label >Kullanici adi</label>
          <input name='username' onChange={ inputChange} placeholder='Kullanici adini giriniz' />
          <div className="invalid-feedback">
            {errors.username}
            {status500}
          </div>
        </div>
        <div className='inputDiv'>
          <label >İkinci isim</label>
          <input name='display' onChange={inputChange} placeholder='İkinci adınızı giriniz' />
          <div className="invalid-feedback">
            {errors.display}
          </div>
        </div>
        <div className='inputDiv'>
          <label >Şifre</label>
          <input name='sifre' onChange={inputChange} type='password' placeholder='Şifrenizi giriniz' />
          <div className="invalid-feedback">
            {errors.sifre}
          </div>
        </div>
        <div className='inputDiv'>
          <label >Tekrar Şifre</label>
          <input name='tekrar' onChange={inputChange} type='password' placeholder='Tekrar Şifrenizi giriniz' />
          <div className="invalid-feedback">
            {errors.tekrar}
          </div>
        </div>
        <div className="container">
          <div className="center">
            {
              btnDisabled ? <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Yükleniyor...
              </button> : <button disabled={btnDisabled} onClick={kaydol}>Kaydol</button>
            }
            
     
          </div>
          
        </div>
              <Link to={"/login"} className='loginLink'>Hesabınız Var Mı Giriş Yap</Link>
      </form>
    </div>}
    </>
  )
}

export default SignUp
