import React, { Suspense } from "react";
import PageContainer from "@/components/layouts/container/PageContainer";
import TimeInfoCard from "@/components/card/TimeInfoCard";
import StartEndCard from "@/components/card/StartEndCard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Info } from "lucide-react";

const DashboardPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const userId = data.user.id;

  return (
    <PageContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <StartEndCard userId={userId} />
      </Suspense>
      <TimeInfoCard userId={userId} />
      <div className="text-xs md:text-sm mt-2 mb-4 flex items-center gap-1">
        <Info className="self-start h-5 w-auto" />
        <p className="flex-1">
          점심시간은 12:30 ~ 13:30 이며 저녁시간은 18:30 ~ 19:00 입니다. 시간은
          자동 차감 됩니다.
        </p>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
