// src/models/noteModel.ts
export interface INote {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
