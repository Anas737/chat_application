import { Member } from "./Member";
import { Message } from "./Message";

export interface Room {
  id: string;
  name: string;
  users: Member[];
  messages: Message[];
}
