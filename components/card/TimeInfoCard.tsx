import React from "react";
import { AlarmClock, CalendarCheck, ChartLine } from "lucide-react";
import TimeInfoCardItem from "@/components/card/TimeInfoCardItem";

const TimeInfoCard = ({
  totalWeekHoursFormatted,
  totalMonthHoursFormatted,
  remainingHoursFormatted,
}: {
  totalWeekHoursFormatted: string;
  totalMonthHoursFormatted: string;
  remainingHoursFormatted: string;
}) => {
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
