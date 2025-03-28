// src/@types/global.d.ts
export interface User {
  _id?: string; // Optional if you expect it from MongoDB
  LoginID: string;
  Password: string;
  Role: string;
}