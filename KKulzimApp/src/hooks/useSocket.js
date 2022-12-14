import { useCallback } from 'react';
import { io } from 'socket.io-client';
import Config from 'react-native-config';

let socket;

const useSocket = () => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect()
      socket = undefined
    }
  }, [])
  
  if (!socket) {
    socket = io(`${Config.API_URL}`, {
      transports: ['websocket'],
    })
  }

  return [socket, disconnect]
}

export default useSocket;
