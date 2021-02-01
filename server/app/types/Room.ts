import Message from "./Message";

export default interface Room {
  id: string;
  name: string;
  messages: Message[];
}
