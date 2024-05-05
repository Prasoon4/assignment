import { render, fireEvent } from "@testing-library/react";
import SensorListItem from "./SensorListItem";
import Sensor from "./Sensor";

describe("SensorListItem component", () => {
  const dummySensor: Sensor = {
    id: "1",
    name: "Temperature",
    value: "25",
    unit: "°C",
    connected: false,
  };

  test("renders SensorListItem with sensor data", () => {
    const { getByText } = render(
      <SensorListItem sensor={dummySensor} toggleConnection={() => {}} />
    );
    expect(getByText(dummySensor.name)).toBeInTheDocument();
    expect(getByText("Connect")).toBeInTheDocument();
  });

  test("toggles connection when button is clicked", () => {
    const toggleConnectionMock = jest.fn();
    const { getByText } = render(
      <SensorListItem
        sensor={dummySensor}
        toggleConnection={toggleConnectionMock}
      />
    );
    fireEvent.click(getByText("Connect"));
    expect(toggleConnectionMock).toHaveBeenCalledTimes(1);
  });

  test("renders SensorListItem with connected sensor", () => {
    const connectedSensor = { ...dummySensor, connected: true };
    const { getByText } = render(
      <SensorListItem sensor={connectedSensor} toggleConnection={() => {}} />
    );
    const disconnectButton = getByText("Disconnect");
    expect(disconnectButton).toBeInTheDocument();
    expect(disconnectButton).toHaveTextContent("Disconnect");

    expect(getByText(dummySensor.unit)).toBeInTheDocument();
    expect(getByText(dummySensor.value!!)).toBeInTheDocument();

    expect(disconnectButton).toHaveTextContent("Disconnect");
  });

  test("displays correct button text based on connection state", () => {
    const { rerender, getByText } = render(
      <SensorListItem sensor={dummySensor} toggleConnection={() => {}} />
    );
    const connectButton = getByText("Connect");
    expect(connectButton).toBeInTheDocument();
    expect(connectButton).toHaveTextContent("Connect");

    // Update sensor connected state to true
    const updatedSensor = { ...dummySensor, connected: true };
    rerender(
      <SensorListItem sensor={updatedSensor} toggleConnection={() => {}} />
    );

    expect(connectButton).toHaveTextContent("Disconnect");
  });
});
