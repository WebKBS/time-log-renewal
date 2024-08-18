import {
  calculateTotalHours,
  formatTotalHours,
} from "@/utils/calculations/timeCalculations";
import { workHoursInSeconds } from "@/features/date";
import { Record } from "@prisma/client";

export const calculateTimeInfo = (
  weekRecords: Record[],
  monthRecords: Record[],
) => {
  // 오늘 일한 총 시간을 계산
  // const totalTodayHoursInSeconds = calculateTotalHours(todayRecords);
  // 이번 주 일한 총 시간을 계산
  const totalWeekHoursInSeconds = calculateTotalHours(weekRecords);
  const totalMonthHoursInSeconds = calculateTotalHours(monthRecords);

  // 시간을 포맷팅
  // const totalTodayHoursFormatted = formatTotalHours(totalTodayHoursInSeconds);
  const totalWeekHoursFormatted = formatTotalHours(totalWeekHoursInSeconds);
  const totalMonthHoursFormatted = formatTotalHours(totalMonthHoursInSeconds);

  // 남은 시간을 계산
  const remainingHoursInSeconds = workHoursInSeconds - totalWeekHoursInSeconds;
  const remainingHoursFormatted = formatTotalHours(remainingHoursInSeconds);

  return {
    totalWeekHoursInSeconds,
    totalMonthHoursInSeconds,
    totalWeekHoursFormatted,
    totalMonthHoursFormatted,
    remainingHoursInSeconds,
    remainingHoursFormatted,
  };
};
