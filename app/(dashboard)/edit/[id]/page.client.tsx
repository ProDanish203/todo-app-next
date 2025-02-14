"use client";

import type React from "react";
import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ListPlus, Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateTodo } from "@/lib/actions/todo";

export const EditTodoClientPage = ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  const router = useRouter();
  const [editedTodo, setEditedTodo] = useState(title || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTodo({ id, title: editedTodo });
    console.log("Updating todo:", editedTodo);
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.push("/")} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      <Card className="max-w-md ">
        <CardHeader>
          <CardTitle>Edit Todo</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Task Title
              </label>
              <div className="relative">
                <ListPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter task title"
                  value={editedTodo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditedTodo(e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
