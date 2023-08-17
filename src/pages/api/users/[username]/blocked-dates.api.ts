import { prisma } from '@/lib/prisma';
// import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const username = String(req.query.username);

  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ message: 'Year or month not specified.' });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'User does not exist.' });
  }

  const availableWeekdays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  });

  const blockedWeekDays = Array.from({ length: 7 })
    .map((_, index) => {
      return index;
    })
    .filter((weekDay) => {
      return !availableWeekdays.some(
        (availableWeekdays) => availableWeekdays.week_day === weekDay
      );
    });

  return res.json({ blockedWeekDays });
}
