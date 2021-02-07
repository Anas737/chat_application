import User from "User";
import Message from "./Message";

export default interface Room {
  id: string;
  name: string;
  members: User[];
  messages: Message[];
}
