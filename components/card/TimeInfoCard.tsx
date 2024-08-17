import React from "react";
import { AlarmClock, CalendarCheck, ChartLine } from "lucide-react";
import { fetchUserRecords } from "@/actions/fetchUserRecords";
import TimeInfoCardItem from "@/components/card/TimeInfoCardItem";
import {
  calculateTotalHours,
  formatTotalHours,
} from "@/utils/calculations/timeCalculations";
import { workHoursInSeconds } from "@/features/date";

const TimeInfoCard = async ({ userId }: { userId: string }) => {
  const { weekRecords, monthRecords } = await fetchUserRecords({
    userId,
  });

  // 오늘 일한 총 시간을 계산
  // const totalTodayHoursInSeconds = calculateTotalHours(todayRecords);
  // 이번 주 일한 총 시간을 계산
  const totalWeekHoursInSeconds = calculateTotalHours(weekRecords);
  // 이번 달 일한 총 시간을 계산
  const totalMonthHoursInSeconds = calculateTotalHours(monthRecords);

  // 시간을 포맷팅
  // const totalTodayHoursFormatted = formatTotalHours(totalTodayHoursInSeconds);
  const totalWeekHoursFormatted = formatTotalHours(totalWeekHoursInSeconds);
  const totalMonthHoursFormatted = formatTotalHours(totalMonthHoursInSeconds);

  // 남은 시간을 계산
  const remainingHoursInSeconds = workHoursInSeconds - totalWeekHoursInSeconds;
  const remainingHoursFormatted = formatTotalHours(remainingHoursInSeconds);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TimeInfoCardItem
        title={"이번 주 일한 총 시간"}
        icon={<CalendarCheck />}
        value={totalWeekHoursFormatted}
        note={"식사시간 제외"}
      />
      <TimeInfoCardItem
        title={"주간 남은 총 업무시간"}
        icon={<AlarmClock />}
        value={remainingHoursFormatted}
      />
      <TimeInfoCardItem
        title={"이번 달 일한 총 시간"}
        icon={<ChartLine />}
        value={totalMonthHoursFormatted}
        note={"식사시간 제외"}
      />
    </div>
  );
};

export default TimeInfoCard;
