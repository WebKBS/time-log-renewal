"use client";
import React from "react";
import FormButton from "@/components/buttons/FormButton";
import { useFormState } from "react-dom";
import { endRecord } from "@/actions/end";

const EndForm = ({ workingStatus }: { workingStatus: boolean }) => {
  const [state, formAction] = useFormState(endRecord, null);

  return (
    <form action={formAction}>
      <FormButton
        label={"업무 종료"}
        disabled={!workingStatus}
        variant="destructive"
      />
    </form>
  );
};

export default EndForm;
