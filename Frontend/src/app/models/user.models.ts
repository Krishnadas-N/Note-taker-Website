export interface INote {
  id:string,
  title: string;
  content: string;
  media: string[];
  user: string;
  created_at: Date;
  updated_at: Date;
}
