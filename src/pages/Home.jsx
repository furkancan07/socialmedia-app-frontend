
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPost } from '../api/server';
import PostPage from './PostPage';

const Home = ({ girisYapildimi }) => {
  const [posts, setPosts] = useState([]);

  // tüm paylaşımlartı getiren method
  const postGetir = async () => {
    try {
      const res = await getPost();
      setPosts(res.data);
    } catch (err) {
      // Hata durumunda burada işlem yapılacak
    }
  };


  // useEffect yapısı

  useEffect(() => {
    postGetir();
  }, [posts]);



  
  return (
    <div>
      {girisYapildimi ? (
        <div>
          {posts.reverse().map((post, index) => {
            
            return <PostPage key={index} post={post}></PostPage>;
          })}
        </div>
      ) : (
        <Link to='/login'>Giriş Yapmadınız, giriş yap</Link>
      )}
    </div>
  );
};

export default Home;