import bcrypt from "bcrypt";

export const hashPassword = async(pass: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
}

export const checkPassword = async(pass: string, hashedPass: string) => {
    return await bcrypt.compare(pass, hashedPass);
}