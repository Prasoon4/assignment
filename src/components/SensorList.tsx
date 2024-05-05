import React from "react";
import SensorListItem from "./SensorListItem";
import Sensor from "./Sensor.interface";

interface SensorListProps {
  sensors: Sensor[];
  toggleConnection: (sensor: Sensor) => void;
}

function SensorList({ sensors, toggleConnection }: SensorListProps) {
  return (
    <>
      <h1>Sensor List</h1>
      {sensors.length === 0 && (
        <div className="alert alert-dark" role="alert">
          No sensor found.
        </div>
      )}
      <ul className="list-group">
        {sensors.map((sensor) => (
          <li key={sensor.id} className="list-group-item">
            <SensorListItem
              sensor={sensor}
              toggleConnection={() => toggleConnection(sensor)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default SensorList;
