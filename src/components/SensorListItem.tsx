import React from "react";
import Sensor from "./Sensor.interface";

interface SensorListItemProps {
  sensor: Sensor;
  toggleConnection: () => void;
}

function SensorListItem({ sensor, toggleConnection }: SensorListItemProps) {
  return (
    <>
      <div>
        <div style={{ float: "left", minHeight: "64px" }}>
          <h4>{sensor.name}</h4>
          {sensor.connected && (
            <div>
              <span style={{ fontFamily: "monospace" }}>{sensor.value}</span>
              <span style={{ color: "orange", marginLeft: "4px" }}>
                {sensor.unit}
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          style={{ float: "right", minWidth: "120px" }}
          className={sensor.connected ? "btn btn-danger" : "btn btn-success"}
          onClick={toggleConnection}
        >
          {sensor.connected ? "Disconnect" : "Connect"}
        </button>
      </div>
    </>
  );
}

export default SensorListItem;
