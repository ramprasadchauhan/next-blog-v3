"use client";
import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";

const SignInBtns = () => {
  const handleSignWithInGoogle = async () => {
    await signIn("google");
  };
  const handleSignWithInGithub = async () => {
    await signIn("github");
  };
  return (
    <>
      <h1 className="text-center mt-8">Sign in</h1>
      <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
        <button
          onClick={handleSignWithInGithub}
          className="flex items-center border px-4 py-2 rounded-full gap-2 hover:shadow-md hover:bg-slate-100/25 transition ease-in-out duration-200"
        >
          <span>
            <Image
              src="/github-logo.svg"
              width={30}
              height={30}
              alt="githublogo"
            />
          </span>
          Sign In with Github
        </button>
        <button
          onClick={handleSignWithInGoogle}
          className="flex items-center border px-4 py-2 rounded-full gap-2 hover:shadow-md hover:bg-slate-100/25 transition ease-in-out duration-200"
        >
          <span>
            <Image
              src="/google-logo.svg"
              width={30}
              height={30}
              alt="githublogo"
            />
          </span>
          Sign In with Google
        </button>
      </div>
    </>
  );
};

export default SignInBtns;
