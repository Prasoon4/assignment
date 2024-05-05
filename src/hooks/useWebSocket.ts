import React, { useEffect, useState } from 'react';
import Sensor from '../components/Sensor.interface';

interface WebSocketState {
  isConnected: boolean;
  sensors: Sensor[];
  webSocket: WebSocket | null;
}

function useWebSocket(url: string): WebSocketState {
  const [sensors, setSensors] = useState<{ [key: string]: Sensor }>({});
  const [isConnected, setConnection] = useState(false);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      setConnection(true);
      setWebSocket(socket);
    };

    socket.onmessage = (event) => {
      let sensor: Sensor;
      try {
        sensor = JSON.parse(event.data) as Sensor;
      } catch (e) {
        console.error(e);
        return;
      }
      setSensors((oldSensors) => {
        const newSensors = { ...oldSensors, [sensor.id]: sensor };
        return newSensors;
      });
    };

    socket.onclose = () => {
      setConnection(false);
      setSensors({});
      setWebSocket(null);
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  return { isConnected, sensors: Object.values(sensors), webSocket };
}

export default useWebSocket;