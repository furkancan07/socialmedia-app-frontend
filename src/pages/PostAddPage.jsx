import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { postAdd } from '../api/server';


const PostAddPage = ({ girisYaptimi, name }) => {
    const [baslik, setBaslik] = useState("");
    const [errors, setErrors] = useState({});
    const [aciklama, setAciklama] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const baslikDegistir=(event) => {
        setBaslik(event.target.value);
        setErrors({...errors,title : undefined})
        
    }
     const aciklamaDegistir=(event) => {
         setAciklama(event.target.value);
       setErrors({...errors,description : undefined})
     }
    const handleChangeImage=(event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setSelectedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }
    
    const postOlustur = async (event) => {
        event.preventDefault();
        const body = {
            title: baslik,
            description: aciklama,
            image : selectedImage
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
                  
                  <label className='Baslik'>
                      Resim ekle
                  </label>
                  <input type="file" onChange={handleChangeImage} />
                    
                  
                  <button onClick={postOlustur} className='TaskButton'>Olustur</button>
              </form>
              : <Link to={'/login'}>Giriş Yapmadınız Lütfen Giriş Yapin...</Link>
}
    </div>
  )
}

export default PostAddPage
