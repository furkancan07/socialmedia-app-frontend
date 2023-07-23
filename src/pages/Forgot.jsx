import React, { useState } from 'react'
import { sifreDegistir } from '../api/server';
import { UNSAFE_DataRouterContext, useNavigate } from 'react-router-dom';

const Forgot = () => {
    const [bilgi, setBilgi] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const changeInput = (event) => {
        
       const value = event.target.value;
        const name = event.target.name;
        setErrors({...errors,[name] : undefined})
        setBilgi({ ...bilgi, [name]: value });
    }
    const dogrula = async (event) => {
        event.preventDefault();
        const body = {
            username: bilgi.username,
            yeniSifre : bilgi.sifre
        }
        try {
            var res = await sifreDegistir(body);
            if (res.status == 200) {
                alert("Şifreniz Değiştirildi")
                navigate("/login")
            }

        } catch (error) {
            var hata=(error.response.data.validationErrors);
            setErrors({ ...error, username: hata.username, yeniSifre: hata.yeniSifre })
            
        }
        
    }
  return (
    <div>
      <h1>Şifreyi Değiştir</h1>
          <form>
                <div className='inputDiv'>
              <label >Kullanici adi</label>
                  <input name='username' onChange={changeInput}   placeholder='Kullanici adini giriniz' />
                  <div className="invalid-feedback">
                  </div>
                    <div className="invalid-feedback">
            {errors.username}
          </div>
              </div>
              <div className='inputDiv'>
              <label >Şifre</label>
                  <input type='password' name='sifre' onChange={changeInput} typeof='password' placeholder='Yeni Şifrenizi giriniz' />
                  <div className="invalid-feedback">
                        <div className="invalid-feedback">
            {errors.yeniSifre}
          </div>
          </div>     
        </div>
              <button onClick={dogrula}>Gönder</button>
       </form>
    </div>
  )
}

export default Forgot
