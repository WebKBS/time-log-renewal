"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteRecord = async (recordId: number, userId: string) => {
  try {
    const record = await prisma.record.delete({
      where: { id: recordId, userId: userId },
    });

    revalidatePath("/dashboard");

    return record;
  } catch (error) {
    console.error("Failed to delete record:", error);
    throw new Error("Failed to delete record");
  } finally {
    await prisma.$disconnect();
  }
};
