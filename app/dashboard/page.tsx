import React, { Suspense } from "react";
import PageContainer from "@/components/layouts/container/PageContainer";
import TimeInfoCard from "@/components/layouts/card/TimeInfoCard";
import StartEndCard from "@/components/layouts/card/StartEndCard";
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
      <div className="text-sm mt-2 mb-4 flex items-center gap-2">
        <Info size={20} />
        <p>
          점심시간은 12:30 ~ 13:30 이며 저녁시간은 18:30 ~ 19:00 입니다. 시간은
          자동 차감 됩니다.
        </p>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
