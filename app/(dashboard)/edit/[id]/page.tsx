import React from "react";
import { EditTodoClientPage } from "./page.client";
import { getTodoById } from "@/lib/actions/todo";
import { notFound } from "next/navigation";

const EditTodoPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const todo = await getTodoById(id);
  if (!todo) return notFound();
  return <EditTodoClientPage id={id} title={todo?.title} />;
};

export default EditTodoPage;
