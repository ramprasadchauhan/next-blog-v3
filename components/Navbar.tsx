"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const { status, data: session } = useSession();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="flex justify-between pb-4 border-b mb-4 relative">
      <div>
        <Link href={"/"}>
          <span className="text-3xl font-bold tracking-tighter text-dark">
            Tech News
          </span>
        </Link>
        <p className="text-sm">
          Exploring Tomorrow Innovation,
          <br /> One Byte at a Time
        </p>
      </div>
      {status === "authenticated" ? (
        <>
          {open && (
            <div className="absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex flex-col gap-2 min-w-[160px] text-right">
              <div className="font-semibold">{session?.user?.name} </div>
              <Link
                onClick={() => setOpen(false)}
                className="hover:underline"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="hover:underline"
                href="/create-post"
              >
                Create Post
              </Link>
              <button onClick={handleSignOut} className="btn">
                Sign Out
              </button>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <Link
              className="hidden  md:flex gap-2 items-center"
              href={"/create-post"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Create new
            </Link>
            <Image
              onClick={handleToggle}
              src={session?.user?.image || ""}
              alt="user"
              width={36}
              height={36}
              className="rounded-full cursor-pointer"
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link className="btn" href={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
