import Post from "@/components/Post";
// import { postData } from "@/data";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { TPost } from "../types";
import { authOptions } from "@/utils/authOptions";

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    const { posts } = await res.json();
    return posts;
  } catch (error) {
    return null;
  }
};

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];
  if (!session) {
    redirect("/sign-in");
  }
  if (email) {
    posts = await getPosts(email);
  }
  return (
    <div>
      <h1>My Posts</h1>
      {posts && posts?.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            author={""}
            authorEmail={post.authorEmail}
            title={post.title}
            thumbnail={post.imageUrl}
            date={post.createdAt}
            content={post.content}
            links={post.links || []}
            category={post.catName}
          />
        ))
      ) : (
        <div className="py-5">
          <span className="mr-2">No Post created yet</span>
          <Link className="underline hover:text-red-600" href={`/create-post`}>
            Create New Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
