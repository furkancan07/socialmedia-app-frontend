import React from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors'; // grey rengini içe aktar

const CommentListPage = ({ comment }) => {
  const { id, content, user } = comment;
  return (
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
        bgcolor: grey[300], // Grey rengini burada tanımlıyoruz
      }}
    >
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: grey[800] }}>{user.username.charAt(0)}</Avatar>}
        title={user.username}
      />
      <CardContent>
        <Typography variant='h6'>{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentListPage;