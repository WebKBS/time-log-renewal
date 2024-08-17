"use server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { UTCDate } from "@date-fns/utc";
import { revalidatePath } from "next/cache";

export async function endRecord(prevState: any, formData: FormData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    throw new Error("사용자 세션을 가져오지 못했습니다.");
  }

  const userId = data.user.id;

  try {
    const existingRecord = await prisma.record.findFirst({
      where: {
        userId: userId,
        endTime: null,
        status: true,
      },
    });

    if (!existingRecord) {
      return { error: "업무를 시작하지 않았습니다.", record: null };
    }

    if (existingRecord.status === false) {
      return { error: "이미 업무를 종료했습니다.", record: existingRecord };
    }

    const record = await prisma.record.update({
      where: {
        id: existingRecord.id,
      },
      data: {
        endTime: new UTCDate(),
        status: false,
      },
    });

    revalidatePath("/dashboard");

    return record;
  } catch (error) {
    console.error("Failed to end record:", error);
    throw new Error("Failed to end record");
  } finally {
    await prisma.$disconnect();
  }
}
