import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

// API route for logging Pine_Holder status. 
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { wallet } = req.body as { wallet: string };

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
        INSERT INTO Users (wallet, Pine_Holder)
        VALUES (${wallet}, true)
        ON CONFLICT (wallet) DO UPDATE SET
        Pine_Holder = EXCLUDED.Pine_Holder
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
