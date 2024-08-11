"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/svgs/LoadingIcon";

interface FormButtonProps {
  label: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
}

const FormButton = ({ label, size, variant, className }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      color="primary"
      type="submit"
      disabled={pending}
      size={size}
      variant={variant}
      className={className}
    >
      {pending ? <LoadingIcon className="w-6 h-6" /> : label}
    </Button>
  );
};

export default FormButton;
