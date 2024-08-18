import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/dashboard");
  }

  if (error || !data?.user) {
    redirect("/login");
  }

  return <div>Home</div>;
};

export default Home;
