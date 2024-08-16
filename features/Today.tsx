import React from "react";
import { UTCDate } from "@date-fns/utc";

const Today = () => {
  const today = new UTCDate();

  const dayOfWeek = today.getDay();

  return (
    <div className="flex items-center text-xs self-end leading-[1.8] flex-wrap">
      <p>{today.toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" })}</p>
      <p>
        {dayOfWeek === 0
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
                    : "토요일"}
      </p>
    </div>
  );
};

export default Today;
