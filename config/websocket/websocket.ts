export default function wsConnection({
  ipAddress,
  setConnectionState,
}: {
  ipAddress: string,
  setConnectionState: (state: boolean) => void,
}) {
  const ws = new WebSocket(`ws://${ipAddress}:8080`);

  // Event listener for connection open
  ws.onopen = () => {
    // Sending a ping message to ESP32
    ws.send('ping');
  };

  ws.onmessage = (event) => {
    if (event.data === 'pong') {
      setConnectionState(true);
    }
  };

  // Event listener for connection close
  ws.onclose = () => {
    console.log('Disconnected from ESP32 WebSocket');
  };
}
