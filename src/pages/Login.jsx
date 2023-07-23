import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { girisYap } from '../api/server'
import { useState } from 'react'





const Login = ({gonder,girisYaptimi}) => {
  const [disabled, setDisabled] = useState(false);
     const [veri, setVeri] = useState({
        username: null,
        sifre: null,
     })
  const [errors, setErrors] = useState({
    
  })
  const navigate = useNavigate();
  const inputChange = (event) => {
      
        const value = event.target.value;
    const name = event.target.name
    setErrors({...errors,[name]: undefined})
        setVeri({ ...veri, [name]: value })
        
    }
 
  const giris = async (event) => {
    event.preventDefault();
    setDisabled(true);
  const creds = {
    username: veri.username,
    sifre: veri.sifre
  };

  try {
    const response = await girisYap(creds);
    console.log(response);
     setDisabled(false);
    // Başarılı bir şekilde giriş yapıldıktan sonra istediğiniz işlemleri burada yapabilirsiniz
    if (response.status === 200) {   
      alert(response.data);
      gonder(true,response.data);
      //this.props.history.push('/home');
      navigate('/home')
    }
  } catch (error) {
    // Kimlik doğrulama başarısız olduğunda burada hata işlemleri yapabilirsiniz
     setDisabled(false);
    console.error('Giriş yapılamadı:', error);
   const hata= error.response.data.validationErrors;
    setErrors({...errors,username : hata.username,sifre : hata.sifre})
console.log(errors.username)    
  }
};
  return (
    <div>
      {
        girisYaptimi ? <Link to={"/home"}>Zaten giriş yaptınız</Link> : <>
        <h1>Giriş Yap</h1>
          <form>
               <div className='inputDiv'>
              <label >Kullanici adi</label>
                  <input name='username' onChange={inputChange} placeholder='Kullanici adini giriniz' />
                  <div className="invalid-feedback">
          </div>
           <div className="invalid-feedback">
            {errors.username}
          </div>
        </div>
       
              <div className='inputDiv'>
              <label >Şifre</label>
                  <input type='password' name='sifre' onChange={inputChange} typeof='password' placeholder='Şifrenizi girin' />
                  <div className="invalid-feedback">
          </div>
          <div className="invalid-feedback">
            {errors.sifre}
          </div>
        </div>
        
               <div className="container">
          <div className="center">
            {
              disabled ? <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Yükleniyor...
              </button> : <button disabled={disabled} onClick={giris}>Giriş Yap</button>
            }
                    
          </div>
          
</div>
                  
        <Link to={"/"} className='loginLink'>Hesabınız Mı Yok Kaydolun</Link>
        <Link to={"/forgotPassword"} className='loginLink'>Şifrenizi Mi unuttunuz </Link>
          </form>
        </>
      }
          
      
    </div>
  )
}

export default Login
