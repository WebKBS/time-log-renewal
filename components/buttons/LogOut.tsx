"use client";

import React from "react";
import { useFormState } from "react-dom";
import { logout } from "@/actions/signout";
import FormButton from "@/components/buttons/FormButton";

const LogOut = ({ className }: { className?: string }) => {
  const [state, formAction] = useFormState(logout, null);

  return (
    <form action={formAction} className={className}>
      <FormButton
        label={"로그아웃"}
        size={"sm"}
        variant="outline"
        className="w-[80%] mx-auto block md:w-auto hover:border-red-500"
      />
    </form>
  );
};

export default LogOut;
