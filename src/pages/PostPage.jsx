import { ExpandMore, Fullscreen } from '@mui/icons-material';
import { Card, CardHeader, Avatar, Stack, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PostPage = ({ post }) => {
  // post nesnesinden gerekli verileri alalım
    const { description, title, image, user } = post;
    const [color, setColor] = useState("action");
    const [sayac, setSayac] = useState(0);
    const renkDegis = (e) => {
        e.preventDefault();
        setSayac(sayac + 1);
        sayac % 2 == 0 ? setColor('warning') : setColor("action");
    }

  return (
    
        <Card   className='Card' sx={{ flexDirection: 'row', display: 'flow-root',marginTop : 4, marginBottom: 4, marginRight :10, marginLeft: 10,maxWidth : 1000}}>
        <CardHeader
              avatar={<Avatar sx={{ bgcolor: blue }}>{ user.username.charAt(0)}</Avatar>} // R harfi yerine "A" harfi kullanmak istiyorsanız burayı değiştirebilirsiniz
          title={user.username}
           // Bu kısımda tarih bilgisi veya başka bir altbaşlık kullanmak isterseniz değiştirebilirsiniz
        />
        {/* Burada kartın geri kalan içeriğini eklemeye devam edebilirsiniz */}
        {/* Örnek olarak CardMedia, CardContent, CardActions gibi bileşenleri ekleyebilirsiniz */}
      <CardContent>
        <Typography variant='h6'>
          {title}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
          </CardContent>
          <CardActions disableSpacing>
              <IconButton onClick={renkDegis}>
                  <FavoriteIcon color={color} ></FavoriteIcon>
              </IconButton>
              
          </CardActions>
      
      </Card>   
    
     
    
  );
};

export default PostPage;
