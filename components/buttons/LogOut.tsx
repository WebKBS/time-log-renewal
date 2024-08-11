"use client";

import React from "react";
import { useFormState } from "react-dom";
import { logout } from "@/actions/signout";
import FormButton from "@/components/buttons/FormButton";

const LogOut = () => {
  const [state, formAction] = useFormState(logout, null);

  return (
    <form action={formAction}>
      <FormButton label={"로그아웃"} size={"sm"} variant="outline" />
    </form>
  );
};

export default LogOut;
