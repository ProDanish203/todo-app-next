"use client";
import { ListPlus, PlusCircle } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createTodo } from "@/lib/actions/todo";

export const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTodo({ title: newTodo });
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <label
        htmlFor="new-todo"
        className="block text-sm font-medium text-muted-foreground mb-2"
      >
        Add a new task
      </label>
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <ListPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            id="new-todo"
            type="text"
            placeholder="E.g., Buy groceries, Call mom, Finish report..."
            value={newTodo}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTodo(e.target.value)
            }
            className="pl-10 pr-4 py-2"
          />
        </div>
        <Button type="submit">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Task
        </Button>
      </div>
    </form>
  );
};
