"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Record } from "@prisma/client";
import { updateRecord } from "@/actions/update";
import { calculateWorkedTime } from "@/utils/calculations/timeCalculations";
import { Button } from "@/components/ui/button";
import ChangeTimeModal from "@/components/modal/ChangeTimeModal";
import { deleteRecord } from "@/actions/delete";
import { useState } from "react";

interface DataTableProps {
  records: Record[];
}

const DataTable = ({ records }: DataTableProps) => {
  const [open, setOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Record | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  if (records.length === 0) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow w-full p-6 text-center">
        아직 기록이 없습니다.
      </div>
    );
  }

  const handleOpen = (record: Record) => {
    setCurrentRecord(record);
    const startDate = new Date(record.startTime);
    const endDate = record.endTime ? new Date(record.endTime) : new Date();

    // 9시간 더하기
    startDate.setHours(startDate.getHours() + 9);
    endDate.setHours(endDate.getHours() + 9);

    setStartTime(startDate.toISOString().slice(0, 16));
    setEndTime(endDate.toISOString().slice(0, 16));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRecord(null);
    setStartTime("");
    setEndTime("");
  };

  const handleSave = async (userId: string) => {
    if (currentRecord && startTime && endTime && userId) {
      await updateRecord(
        currentRecord.id,
        new Date(startTime),
        new Date(endTime),
        userId,
      );
      handleClose();
    }
  };

  const handleDelete = async (recordId: number, userId: string) => {
    // 확인 받기
    const confirmDelete = confirm(
      "정말 삭제하시겠습니까? 삭제된 데이터는 복구되지 않습니다.",
    );
    if (!confirmDelete) return;

    if (recordId && userId) {
      await deleteRecord(recordId, userId);
      handleClose();
    }
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow w-full pb-6">
      <Table>
        <TableCaption>
          최신 10개의 기록을 보여줍니다. 전체 기록은 Table 페이지에서 확인할 수
          있습니다.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>날짜</TableHead>
            <TableHead className="text-right">시작 시간</TableHead>
            <TableHead className="text-right">종료 시간</TableHead>
            <TableHead className="text-right">하루 일한 시간</TableHead>
            <TableHead className="text-right">시간 수정</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((row) => {
            const timeDifference = row.endTime
              ? calculateWorkedTime(
                  new Date(row.startTime),
                  new Date(row.endTime),
                )
              : 0;
            const totalMinutes = timeDifference / 60;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = Math.floor(totalMinutes % 60);

            const dayOfWeek = new Date(row.startTime).getDay();
            const dayOfWeekString =
              dayOfWeek === 0
                ? "일요일"
                : dayOfWeek === 1
                  ? "월요일"
                  : dayOfWeek === 2
                    ? "화요일"
                    : dayOfWeek === 3
                      ? "수요일"
                      : dayOfWeek === 4
                        ? "목요일"
                        : dayOfWeek === 5
                          ? "금요일"
                          : "토요일";

            return (
              <TableRow key={row.id}>
                <TableCell>
                  {new Date(row.date).toLocaleDateString("ko-KR", {
                    timeZone: "Asia/Seoul",
                  })}{" "}
                  {dayOfWeekString}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(row.startTime).toLocaleTimeString("ko-KR", {
                    timeZone: "Asia/Seoul",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {row.endTime
                    ? new Date(row.endTime).toLocaleTimeString("ko-KR", {
                        timeZone: "Asia/Seoul",
                      })
                    : "업무 중"}
                </TableCell>
                <TableCell className="text-right">
                  {row.endTime ? `${hours}시간 ${minutes}분` : "업무 중"}
                </TableCell>
                <TableCell className="text-right">
                  {row.endTime ? (
                    <Button size="sm" onClick={() => handleOpen(row)}>
                      수정
                    </Button>
                  ) : (
                    "업무 중"
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ChangeTimeModal
        open={open}
        setOpen={setOpen}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        onSave={handleSave}
        onDelete={handleDelete}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default DataTable;
