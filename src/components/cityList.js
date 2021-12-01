import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';

const stringToColor = (string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }      
    return color;
  }
const  stringAvatar = (name) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
            children: name.split(' ').length > 1 ?
             `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`:`${name.split(' ')[0][0]}`,
    };
}
const cityList = ({fullWidth, listData, setCity, onClose}) =>{
    const onClickQuery = (woeid) =>{
        setCity(woeid)

        console.log(woeid);
        onClose(null)
    }
    
    return (
        <Box sx={{ width: 1 }}>
        <List sx={{ width: '100%', 
        minWidth: fullWidth + 10, 
        bgcolor: 'background.paper', 
        borderRadius: '.5rem', p: 0 }} >
            {
                listData.map((val)=>{
                   return (
                    <ListItemButton key={val.woeid} onClick={ () => onClickQuery(val.woeid)}>
                        <ListItem sx={ {px: 0}} >
                            <ListItemAvatar>
                            <Avatar {...stringAvatar(val.title)} />
                            </ListItemAvatar>
                            <ListItemText primary={`${val.title}, ${val.location_type}`} secondary={val.latt_long} />
                         </ListItem>
                    </ListItemButton>
                   )
                })
            }
        </List>
        </Box>
      );
}

export default cityList;
