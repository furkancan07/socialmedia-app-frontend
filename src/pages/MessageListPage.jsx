import React, { useEffect } from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system'; // @mui/system'den import edin
import { grey, yellow, green } from '@mui/material/colors';

const MessageListPage = ({ name, message }) => {
    const username = message.sender.username;
  const renk = username == name ? green[500] : grey[200];
  
    
    const MessageCard = styled(Card)({
    
    flexDirection: 'row',
      display: 'flow-root',
   marginLeft: 10,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 30,
    padding: (theme) => theme.spacing(1),
    maxWidth: '70%',
    width: '100%',
backgroundColor : renk
   
});

  const SenderAvatar = styled(Avatar)({
  
  backgroundColor: yellow[800],
  marginRight: (theme) => theme.spacing(1),
});

const ReceiverAvatar = styled(Avatar)({
  backgroundColor: grey[600],
  marginLeft: (theme) => theme.spacing(1),
});
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(); // Tarihi istediğiniz dilde ve formatla almak için kullanabilirsiniz
  const formattedTime = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }); // 24 saatlik formatta saat ve dakika bilgisini al

  return `${formattedDate} ${formattedTime}`;
  };
  

const formattedDate = formatDate(message.date);
  useEffect(() => {

},[message])

  return (
    <MessageCard>
      
      {message.sender.username == name ? (
        
        <CardHeader
          avatar={<SenderAvatar src={message.sender.image} >{message.sender.username.charAt(0)}</SenderAvatar>}
                  title={message.sender.username}
                
        />
      ) : (
        <CardHeader
          avatar={<ReceiverAvatar src={message.sender.image}>{message.sender.username.charAt(0)}</ReceiverAvatar>}
          title={message.sender.username}
        />
      )}
      <CardContent>
              <Typography variant='body1'>{message.content}</Typography>
              <Typography variant='body2'>{formattedDate}</Typography>
      </CardContent>
    </MessageCard>
  );
};

export default MessageListPage;