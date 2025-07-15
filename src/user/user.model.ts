import {User} from "./user.interface";
import {prisma} from "../../prisma/client";

export const userRepository = {
    getAllUsers: async ()  => {
        return prisma.user.findMany({
            select: {
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
    }
}