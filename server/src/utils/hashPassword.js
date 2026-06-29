import bcrypt from "bcryptjs";

export const hashPasswordGenerate = async (password) => {
    return await bcrypt.hash(password, 10);
};