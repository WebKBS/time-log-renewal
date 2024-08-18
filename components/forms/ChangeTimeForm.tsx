import React from "react";
import { Button } from "@/components/ui/button";
import { Record } from "@prisma/client";

interface ChangeTimeFormProps {
  startTime: string;
  onSetStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
  onSave: (userId: string) => void;
  onDelete: (recordId: number, userId: string) => Promise<void>;
  currentRecord: Record | null;
}

const ChangeTimeForm = ({
  startTime,
  onSetStartTime,
  endTime,
  setEndTime,
  onSave,
  onDelete,
  currentRecord,
}: ChangeTimeFormProps) => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="start-time">시작 시간</label>
          <input
            step={1}
            type="datetime-local"
            value={startTime}
            onChange={(e) => onSetStartTime(e.target.value)}
            className="py-1 px-3 border rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="end-time"> 종료 시간</label>
          <input
            step={1}
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="py-1 px-3 border rounded-md"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="destructive"
          onClick={() =>
            onDelete(currentRecord?.id || 0, currentRecord?.userId || "")
          }
        >
          삭제
        </Button>
        <Button
          variant="default"
          onClick={() => onSave(currentRecord?.userId || "")}
        >
          수정
        </Button>
      </div>
    </div>
  );
};

export default ChangeTimeForm;
