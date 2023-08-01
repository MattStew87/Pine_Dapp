// pages/api/content.ts


// Content table API route
// Allows users to submit content to the Content table in the database. 
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { wallet, contentURL, imageURL, contentType } = req.body as {
      wallet: string;
      contentURL: string;
      imageURL: string;
      contentType: string;
    };

    try {
      // Create the Content table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS Pine_Content (
          wallet VARCHAR(255),
          contentURL TEXT,
          imageURL TEXT,
          contentType VARCHAR(255),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Insert new content into the Content table
      const result = await sql`
        INSERT INTO Pine_Content (wallet, contentURL, imageURL, contentType)
        VALUES (${wallet}, ${contentURL}, ${imageURL}, ${contentType})
        RETURNING *;
      `;

      res.json(result.rows[0]);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'An error occurred while inserting the content', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
