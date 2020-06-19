import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';
export const CTX = createContext();

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

const initState = {
   general: [
      { from: 'hoofd', msg: 'brah' },
      { from: 'mark', msg: 'bro' },
      { from: 'tess', msg: 'siss!' }
   ],
   bonsai: [
      { from: 'sensei', msg: 'hey' },
      { from: 'bonsaiFreak', msg: 'yo' },
      { from: 'bonsaiFreak', msg: 'leer mij alles over bonsai' }
   ]
};

const reducer = (state, action) => {
   const { from, msg, topic } = action.payload;
   switch (action.type) {
      case RECEIVE_MESSAGE:
         return {
            ...state,
            [topic]: [...state[topic], { from, msg }]
         };
      default:
         return state;
   }
};

let socket;
const user = 'anon' + Math.random(100).toFixed(2) * 100;

function sendChatAction(value) {
   socket.emit('chat message', value);
}

const Store = props => {
   const [allChats, dispatch] = useReducer(reducer, initState);

   if (!socket) {
      socket = io(':3001');
      socket.on('chat message', function (msg) {
         dispatch({ type: RECEIVE_MESSAGE, payload: msg });
      });
   }

   return (
      <CTX.Provider value={{ allChats, sendChatAction, user }}>
         {props.children}
      </CTX.Provider>
   );
};

export default Store;
