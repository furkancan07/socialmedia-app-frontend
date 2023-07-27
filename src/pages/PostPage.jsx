import { ExpandMore, Fullscreen } from '@mui/icons-material';
import { Card, CardHeader, Avatar, Stack, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import { blue } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getLikeCount, minusLike, plusLike } from '../api/server';
import CommentIcon from '@mui/icons-material/Comment';
import CommentPage from './CommentPage';

const PostPage = ({name, post }) => {
  // post nesnesinden gerekli verileri alalım
  const { id, description, title, image, user } = post;
  const [color, setColor] = useState(() => {
    // Eğer localStorage'da renk bilgisi varsa onu al, yoksa 'action' olarak ayarla
    return localStorage.getItem(`color_${id}`) || 'action';
  });
  const [sayac, setSayac] = useState(() => {
    // Eğer localStorage'da sayac bilgisi varsa onu al, yoksa 0 olarak ayarla
    return parseInt(localStorage.getItem(`sayac_${id}`)) || 0;
  });
  const [like, setLike] = useState(0);
  const [cmntPage, setCmntPage] = useState(false)
 
  

  const likeCount = () => {
    getLikeCount(id)
      .then((res) => {
        setLike(res.data);
      })
      .catch((error) => {
        throw error;
      });
  }
  
  const likeArttir = async () => {
    try {
      var res = await plusLike(id);
      setLike(like + 1);
      console.log(res.data);
    } catch (error) {
      throw error;
    }
  }
  
  const likeAzalt = async () => {
    try {
      var res = await minusLike(id);
      setLike(like - 1);
      console.log(res.data);
    } catch (error) {
      throw error;
    }
  }
  
  const renkDegis = (e) => {
    e.preventDefault();
    setSayac((prevSayac) => prevSayac + 1);
    localStorage.setItem(`sayac_${id}`, sayac+1);
    console.log(sayac);
    if ((sayac) % 2 === 0) {
      likeArttir();
      setColor('warning');
      localStorage.setItem(`color_${id}`, 'warning');
    } else {
      likeAzalt();
      setColor('action');
      localStorage.setItem(`color_${id}`, 'action');
    }
  };
 const cmntPageClose=() => {
   setCmntPage(false);
  }
  
  
  useEffect(() => {
    likeCount();
  }, [like]);
  
  return (
    <>
      <Card className='Card' sx={{
        flexDirection: 'row',
        display: 'flow-root',
        marginTop: 4,
        marginBottom: 4,
        marginRight: 10,
        marginLeft: 10,
        maxWidth: 1000,
        
      }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: blue }}>{user.username.charAt(0)}</Avatar>}
        title={user.username}
      />
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
          <FavoriteIcon color={color} />
        </IconButton>
        <IconButton onClick={()=>{setCmntPage(true)}} >
          <CommentIcon />
        </IconButton >
      </CardActions>
        <div className='like-c'>{like}</div>
        
      </Card>
      {
        cmntPage ? <CommentPage  close={cmntPageClose} name={name} postId={id}></CommentPage> : <></>
      }
      
    </>
    
   
  );
};

export default PostPage;