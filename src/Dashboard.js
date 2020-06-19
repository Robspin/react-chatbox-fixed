import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CTX } from './Store';

const useStyles = makeStyles(theme => ({
   root: {
      padding: theme.spacing(3, 2),
      margin: '50px'
   },
   flex: {
      display: 'flex',
      alignItems: 'center'
   },
   topicsWindow: {
      width: '30%',
      height: '300px',
      borderRight: '1px solid grey'
   },
   chatWindow: {
      width: '70%',
      height: '300px',
      padding: '20px'
   },
   chatBox: {
      width: '85%'
   },
   button: {
      width: '15%',
      backgroundColor: '#1277a5'
   }
}));

export default function Dashboard() {
   const classes = useStyles();
   const { allChats, sendChatAction, user } = useContext(CTX);
   const topics = Object.keys(allChats);
   const [activeTopic, changeActiveTopic] = useState(topics[0]);
   const [textValue, changeTextValue] = useState('');

   return (
      <Paper elevation={2} className={classes.root}>
         <Typography varient='h4' component='h4'>
            CHATBOX
         </Typography>
         <Typography varient='h5' component='h5'>
            {activeTopic}
         </Typography>
         <div className={classes.flex}>
            <div className={classes.topicsWindow}>
               <List>
                  {topics.map(topic => (
                     <ListItem
                        onClick={e => changeActiveTopic(e.target.innerText)}
                        key={topic}
                        button
                     >
                        <ListItemText primary={topic} />
                     </ListItem>
                  ))}
               </List>
            </div>
            <div className={classes.chatWindow}>
               {allChats[activeTopic].map((chat, i) => (
                  <div className={classes.flex} key={i}>
                     <Chip label={chat.from} className={classes.chip} />
                     <Typography variant='subtitle1'>{chat.msg}</Typography>
                  </div>
               ))}
            </div>
         </div>
         <div className={classes.flex}>
            <TextField
               label='Send a message'
               className={classes.chatBox}
               value={textValue}
               onChange={e => changeTextValue(e.target.value)}
            />
            <Button
               className={classes.button}
               variant='contained'
               color='primary'
               onClick={() => {
                  sendChatAction({
                     from: user,
                     msg: textValue,
                     topic: activeTopic
                  });
                  changeTextValue('');
               }}
            >
               Send
            </Button>
         </div>
      </Paper>
   );
}
