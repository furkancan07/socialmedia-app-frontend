

import { Card, CardHeader, Avatar, CardContent, Typography, IconButton, CardActions, CardMedia } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { postDelete, postUpdate } from '../api/server';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const UserPostPage = ({ post, liste }) => {
    const {id, description, title, image, user } = post;
    const [color, setColor] = useState("action");
    const [sayac, setSayac] = useState(0);
    const [kontrol, setKontrol] = useState(false);
    const [baslik, setBaslik] = useState("");
    const [errors, setErrors] = useState({});
    const [aciklama, setAciklama] = useState("");

    // başlık degiştirmw
    const baslikDegistir=(event) => {
        setBaslik(event.target.value);
        setErrors({...errors,title : undefined})
        
    }

// açıklama değiştirme
     const aciklamaDegistir=(event) => {
        setAciklama(event.target.value);
       setErrors({...errors,description : undefined})
    }


    

    // paylaşımı düzenlemek için kontrol
    const updateEdit =() => {
        setKontrol(true)
    }

    // paylaşımı silme
    const deletePost=async() => {
      try {
          var res = await postDelete(post.id);
          alert("Paylaşım başarı ile silindi")
      } catch (error) {
           var hata = error.response.data;
           setErrors({...errors,message : hata.message})
      }
    }

    // paylaşımı düzenleme
    const duzenle = async () => {
        
        const body = {title : baslik, description : aciklama};
      try {
          var res = await postUpdate(id, body);
          setKontrol(false);
          const duzenleme = liste.map((post) => {
              if (post.id == id) {
                  return {
                      title: baslik,
                      description: aciklama,
                      id: post.id,
                  }
              } else {
                  return liste;
              }
          })
          
         
      } catch (error) {
          var hata = error.response.data.validationErrors;
          setErrors({...errors,title : hata.title, description :hata.description})
         
      }
    }


    // sayfamızın kodları

    return (
        <>
            {/* düzenleme butonuna bastıysak kontrol  */}


            {kontrol ? <div >
          <Card style={{ backgroundColor: '#000000', color: 'white' }} className='form-post' sx={{ maxWidth : 1000 }}>
                  <h3>Paylaşımı Düzenle</h3>
                  <label className='Baslik' >
                    Yeni Başlik
                  </label>
                 
                <input onChange={baslikDegistir} placeholder='Yeni Başlık!' className='InputSyle' />
                 <div className="invalid-feedback">
            {errors.title}
                    </div>
                   <br /> 
                  <label className='Baslik'>
                     Yeni Aciklama
                  </label>
                  <textarea onChange={aciklamaDegistir} placeholder='"Duygularını Paylaş!"' className='InputSyle' rows={5} />
                      <div className="invalid-feedback">
           {errors.description}
                    </div>
                    <div className='edit-button'>
<button  onClick={duzenle}>Tamam</button>
                        <button onClick={() => {
                            setKontrol(false);
                    }} >iptal</button>
                    </div>
                    
              </Card>
            </div>
                

                
          : <Card style={{ backgroundColor: '#000000', color: 'white' }} className='Card' sx={{
            
             flexDirection: 'row',
          display: 'flow-root',
          marginTop: 4,
          marginBottom: 4,
          marginRight: 18,
        marginLeft: 18,
          
          maxWidth: '75%',
          }}>
        <CardHeader
              avatar={<Avatar src={post.user.image} sx={{ bgcolor: blue }}>{ user.username.charAt(0)}</Avatar>} // R harfi yerine "A" harfi kullanmak istiyorsanız burayı değiştirebilirsiniz
          title={user.username}
           // Bu kısımda tarih bilgisi veya başka bir altbaşlık kullanmak isterseniz değiştirebilirsiniz
            />
           {image && image.includes('image') ? ( // Eğer image varsa ve blob değilse (yani resim), resmi göster
          <CardMedia
            component="img"
            height={500}
            image={image}
            alt=""
            sx={{
              objectFit: 'contain',
              maxWidth: '100%',
            }}
          />
        ) : image && image.includes('video') ? ( // Eğer image varsa ve blob ise (yani video), videoyu göster
          <video height={450} width='100%' controls>
            <source src={image} type="video/mp4" />
          </video>
        ) : null}

        {/* Burada kartın geri kalan içeriğini eklemeye devam edebilirsiniz */}
        {/* Örnek olarak CardMedia, CardContent, CardActions gibi bileşenleri ekleyebilirsiniz */}
      <CardContent>
        <Typography variant='h6'>
          {title}
        </Typography>
        <br />
        <Typography style={{color : 'wheat'}} variant="body2" color="text.secondary">
          {description}
        </Typography>
          </CardContent>
          <CardActions disableSpacing>
            
              <IconButton onClick={updateEdit}>
                 <EditIcon color='info'></EditIcon>
              </IconButton>
               <IconButton  onClick={deletePost}>
                 <DeleteIcon color='warning'/>
                        </IconButton>
                        <div className="invalid-feedback">
            {errors.message}
                    </div>
          </CardActions>
      
                </Card>
      
            
            }
        </>
    
         
    
     
    
  );
}

export default UserPostPage
