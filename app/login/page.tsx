import LoginForm from "@/components/client/forms/LoginForm";
import { Logo } from "@/constants/icons";
import Image from "next/image";
import timeImage from "@/public/images/background/time.jpg";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted  text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-extrabold gap-2 p-10">
          <Logo className="w-8 h-8" />
          <span>TIME LOG</span>
        </div>
        <div className="relative z-20 mt-auto">
          <Image src={timeImage} alt="Time Image" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 dark:from-zinc-900" />
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
