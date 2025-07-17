import {User} from "./user.interface";
import {prisma} from "../../prisma/client";
import bcrypt from "bcrypt";

export const userRepository = {
    getAllUsers: async ()  => {
        return prisma.user.findMany({
            select: {
                id: true,
                username: true,
            }
        });
    },

    getUserById: async (id : number) => {
        return prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                username: true,
                todos: true,
            }
        });
    },

    createUser: async (user: User) => {
        const {username, password} = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
            }
        });
    },

    updateUser: async(user: User, id: number) => {
        const {username, password} = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: username,
                password: hashedPassword,
            },
        })
    },

    deleteUserById: async (id: number) => {
        return prisma.user.delete({
            where: {
                id: id,
            }
        });
    },

    getUserByUsername: async (username: string) => {
        return prisma.user.findUnique({
            where: {
                username: username,
            }
        });
    },
}