import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserPostPage from './UserPostPage';
import { getUser, getUserPost, updateProfil } from '../api/server';
import PostPage from './PostPage';
import { Avatar, Card, CardHeader, Input, Stack, Typography } from '@mui/material';
import Login from './Login';
import { blue } from '@mui/material/colors';



const UserPage = ({ name, girisYapildimi }) => {
  const [posts, setPosts] = useState([]);
  const [profilImage, setProfilImage] = useState("");
  const [user, setUser] = useState({});

  const userpostList = async () => {
    try {
      const res = await getUserPost(name);
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = async () => {
      const body = {
        image: fileReader.result,
      };
      try {
        const res = await updateProfil(name, body);
        console.log(res);
        setProfilImage(fileReader.result); // Güncelleme başarılıysa resmi state'e ekleyin.
      } catch (error) {
        console.error(error);
      }
    };
    fileReader.readAsDataURL(file);
  };

  const userGet = async () => {
    try {
      const res = await getUser(name);
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userGet();
  }, [profilImage]);

  useEffect(() => {
    userpostList();
  }, [posts]);



  
  
  return (
    <div>
     
      
      {
        girisYapildimi ? 
          <>
            <Card >
              <CardHeader
                title={user.username}
                
                avatar={<Avatar src={user.image} sx={{ marginBottom: 2, marginLeft: 10, width: 72, height: 72 }}>{name.charAt(0)}</Avatar>} />
            <Input onChange={handleChangeImage} type='file' ></Input>
            </Card>
             <Stack >
        <br />
        <Typography  align='center' variant='h5'>Paylaşımlarım</Typography>
      </Stack>
            {
              
            posts.reverse().map((post, index) => {
            return <UserPostPage key={index} liste={posts}  post={post}/>
           
         })
            }
             
          </>
         
         : <Login girisYaptimi={girisYapildimi}></Login>
      }
    </div>
    
  )
}

export default UserPage
