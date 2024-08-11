"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/svgs/LoadingIcon";

const FormButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button color="primary" type="submit" disabled={pending}>
      {pending ? <LoadingIcon className="w-6 h-6" /> : label}
    </Button>
  );
};

export default FormButton;
