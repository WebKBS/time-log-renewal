"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { utcDate } from "@/features/date";

export async function createRecord(prevState: any, formData: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    throw new Error("사용자 세션을 가져오지 못했습니다.");
  }

  const userId = data.user.id;

  const email = data.user.email!;

  try {
    const existingRecord = await prisma.record.findFirst({
      where: {
        userId: userId,
        endTime: null,
        status: true,
      },
    });

    if (existingRecord) {
      return { error: "이미 업무를 시작했습니다.", record: existingRecord };
    }

    const record = await prisma.record.create({
      data: {
        email: email,
        userId: userId,
        date: utcDate,
        startTime: utcDate,
        status: true,
      },
    });

    revalidatePath("/dashboard");

    return record;
  } catch (error) {
    console.error("Failed to create record:", error);
    throw new Error("Failed to create record");
  } finally {
    await prisma.$disconnect();
  }
}
