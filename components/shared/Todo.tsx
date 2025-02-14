"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Todo } from "@prisma/client";
import { Button, buttonVariants } from "../ui/button";
import { CheckIcon, Edit, Trash2, X } from "lucide-react";
import { format } from "date-fns";
import { deleteTodo, toggleCompleteTodo } from "@/lib/actions/todo";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

export const TodoCard = ({
  title,
  completed,
  createdAt,
  description,
  dueDate,
  id,
}: Todo) => {
  const router = useRouter();
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{title}</span>
          {completed && (
            <span className="text-xs font-normal text-green-500 bg-green-100 px-2 py-1 rounded-full">
              Completed
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {description && (
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
        )}
        <div className="text-xs text-muted-foreground">
          <p>Created: {format(new Date(createdAt), "PPP")}</p>
          {dueDate && <p>Due: {format(new Date(dueDate), "PPP")}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={async () => {
            await toggleCompleteTodo(id, !completed);
          }}
        >
          {!completed ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
          <span className="sr-only">Complete</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push(`/edit/${id}`)}
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <DeleteDialog id={id} />
      </CardFooter>
    </Card>
  );
};

export const Todos = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <TodoCard key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export const Todoloading = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton className="h-[200px]" />
      ))}
    </div>
  );
};

export const DeleteDialog = ({ id }: { id: string }) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
          })
        )}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your todo
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end space-x-2">
          <DialogClose
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            Cancel
          </DialogClose>

          <Button
            variant="destructive"
            onClick={async () => {
              await deleteTodo(id);
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
