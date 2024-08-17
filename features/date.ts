import { UTCDate } from "@date-fns/utc";
import {
  addHours,
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { startOfDay } from "date-fns/startOfDay";

// 점심시간
// export const lunchBreakInSeconds = 3600;

// 주간 업무시간 38시간
export const workHoursInSeconds = 38 * 3600;

// 2024-07-04T23:00:00Z
export const utcDate = new UTCDate();

// 시작과 끝 시간
export const startOfDayUTC = addHours(startOfDay(utcDate), -4);
export const endOfDayUTC = addHours(endOfDay(utcDate), 0);

// 주간 시작과 끝 시간
export const startOfWeekUTC = toZonedTime(startOfWeek(utcDate), "Asia/Seoul");
export const endOfWeekUTC = toZonedTime(endOfWeek(utcDate), "Asia/Seoul");

// 월간 시작과 끝 시간
export const startOfMonthUTC = addHours(startOfMonth(utcDate), -9);
export const endOfMonthUTC = toZonedTime(endOfMonth(utcDate), "Asia/Seoul");
