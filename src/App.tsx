import React, { useEffect, useState } from "react";
import Sensor from "./components/Sensor";
import SensorList from "./components/SensorList";
import "bootstrap/dist/css/bootstrap.css";

function UseWebSocket(url: string) {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      setWebSocket(socket);
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  return webSocket;
}

function App() {
  const [sensors, setSensors] = useState<Array<Sensor>>([]);
  const [connected, setConnection] = useState(false);
  const url = "ws://localhost:500";

  const webSocket = UseWebSocket(url);

  useEffect(() => {
    if (!webSocket) return;

    webSocket.onmessage = (event) => {
      let sensor: Sensor;
      try {
        sensor = JSON.parse(event.data) as Sensor;
      } catch (e) {
        return console.error(e);
      }
      setSensors((oldSensors) => {
        const foundIndex = oldSensors.findIndex(
          (oldSensor) => oldSensor.id === sensor.id
        );
        if (foundIndex === -1) {
          return [...oldSensors, sensor];
        } else {
          const newSensors = [...oldSensors];
          newSensors[foundIndex] = sensor;
          return newSensors;
        }
      });
    };

    webSocket.onclose = () => {
      setConnection(false);
      setSensors([]);
    };

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [webSocket]);

  const toggleConnection = (sensor: Sensor) => {
    if (!webSocket) {
      console.error("WebSocket not connected");
      return;
    }
    webSocket.send(
      JSON.stringify({
        command: sensor.connected ? "disconnect" : "connect",
        id: sensor.id,
      })
    );
  };

  return (
    <>
      <div style={{ padding: "10px" }}>
        <div
          className={connected ? "alert alert-success" : "alert alert-danger"}
          role="alert"
        >
          {url}
          <span style={{ float: "right" }}>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <hr />
        <SensorList
          sensors={sensors}
          toggleConnection={(sensor) => toggleConnection(sensor)}
        />
      </div>
    </>
  );
}

export default App;
