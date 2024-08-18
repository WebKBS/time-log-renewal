"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

export const deleteRecord = async (recordId: number, userId: string) => {
  const prisma = new PrismaClient();

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
