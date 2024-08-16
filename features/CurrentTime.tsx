"use client";

import { useEffect, useState } from "react";
import { UTCDate } from "@date-fns/utc";

const CurrentTime = () => {
  const [time, setTime] = useState(new UTCDate());

  useEffect(() => {
    const updateCurrentTime = () => {
      setTime(new UTCDate());
      // setTime(new Date());
    };

    const timer = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p className="font-bold text-2xl">
      {time.toLocaleTimeString("ko-KR", { timeZone: "Asia/Seoul" })}
    </p>
  );
};

export default CurrentTime;
