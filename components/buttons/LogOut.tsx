"use client";

import React from "react";
import { useFormState } from "react-dom";
import { logout } from "@/actions/signout";
import FormButton from "@/components/buttons/FormButton";

const LogOut = () => {
  const [state, formAction] = useFormState(logout, null);
  console.log(state);

  return (
    <form action={formAction}>
      <FormButton label={"로그아웃"} />
    </form>
  );
};

export default LogOut;
