import {User} from "./user.interface";
import dp from "../config/database.config";

export const userRepository = {
    getAllUsers: async ()  => {
        const query = "SELECT * FROM `USER`";
        const result = await dp.promise().query(query);
        return result[0];
    },

    createUser: async (user: User) => {
        const query = "INSERT INTO `USER` (username, password) VALUES (?, ?)";
        await dp.promise().query(query, [user.username, user.password]);
    }
}