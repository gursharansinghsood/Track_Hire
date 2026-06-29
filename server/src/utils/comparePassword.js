import bcrypt from "bcryptjs";

export const isPasswordMatched = (passwordEntered, passwordOriginal) =>
    bcrypt.compare(passwordEntered, passwordOriginal);