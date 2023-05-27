import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { discord, twitter, wallet } = req.body as { discord: string, twitter: string, wallet: string };

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          wallet: wallet,
        },
      });

      if (existingUser) {
        const updatedUser: User = await prisma.user.update({
          where: {
            wallet: wallet,
          },
          data: {
            discord,
            twitter,
          },
        });

        res.json(updatedUser);
        return;
      }

      const existingDiscordOrTwitterUser = await prisma.user.findFirst({
        where: {
          OR: [
            { discord: discord },
            { twitter: twitter },
          ],
        },
      });

      if (existingDiscordOrTwitterUser) {
        res.status(400).json({ error: 'A user with this discord or twitter already exists' });
        return;
      }

      const result: User = await prisma.user.create({
        data: {
          discord,
          twitter,
          wallet,
        },
      });

      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: 'An error occurred while creating or updating the user', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
