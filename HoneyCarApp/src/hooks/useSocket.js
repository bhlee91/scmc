import { useCallback } from 'react';
import { io } from 'socket.io-client';
import Config from 'react-native-config';

const useSocket = () => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);
  if (!socket) {
    socket = io(`${Config.API_URL}`, {
      transports: ['websocket'],
      //path: '/socket-io',
    });
  }
  return [socket, disconnect];
};

export default useSocket;
