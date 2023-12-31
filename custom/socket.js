/**
 * Socket
 */

import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';

export const startSocket = (httpServer) => {
  const originUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://theillear.github.io',
    io = new Server(httpServer, {
      cors: {
        origins: [originUrl],
      },
    });

  // Проверка токена JWT
  const JWT_SECRET = 'theillear';
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token; // fetch token from handshake auth sent by FE
    try {
      const user = await jwt.verify(token, JWT_SECRET);
      socket.user = user; // save the user data into socket object, to be used further
      next();
    } catch (e) {
      console.log('Error', e.message);
      return next(new Error(e.message));
    }
  });

  // Установка соединения
  io.on('connection', (socket) => {
    const room = socket.handshake.auth.room;
    // socket.join('myRandomChatRoomId');
    socket.join(room);
    console.log('User connected in room: ', room);

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
