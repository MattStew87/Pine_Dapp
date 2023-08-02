// pages/api/deleteTables.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

      // Delete the Pine_Content table if it exists
      await sql`
        DROP TABLE IF EXISTS Pine_Content;
      `;

      res.status(200).json({ message: 'Tables deleted successfully' });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'An error occurred while deleting the tables', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
