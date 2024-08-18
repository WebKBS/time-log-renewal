"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

export async function updateRecord(
  recordId: number,
  startTime: Date,
  endTime: Date,
  userId: string,
) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  const prisma = new PrismaClient();

  if (error || !data?.user) {
    throw new Error("사용자 세션을 가져오지 못했습니다.");
  }

  try {
    const record = await prisma.record.update({
      where: { id: recordId, userId: userId },
      data: {
        date: new Date(startTime),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    revalidatePath("/dashboard");

    return record;
  } catch (error) {
    console.error("Failed to update record:", error);
    throw new Error("Failed to update record");
  } finally {
    await prisma.$disconnect();
  }
}
