"use server";
import React from "react";
import StartForm from "@/components/client/forms/StartForm";
import EndForm from "@/components/client/forms/EndForm";
import { fetchUserRecords } from "@/actions/fetchUserRecords";

const StartEndCard = async ({ userId }: { userId: string }) => {
  const { todayStatus } = await fetchUserRecords({ userId });

  return (
    <div className="mb-4 flex items-center justify-between">
      <StartForm workingStatus={todayStatus} />
      <EndForm workingStatus={todayStatus} />
    </div>
  );
};

export default StartEndCard;
