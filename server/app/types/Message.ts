import User from "./User";

export default interface Message {
  id: string;
  authorId: string;
  content: string;
}
