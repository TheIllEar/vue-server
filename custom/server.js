import app from './app.js';
import { createServer } from 'http';

const PORT = process.env.PORT || 3000,
  httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log('Server started on port:', PORT);
});

export default httpServer;
