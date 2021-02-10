import User from "./User";

export default interface Message {
  id: string;
  authorId: string;
  author: string;
  content: string;
}
