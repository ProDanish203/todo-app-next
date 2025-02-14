"use server";

import { auth } from "@/middleware";
import { prisma } from "../db";

export const getUser = async () => {
  const session = await auth();

  if (!session || !session.user) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) throw new Error("User not found");

  return user;
};
