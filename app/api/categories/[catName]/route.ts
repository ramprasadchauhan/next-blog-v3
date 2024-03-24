import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { catName: string } }
) {
  try {
    const catName = params.catName;
    const categoryWithPosts = await prisma.category.findUnique({
      where: { catName },
      include: {
        post: { include: { author: true }, orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json(categoryWithPosts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not fetch post" });
  }
}
