import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlarmClock, CalendarCheck, ChartLine } from "lucide-react";

const cardData = [
  {
    title: "이번 주 일한 총 시간",
    icon: <CalendarCheck />,
    value: "00:00:00",
    percentage: "식사시간 제외",
  },
  {
    title: "주간 남은 업무시간",
    icon: <AlarmClock />,
    value: "38:00:00",
    percentage: "",
  },
  {
    title: "이번 달 일한 총 시간",
    icon: <ChartLine />,
    value: "50:45:49",
    percentage: "식사시간 제외",
  },
];

const TimeInfoCard = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.percentage}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TimeInfoCard;
