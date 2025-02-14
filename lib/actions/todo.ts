"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { auth } from "@/middleware";

export const getTodos = async () => {
  const session = await auth();

  if (!session || !session.user) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) throw new Error("User not found");
  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
  });
  return todos;
};

export const getTodoById = async (id: string) => {
  return await prisma.todo.findUnique({
    where: { id },
  });
};

export const createTodo = async ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  const session = await auth();

  if (!session || !session.user) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) throw new Error("User not found");
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId: user.id,
    },
  });

  revalidatePath("/");
  return todo;
};

export const updateTodo = async ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) => {
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: {
      title,
      description,
    },
  });

  revalidatePath("/");
  return updatedTodo;
};

export const deleteTodo = async (id: string) => {
  const deletedTodo = await prisma.todo.delete({
    where: { id },
  });

  revalidatePath("/");
  return deletedTodo;
};

export const toggleCompleteTodo = async (id: string, status: boolean) => {
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: {
      completed: status,
    },
  });

  revalidatePath("/");
  return updatedTodo;
};
