// src/echo.js
import Pusher from 'pusher-js';

// Cấu hình Echo với Pusher
const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY,{
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
});
export default pusher;
