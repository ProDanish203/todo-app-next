import { Todo } from "@prisma/client";
import { HomeIcon } from "lucide-react";

export const dashboardRoutes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },
];

export const todoData: Todo[] = [
  {
    id: "c1a2f650-32c9-4d29-bdde-8b0b4a47b5d6",
    title: "Complete Prisma Setup",
    description: "Set up Prisma with PostgreSQL and test database migrations.",
    completed: false,
    dueDate: new Date(),
    userId: "550e8400-e29b-41d4-a716-446655440000",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "a3b1e7d9-70f6-4f32-bfa6-2d01c812a7c3",
    title: "Write API Documentation",
    description: "Document all the API endpoints for the project.",
    completed: true,
    dueDate: new Date(),
    userId: "550e8400-e29b-41d4-a716-446655440000",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
