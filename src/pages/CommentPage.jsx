import React, { useEffect, useState } from 'react';
import { Card, Grid, TextField, Button } from '@mui/material';
import { commentsAdd, getComments } from '../api/server';
import CommentListPage from './CommentListPage';

const CommentPage = ({close, name, postId }) => {
  const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
   

  const addComment = async () => {
    console.log(comment);
    try {
      const body = {
        content: comment,
      };
      var res = await commentsAdd(name, postId, body);
        console.log(res.data);
        
       
        setComment(''); // Yorum ekledikten sonra yorumu temizliyoruz
        alert("yorum eklendi")
    } catch (error) {
      throw error;
    }
  };

  const getComment = async () => {
    try {
      var res = await getComments(postId);
         console.log(res.data.length);
        setComments(res.data.reverse()); // Yorumları ters çevirerek güncelliyoruz
        
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getComment();
  }, [comment]); // Yalnızca postId değiştiğinde yorumları güncelle

  return (
    <div>
      <Card
        className='Card'
        sx={{
          flexDirection: 'row',
          display: 'flow-root',
          marginTop: 4,
          marginBottom: 4,
          marginRight: 10,
          marginLeft: 10,
          maxWidth: 1000,
        }}
      >
        <Grid container spacing={2} alignItems='flex-end'>
          <Grid item xs={10}>
            <TextField
              fullWidth
              size='medium'
              id='outlined-basic'
              label='Yorum ekle'
              variant='outlined'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
                      <Button onClick={addComment}>Gönder</Button>
                     
                  </Grid>
                  <Grid item xs={2}>
                       <Button onClick={close} variant="contained">Kapat</Button>
                  </Grid>
        </Grid>
        {comments.map((cmnt, index) => {
          return <CommentListPage key={index} comment={cmnt} />;
        })}
      </Card>
    </div>
  );
};

export default CommentPage;