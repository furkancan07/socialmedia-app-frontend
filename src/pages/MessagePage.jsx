import React, { useEffect, useState } from 'react'
import { addMessage, getMessages } from '../api/server'

import { Card, Grid, TextField, Button } from '@mui/material';
import MessageListPage from './MessageListPage';


const MessagePage = ({sender, receiver, close }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const mesajEkle = async () => {
      
        try {
              const body = {
          content :message
      }
            var res = await addMessage(sender, receiver, body);
            console.log(res.data);
            setMessage('');
            alert("mesaj gönderildi");
      } catch (error) {
            throw error;
      }
    }
    const getAllMessages=async()=> {
      try {
          var res = await getMessages(sender, receiver);
          setMessages(res.data);
      } catch (error) {
          throw error;
      }
    }
    useEffect(() =>
    { getAllMessages() },
        [message])
    return (
      
        <div>
      <Card style={{backgroundColor : '#000000', color : 'white'}}
        className='Card'
        sx={{
          flexDirection: 'row',
          display: 'flow-root',
          marginTop: 4,
          marginBottom: 4,
          marginRight: 18,
          marginLeft: 18,
          maxWidth: '75 %'
          ,
        }}
            >
                {messages.map((msg, index) => {
          return <MessageListPage name={sender} key={index} message={msg} />;
        })}
        <Grid  container spacing={2} alignItems='flex-end'>
          <Grid item xs={10}>
            <TextField style={{backgroundColor : 'white'}}
              fullWidth
              size='medium'
              id='outlined-basic'
              label='Mesaj Gönder'
              variant='outlined'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
                      <Button onClick={mesajEkle}>Gönder</Button>
                     
                  </Grid>
                  <Grid item xs={2}>
                       <Button onClick={close} variant="contained">Kapat</Button>
                  </Grid>
        </Grid>
        
      </Card>
    </div>
  )
}

export default MessagePage
