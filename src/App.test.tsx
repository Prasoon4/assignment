import { render } from "@testing-library/react";
import App from "./App";

test("renders App component", () => {
  const { getByText } = render(<App />);

  // Check if URL is displayed
  const urlElement = getByText("ws://localhost:500");
  expect(urlElement).toBeInTheDocument();

  // Check if connection status is displayed
  const connectionStatusElement = getByText("Disconnected");
  expect(connectionStatusElement).toBeInTheDocument();

  // Check if Sensor List header is displayed
  const sensorListHeaderElement = getByText("Sensor List");
  expect(sensorListHeaderElement).toBeInTheDocument();

  // Check if no sensor found alert is displayed
  const noSensorAlertElement = getByText("No sensor found.");
  expect(noSensorAlertElement).toBeInTheDocument();
});
