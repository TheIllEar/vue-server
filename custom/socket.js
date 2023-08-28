/**
 * Socket
 */

import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';

// @todo переделать на отдельный Vue проект
// .env for VUE_APP_SOCKET_ENDPOINT, PORT and ENV

export const startSocket = (httpServer) => {
  const originUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://theillear.github.io/vue/',
    io = new Server(httpServer, {
      cors: {
        origins: [originUrl],
      },
    });

  // Проверка токена JWT
  const JWT_SECRET = 'theillear'; // jwt secret

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token; // fetch token from handshake auth sent by FE
    console.log('check token');
    try {
      const user = await jwt.verify(token, JWT_SECRET); // verify jwt token and get user data
      console.log('user: ', user.name);
      socket.user = user; // save the user data into socket object, to be used further
      next();
    } catch (e) {
      console.log('error', e.message);
      return next(new Error(e.message));
    }
  });

  // Установка соединения
  io.on('connection', (socket) => {
    socket.join('myRandomChatRoomId');
    console.log('User connected');

    socket.on('message', ({ message, roomName }, callback) => {
      console.log('Sent message: ' + message + ' in ' + roomName);

      // generate data to send to receivers
      const outgoingMessage = {
        name: socket.user.name,
        id: socket.user.id,
        message,
      };

      // send socket to all in room except sender
      socket.in(roomName).emit('broadcast', outgoingMessage);
      callback({
        status: 'ok',
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
