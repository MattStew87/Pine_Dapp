import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

// API route for storing user data
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { discord, twitter, wallet, email } = req.body as { discord: string, twitter: string, wallet: string, email: string };

    try {
      // Create the Users table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS Users (
          discord VARCHAR(255),
          twitter VARCHAR(255),
          email VARCHAR(255),
          wallet VARCHAR(255) UNIQUE,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          Pine_Holder BOOLEAN DEFAULT FALSE
        );
      `;
 
      // Insert the new user into the Users table or update existing user
      const result = await sql`
        INSERT INTO Users (discord, twitter, wallet, email)
        VALUES (${discord}, ${twitter}, ${wallet}, ${email})
        ON CONFLICT (wallet) DO UPDATE SET
        discord = EXCLUDED.discord,
        twitter = EXCLUDED.twitter,
        email = EXCLUDED.email
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
