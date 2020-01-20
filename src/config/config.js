const WS_ID = Math.floor(Math.random() * 9000000000);
const configKeys = {
  ROOT_URL: "https://xdemic-api.herokuapp.com/", // ROOT API's URL
  WS_URL: `wss://xdemic-api.herokuapp.com/?wsId=${WS_ID}` // WebSocket URL
};
export default configKeys;
