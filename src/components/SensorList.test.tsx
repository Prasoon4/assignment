import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SensorList from "./SensorList";
import SensorListItem from "./SensorListItem";
import Sensor from "./Sensor";

describe("SensorList component", () => {
  const sampleSensors: Array<Sensor> = [
    {
      id: "1",
      name: "Sensor 1",
      connected: false,
      unit: "Unit 1",
      value: "40",
    },
  ];

  test("renders SensorList component with sensors", () => {
    const toggleConnectionMock = jest.fn();
    const { getByText } = render(
      <SensorList
        sensors={sampleSensors}
        toggleConnection={toggleConnectionMock}
      />
    );

    const sensorListTitle = getByText("Sensor List");
    expect(sensorListTitle).toBeInTheDocument();

    sampleSensors.forEach((sensor) => {
      const sensorItem = getByText(sensor.name);
      expect(sensorItem).toBeInTheDocument();
    });
  });

  test("calls toggleConnection with correct sensor when button is clicked", () => {
    const toggleConnectionMock = jest.fn();
    const { getByText } = render(
      <SensorList
        sensors={sampleSensors}
        toggleConnection={toggleConnectionMock}
      />
    );

    sampleSensors.forEach((sensor) => {
      const sensorItem = getByText(sensor.name);
      const connectButton = getByText(
        sensor.connected ? "Disconnect" : "Connect"
      );
      fireEvent.click(connectButton);
      expect(toggleConnectionMock).toHaveBeenCalledWith(sensor);
    });
  });

  test("renders no sensor found message when no sensors are provided", () => {
    const { getByText } = render(
      <SensorList sensors={[]} toggleConnection={() => {}} />
    );
    const noSensorMessage = getByText("No sensor found.");
    expect(noSensorMessage).toBeInTheDocument();
  });
});
