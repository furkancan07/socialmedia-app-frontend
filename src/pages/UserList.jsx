import { Avatar, ButtonBase, Card, CardHeader } from '@mui/material'
import { Button } from 'bootstrap'
import React from 'react'

const UserList = ({user}) => {
    return (
   
           <Card style={{backgroundColor : '#000000', color : 'white'}}  sx={{
         
          flexDirection: 'row',
          display: 'flow-root',
          marginTop: 4,
          marginBottom: 4,
          marginRight: 18,
        marginLeft: 18,
          
          maxWidth: '75%',
        }} >
            <ButtonBase>
  <CardHeader
              avatar={<Avatar>{user.username.charAt(0)}</Avatar>}
              title={user.username}
          >      
       </CardHeader>
            </ButtonBase>
        
    </Card> 
   
    
  )
}

export default UserList
