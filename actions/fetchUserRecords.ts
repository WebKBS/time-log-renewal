"use server";

import {
  endOfMonthUTC,
  endOfWeekUTC,
  startOfMonthUTC,
  startOfWeekUTC,
} from "@/features/date";
import { PrismaClient } from "@prisma/client";

interface fetchUserRecordsProps {
  userId: string;
}

export const fetchUserRecords = async ({ userId }: fetchUserRecordsProps) => {
  const prisma = new PrismaClient();

  try {
    const todayRecords = await prisma.record.findMany({
      orderBy: {
        startTime: "desc",
      },
      where: {
        userId,
        endTime: null,
        status: true,
      },
    });

    const weekRecords = await prisma.record.findMany({
      where: {
        userId,
        endTime: { not: null },
        startTime: { gte: startOfWeekUTC, lt: endOfWeekUTC },
      },
    });
    // console.log(weekRecords);

    const monthRecords = await prisma.record.findMany({
      where: {
        userId,
        endTime: { not: null },
        startTime: {
          gte: startOfMonthUTC,
          lt: endOfMonthUTC,
        },
      },
    });

    const allRecords = await prisma.record.findMany({
      where: {
        userId,
      },
      orderBy: {
        startTime: "desc",
      },
    });

    const todayStatus = todayRecords?.[0]?.status;

    return {
      todayRecords,
      weekRecords,
      monthRecords,
      todayStatus,
      allRecords,
    };
  } catch (error) {
    console.error("레코드 가져오기 실패:", error);
    throw new Error("레코드 가져오기 실패");
  } finally {
    await prisma.$disconnect();
  }
};

// 최신데이터 10개만 가져오기
export const latestRecords = async (userId: string) => {
  const prisma = new PrismaClient();

  try {
    return await prisma.record.findMany({
      where: {
        userId,
      },
      orderBy: {
        startTime: "desc",
      },
      take: 10,
    });
  } catch (error) {
    console.error("최신 데이터 가져오기 실패:", error);
    throw new Error("최신 데이터 가져오기 실패");
  } finally {
    await prisma.$disconnect();
  }
};
