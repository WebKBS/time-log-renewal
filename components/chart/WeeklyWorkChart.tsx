"use client";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { workHoursInSeconds } from "@/features/date";

ChartJS.register(ArcElement, Tooltip, Legend);

const WeeklyWorkChart = ({
  totalWeekHoursInSeconds,
}: {
  totalWeekHoursInSeconds: number;
}) => {
  const totalWorkHours = workHoursInSeconds / 3600;
  const workedHours = totalWeekHoursInSeconds / 3600;
  let remainingHours = totalWorkHours - workedHours;
  let overtimeHours = 0;

  if (remainingHours < 0) {
    overtimeHours = -remainingHours;
    remainingHours = 0;
  }

  const data = {
    labels: ["이번주 일한 시간", "남은 시간", "초과 시간"],
    datasets: [
      {
        data: [workedHours, remainingHours, overtimeHours],
        backgroundColor: ["#007BFF", "#f63bc1", "#FF0000"],
        hoverBackgroundColor: ["#0056B3", "#b71589", "#CC0000"],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff", // 레이블 텍스트를 흰색으로 설정
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw;
            const hours = Math.floor(value);
            const minutes = Math.floor((value - hours) * 60);
            const seconds = Math.floor(((value - hours) * 60 - minutes) * 60);

            return `${tooltipItem.label}: ${hours}시간 ${minutes}분 ${seconds}초`;
          },
        },
      },
    },
  };
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow w-full h-full">
      <div className="p-6 w-full h-full flex items-center justify-center">
        <Pie
          data={data}
          options={options}
          className="w-full h-auto"
          width={375}
          height={375}
        />
      </div>
    </div>
  );
};

export default WeeklyWorkChart;
