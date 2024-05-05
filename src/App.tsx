import React from "react";
import Sensor from "./components/Sensor.interface";
import SensorList from "./components/SensorList";
import "bootstrap/dist/css/bootstrap.css";
import useWebSocket from "./hooks/useWebSocket";

function App() {
  const url = "ws://localhost:500";
  const { webSocket, sensors, isConnected } = useWebSocket(url);

  const toggleConnection = (sensor: Sensor) => {
    if (!webSocket) {
      console.error("WebSocket not connected");
      return;
    }
    const command = sensor.connected ? "disconnect" : "connect";
    webSocket.send(JSON.stringify({ command, id: sensor.id }));
  };

  return (
    <div style={{ padding: "16px" }}>
      <div
        className={isConnected ? "alert alert-success" : "alert alert-danger"}
        role="alert"
      >
        {url}
        <span style={{ float: "right" }}>
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      <hr />
      <SensorList sensors={sensors} toggleConnection={toggleConnection} />
    </div>
  );
}

export default App;
