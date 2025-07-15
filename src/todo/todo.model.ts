import {prisma} from "../../prisma/client";
import {Todo} from "./todo.interface";

export const todoRepository = {
    getAllTodos: async (id: number) => {
        return prisma.todo.findMany({
            where: {
                userid: id,
            },
        });
    },

    getTodoById: async (userId: number, todoId: number) => {
        return prisma.todo.findUnique({
            where: {
                id: todoId,
                userid: userId,
            }
        })
    },

    createTodo: async (userId: number, todo: Todo) => {
        const {title, description, status, dueDate} = todo;
        return prisma.todo.create({
            data: {
                title: title,
                description: description,
                status: status,
                dueDate: new Date(dueDate),
                user: {
                    connect: {
                        id: userId,
                    }
                }
            }
        });
    },

    deleteTodoById: async (userId: number, todoId: number) => {
        return prisma.todo.delete({
            where: {
                id: todoId,
                userid: userId,
            }
        });
    },

    updateTodoById: async (userId: number, todoId: number, todo: Todo) => {
        const {title, description, status, dueDate} = todo;
        return prisma.todo.update({
            where: {
                id: todoId,
                userid: userId,
            },
            data: {
                title: title,
                description: description,
                status: status,
                dueDate: new Date(dueDate),
            }
        });
    },
}