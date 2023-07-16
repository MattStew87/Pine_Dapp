import { NextApiRequest, NextApiResponse } from 'next';
import { createClient, QueryResult, QueryResultRow } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { wallet } = req.query;

  if (!wallet) {
    return res.status(400).json({ error: 'No Wallet in Database' });
  }

  const client = createClient();

  try {
    await client.connect();

    const result: QueryResult<QueryResultRow> = await client.query({
      text: 'SELECT * FROM Users WHERE wallet = $1',
      values: [wallet],
    });

    res.status(200).json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: 'An error occurred while retrieving the user', details: error.message });
  } finally {
    await client.end();
  }
}
