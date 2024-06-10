import { io } from "socket.io-client";

const socket = io("http://localhost:4000/");
// const socket = socketIO.connect("http://localhost:4000/");
// const socket = socketIO.connect("https://sumairroudani.com/");

export default socket;
