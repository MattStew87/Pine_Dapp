import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { discord, twitter, wallet } = req.body as { discord: string, twitter: string, wallet: string };

    try {
      // Create the Users table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS Users (
          id SERIAL PRIMARY KEY,
          discord VARCHAR(255),
          twitter VARCHAR(255),
          wallet VARCHAR(255) UNIQUE,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Insert the new user into the Users table or update existing user
      const result = await sql`
        INSERT INTO Users (discord, twitter, wallet)
        VALUES (${discord}, ${twitter}, ${wallet})
        ON CONFLICT (wallet) DO UPDATE SET
        discord = EXCLUDED.discord,
        twitter = EXCLUDED.twitter
        RETURNING *;
      `;

      res.json(result.rows[0]);
    } catch (error: any) {
      res.status(500).json({ error: 'An error occurred while creating or updating the user', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
