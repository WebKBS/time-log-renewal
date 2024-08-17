import { Record } from "@prisma/client";
export const calculateWorkedTime = (startTime: Date, endTime: Date): number => {
  const start = startTime.getTime();
  const end = endTime.getTime();

  let lunchStart = new Date(startTime);
  lunchStart.setUTCHours(3, 30, 0, 0);
  let lunchEnd = new Date(startTime);
  lunchEnd.setUTCHours(4, 30, 0, 0);

  let dinnerStart = new Date(startTime);
  dinnerStart.setUTCHours(9, 30, 0, 0);
  let dinnerEnd = new Date(startTime);
  dinnerEnd.setUTCHours(10, 0, 0, 0);

  // // 20시 이후에 출근한 경우 (UTC 기준) - KST 기준 오전 5시 이후
  if (startTime.getUTCHours() >= 20) {
    lunchStart.setUTCDate(lunchStart.getUTCDate() + 1);
    lunchEnd.setUTCDate(lunchEnd.getUTCDate() + 1);
    dinnerStart.setUTCDate(dinnerStart.getUTCDate() + 1);
    dinnerEnd.setUTCDate(dinnerEnd.getUTCDate() + 1);
  }

  let duration = (end - start) / 1000;

  // 점심시간 차감
  if (start < lunchEnd.getTime() && end > lunchStart.getTime()) {
    const overlapStart = Math.max(start, lunchStart.getTime());
    const overlapEnd = Math.min(end, lunchEnd.getTime());
    const overlapDuration = (overlapEnd - overlapStart) / 1000;
    duration -= overlapDuration;
  }

  // 저녁시간 차감
  if (start < dinnerEnd.getTime() && end > dinnerStart.getTime()) {
    const overlapStart = Math.max(start, dinnerStart.getTime());
    const overlapEnd = Math.min(end, dinnerEnd.getTime());
    const overlapDuration = (overlapEnd - overlapStart) / 1000;
    duration -= overlapDuration;
  }

  return duration;
};

export const calculateTotalHours = (records: Record[]): number => {
  return records.reduce((total, record) => {
    if (record?.endTime) {
      const duration = calculateWorkedTime(record.startTime, record.endTime);
      return total + duration;
    }
    return total;
  }, 0);
};

export const formatTotalHours = (totalSeconds: number): string => {
  if (totalSeconds < 0) return "00:00:00";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
