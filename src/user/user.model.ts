import {User} from "./user.interface";
import {prisma} from "../../prisma/client";

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
            }
        });
    },

    createUser: async (user: User) => {
        const {username, password} = user;
        return prisma.user.create({
            data: {
                username: username,
                password: password,
            }
        });
    },

    updateUser: async(user: User, id: number) => {
        const {username, password} = user;
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: username,
                password: password,
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
}