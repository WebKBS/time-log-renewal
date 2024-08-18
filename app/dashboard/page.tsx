import React, { Suspense } from "react";
import PageContainer from "@/components/layouts/container/PageContainer";
import TimeInfoCard from "@/components/card/TimeInfoCard";
import StartEndCard from "@/components/card/StartEndCard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Info } from "lucide-react";
import WeeklyWorkChart from "@/components/chart/WeeklyWorkChart";
import { fetchUserRecords, latestRecords } from "@/actions/fetchUserRecords";
import { calculateTimeInfo } from "@/features/timeInfoCalculations";
import DataTable from "@/components/table/DataTable";

const DashboardPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const userId = data.user.id;

  const { weekRecords, monthRecords, todayRecords } = await fetchUserRecords({
    userId,
  });

  // Calculate the time information using the extracted logic
  const {
    totalWeekHoursInSeconds,
    remainingHoursFormatted,
    totalWeekHoursFormatted,
    totalMonthHoursFormatted,
  } = calculateTimeInfo(weekRecords, monthRecords);

  // 최근 기록이 있으면 첫 번째 기록을 사용하고, 그렇지 않으면 null을 사용합니다.
  // const prismaData = todayRecords.length ? todayRecords[0] : null;

  // 최신 10개의 기록을 가져옵니다.
  const lastTenRecords = await latestRecords(userId);

  return (
    <PageContainer scrollable={true}>
      <Suspense fallback={<div>Loading...</div>}>
        <StartEndCard userId={userId} />
      </Suspense>
      <TimeInfoCard
        totalWeekHoursFormatted={totalWeekHoursFormatted}
        totalMonthHoursFormatted={totalMonthHoursFormatted}
        remainingHoursFormatted={remainingHoursFormatted}
      />
      <div className="text-xs md:text-sm mt-2 mb-8 flex items-center gap-1">
        <Info className="self-start h-5 w-auto" />
        <p className="flex-1">
          점심시간은 12:30 ~ 13:30 이며 저녁시간은 18:30 ~ 19:00 입니다. 시간은
          자동 차감 됩니다.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 xl:grid-cols-6">
        <div className="col-span-4 lg:col-span-3 xl:col-span-2">
          <WeeklyWorkChart totalWeekHoursInSeconds={totalWeekHoursInSeconds} />
        </div>
        <div className="col-span-4">
          <DataTable records={lastTenRecords} />
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
