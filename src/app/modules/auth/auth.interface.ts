export type TUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isDeleted: boolean;
    __v?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type TLogin = {
    email: string;
    password: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: null;
};