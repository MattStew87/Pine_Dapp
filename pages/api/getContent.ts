import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

// fethces all Pine Content for a specified address 
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { wallet } = req.query as {
      wallet: string;
    };

    try {
      const result = await sql`
        SELECT * FROM Pine_Content 
        WHERE wallet = ${wallet}
        ORDER BY createdAt DESC;
      `;

      res.json(result.rows);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'An error occurred while fetching the content', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
