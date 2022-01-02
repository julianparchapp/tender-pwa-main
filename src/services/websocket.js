import Echo from 'laravel-echo';
import io from 'socket.io-client';

const connectToSocket = (token) => {
  const echo = new Echo({
    broadcaster: 'socket.io',
    host: 'wss://api.wuay.com.co',
    key: '6189b6d6e187880c',
    client: io,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return new Promise((resolve) => {
    resolve(echo);
  });
};

export default connectToSocket;
