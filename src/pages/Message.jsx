import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../api/server'
import UserList from './UserList';
import Login from './Login';

const Message = ({name,girisYaptimi}) => {
    const [ users, setUsers] = useState([]);
  const getUsers = async () => {
   
      try {
          var res = await getAllUsers();
        setUsers(res.data);
      } catch (error) {
          throw error;
        }    
     
    }
   
    useEffect(() => {
        getUsers();
    },[users])
  return (
    <div>
      {
        girisYaptimi ? users.reverse().map((user, index) => {
              return <UserList  name={name} user={user} key={index}></UserList>
          })
          : <Login girisYaptimi={girisYaptimi}></Login>
      }
          
    </div>
  )
}

export default Message
