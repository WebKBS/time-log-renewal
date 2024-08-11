"use client";
import React from "react";
import { useFormState } from "react-dom";
import { login } from "@/actions/login";
import FormButton from "@/components/buttons/FormButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, null);

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold">LOGIN</CardTitle>
          <CardDescription>
            계정에 로그인하려면 아래에 이메일을 입력하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/*<Link*/}
                  {/*  href="#"*/}
                  {/*  className="ml-auto inline-block text-sm underline"*/}
                  {/*>*/}
                  {/*  Forgot your password?*/}
                  {/*</Link>*/}
                </div>
                <Input id="password" name="password" type="password" />
              </div>
              <FormButton label="로그인" />
              {/*<Button variant="outline" className="w-full">*/}
              {/*  Login with Google*/}
              {/*</Button>*/}
            </div>
            {/*<div className="mt-4 text-center text-sm">*/}
            {/*  Don&apos;t have an account?{" "}*/}
            {/*  <Link href="#" className="underline">*/}
            {/*    Sign up*/}
            {/*  </Link>*/}
            {/*</div>*/}
          </form>
        </CardContent>
      </Card>

      {/*<button formAction={signup}>Sign up</button>*/}
    </>
  );
};

export default LoginForm;
