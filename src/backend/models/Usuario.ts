export interface Usuario {
  id: string;
  username: string;
  passwordHash: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}
