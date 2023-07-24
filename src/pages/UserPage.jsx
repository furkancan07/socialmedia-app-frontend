import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserPostPage from './UserPostPage';
import { getUserPost } from '../api/server';
import PostPage from './PostPage';
import { Stack, Typography } from '@mui/material';



const UserPage = ({ name, girisYapildimi }) => {
  const [posts, setPosts] = useState([]);

  //hesaba giriş yaptığımız kullanıcıya ait paylaşımları çekmek için method
  const userpostList = async () => {
    try {
      const res = await getUserPost(name);
      setPosts(res.data);
      
      
    } catch (error) {
      
    }
    
  }


  // her paylaşım değişikliğe uğradığında anlık olarak uygulamaızda göstermek için 
  useEffect(() => {
    userpostList();
  }, [posts])
  
  // sayfamız
  return (
    <div>
      <Stack >
        <Typography  align='center' variant='h5'>Paylaşımlarım</Typography>
      </Stack>
      
      {
        girisYapildimi ? 
          posts.reverse().map((post, index) => {
            return <UserPostPage key={index} liste={posts}  post={post}/>
           
         })
         : <Link to='/login'>Giris Yapmadiniz giris yap</Link>
      }
    </div>
    
  )
}

export default UserPage
