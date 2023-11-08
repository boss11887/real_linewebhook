import { Request, Response } from "express";
import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DATABASE,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  ssl: true,
});

const getUsers = (req: Request, res: Response) => {
  pool.query("SELECT * FROM pgtest", (error: Error, result: QueryResult) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

export { getUsers };
