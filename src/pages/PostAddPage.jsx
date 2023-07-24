import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { postAdd } from '../api/server';


const PostAddPage = ({ girisYaptimi, name }) => {
    const [baslik, setBaslik] = useState("");
    const [errors, setErrors] = useState({});
    const [aciklama, setAciklama] = useState("");
    const baslikDegistir=(event) => {
        setBaslik(event.target.value);
        setErrors({...errors,title : undefined})
        
    }
     const aciklamaDegistir=(event) => {
         setAciklama(event.target.value);
       setErrors({...errors,description : undefined})
    }
    
    const postOlustur = async (event) => {
        event.preventDefault();
        const body = {
            title: baslik,
            description : aciklama
        }
        var response = await postAdd(name, body).then((res) => {
            alert("paylaşım eklendi")
        }).catch((err) => {
            var hata = err.response.data.validationErrors;
            setErrors({...errors, 
                title: hata.title,
                description : hata.description}
            )
            
        })
      
    }
  return (
    <div className='task'>
          {girisYaptimi ?
              <form className='form-post'>
                  <h3>Paylaş</h3>
                  <label className='Baslik' >
                      Başlik
                  </label>
                  
                <input placeholder='Başlık!' onChange={baslikDegistir} value={baslik} className='InputSyle' />
                 <div className="invalid-feedback">
            {errors.title}
          </div>
                  <label className='Baslik'>
                      Aciklama
                  </label>
                  <textarea placeholder='"Duygularını Paylaş!"' onChange={aciklamaDegistir} value={aciklama} className='InputSyle' rows={5} />
                      <div className="invalid-feedback">
            {errors.description}
          </div>
                  <button onClick={postOlustur} className='TaskButton'>Olustur</button>
              </form>
              : <Link to={'/login'}>Giriş Yapmadınız Lütfen Giriş Yapin...</Link>
}
    </div>
  )
}

export default PostAddPage
