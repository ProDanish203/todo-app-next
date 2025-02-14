"use server";

import { auth } from "@/middleware";
import { prisma } from "../db";
import bcrypt from "bcryptjs";

export const getUser = async () => {
  const session = await auth();

  if (!session || !session.user) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) throw new Error("User not found");

  return user;
};

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return user;
}
