import pool from "@/app/models/lib/db";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  country: string;
  phoneNumber: string;
  email: string;
  password: string;
  role_id: number;
  is_deleted: 0;
};

export const hashedPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const getToken = (user: User) => {
  const options: SignOptions = {
    expiresIn: process.env.EXPIREIN as SignOptions["expiresIn"],
  };

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role_id },
    process.env.NEXTAUTH_SECRET as Secret,
    options,
  );

  return token;
};

export const Register = async (newUser: User) => {
  const result = await pool.query<User>(
    `INSERT INTO users (firstName , lastName, age, country, phoneNumber ,email , password , role_id) VALUES ($1, $2,$3, $4 , $5, $6,$7,$8) RETURNING *`,
    [
      newUser.firstName,
      newUser.lastName,
      newUser.age,
      newUser.country,
      newUser.phoneNumber,
      newUser.email,
      await hashedPassword(newUser.password),
      1,
    ],
  );

  // console.log(result.rows[0])
  const user = result.rows[0];
  if (user) {
    return {
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      age: user.age,
      country: user.country,
      phonenumber: user.phonenumber,
      email: user.email,
      password: user.password,
      role_id: user.role_id,
      token : getToken(user)
    };
  }
};
