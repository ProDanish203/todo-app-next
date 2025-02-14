import { AddTodo } from "@/components/form/AddTodo";
import { Todoloading, Todos } from "@/components/shared/Todo";
import { getTodos } from "@/lib/actions/todo";
import React, { Suspense } from "react";

const DashboardPage = async () => {
  const todos = await getTodos();
  return (
    <section>
      <AddTodo />
      <Suspense fallback={<Todoloading />}>
        <Todos todos={todos} />
      </Suspense>
    </section>
  );
};

export default DashboardPage;
