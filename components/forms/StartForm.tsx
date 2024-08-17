"use client";
import React from "react";
import { useFormState } from "react-dom";
import { createRecord } from "@/actions/start";
import FormButton from "@/components/buttons/FormButton";

const StartForm = ({ workingStatus }: { workingStatus: boolean }) => {
  const [state, formAction] = useFormState(createRecord, null);

  return (
    <form action={formAction}>
      <FormButton
        label={workingStatus ? "업무 중" : "업무 시작"}
        disabled={workingStatus}
      />
    </form>
  );
};

export default StartForm;
