import { ExpandMore, Fullscreen } from '@mui/icons-material';
import { Card, CardHeader, Avatar, Stack, CardContent, Typography, IconButton, CardActions, CardMedia } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getCommentsCount, getLikeCount, minusLike, plusLike } from '../api/server';
import CommentIcon from '@mui/icons-material/Comment';
import CommentPage from './CommentPage';

const PostPage = ({name, post }) => {
  // post nesnesinden gerekli verileri alalım
  const { id, description, title, image, user } = post;
  const [color, setColor] = useState(() => {
    // Eğer localStorage'da renk bilgisi varsa onu al, yoksa 'action' olarak ayarla
    return localStorage.getItem(`color_${id}`) || 'info';
  });
  const [sayac, setSayac] = useState(() => {
    // Eğer localStorage'da sayac bilgisi varsa onu al, yoksa 0 olarak ayarla
    return parseInt(localStorage.getItem(`sayac_${id}`)) || 0;
  });
  const [like, setLike] = useState(0);
  const [cmntPage, setCmntPage] = useState(false)
  // yorum sayisi
  const [cmntCount, setCmntCount] = useState(0);
 
 const commentCount = () => {
    getCommentsCount(id)
      .then((res) => {
        setCmntCount(res.data);
      })
      .catch((error) => {
        throw error;
      });
  };

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
      setColor('info');
      localStorage.setItem(`color_${id}`, 'info');
    }
  };
 const cmntPageClose=() => {
   setCmntPage(false);
 }
 
  
  
  useEffect(() => { 
    commentCount();
    likeCount();
  }, [like,cmntCount]);
  
return (
    <>
      <Card style={{backgroundColor : '#000000', color : 'white'}}
        className="Card"
      sx={{
         
          flexDirection: 'row',
          display: 'flow-root',
          marginTop: 4,
          marginBottom: 4,
          marginRight: 18,
        marginLeft: 18,
          
          maxWidth: '75%',
        }}
      >
        <CardHeader 
          avatar={<Avatar sx={{ bgcolor: blue }}>{user.username.charAt(0)}</Avatar>}
          title={user.username}
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
          <video height={450}  width='100%' controls>
            <source src={image} type="video/mp4" />
          </video>
        ) : null}

        <CardContent >
          <Typography variant="h6">{title}</Typography>
          <br />
          <Typography style={{color : 'wheat'}} variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={renkDegis}>
            <FavoriteIcon color={color} />
        </IconButton>
        <div  className="like-c">{like}</div>
        <IconButton onClick={() => {
          setCmntPage(true)
         
        }
        }>
            <CommentIcon color='info'/>
        </IconButton>
        <div className="like-c">{cmntCount}</div>
        </CardActions>
      
      
      </Card>
      {cmntPage ? <CommentPage  close={cmntPageClose} name={name} postId={id}></CommentPage> : null}
    </>
  );
};

export default PostPage;