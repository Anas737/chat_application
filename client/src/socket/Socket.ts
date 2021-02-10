import { io } from "socket.io-client";

export default class Socket {
  private readonly SERVER_URL = "http://localhost:5000";
  private client = io(this.SERVER_URL);

  constructor(private username: string) {
    this.connect();
  }

  connect() {
    this.client.emit("user::connect", this.username);
  }

  createRoom(roomName: string) {
    this.client.emit("room::create", roomName);
  }

  join(roomId: string) {
    this.client.emit("user::join", roomId);
  }

  joined() {
    this.client.emit("user::joined");
  }

  sendMessage(content: string) {
    this.client.emit("user::sendMessage", content);
  }

  leaveRoom(nextRoomId: string) {
    this.client.emit("user::leave", nextRoomId);
  }

  disconnect() {
    this.client.emit("user::disconnect");
  }

  hasListner(event: string) {
    return this.client.hasListeners(event);
  }

  on(event: string, handler: any) {
    this.client.on(event, handler);
  }

  off(event: string) {
    this.client.off(event);
  }
}
