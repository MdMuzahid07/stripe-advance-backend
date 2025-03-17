import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import bcrypt from "bcrypt";
import config from "../../config";
import jwt from "jsonwebtoken";
import { TLogin, TUser } from "./auth.interface";
import UserModel from "./auth.model";

const createUserIntoDB = async (payload: TUser) => {
    const isUserExists = await UserModel.findOne({ email: payload?.email });

    // checking user exist or not
    if (isUserExists) {
        throw new CustomAppError(
            httpStatus.BAD_REQUEST,
            "this user is already exits",
        );
    }




    const salt = bcrypt.genSaltSync(Number(config.bcrypt_salt_round));
    const hash = bcrypt.hashSync(payload?.password, salt);

    const user = <TUser>{
        ...payload,
        password: hash,
    };

    const responseAfterSave = await UserModel.create(user);


    // jwt 
    const jwtPayload = {
        email: payload?.email,
        role: payload?.role,
        id: responseAfterSave?.id
    };

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_token_secret_key as string,
        { expiresIn: config.jwt_access_token_expires_in },
    );
    const refreshToken = jwt.sign(
        jwtPayload,
        config.jwt_refresh_token_secret_key as string,
        { expiresIn: config.jwt_refresh_token_expires_in },
    );


    const result = responseAfterSave.toObject() as Partial<TUser>;

    // removing some property property from response after saving in DB
    if (result) {
        delete result.isDeleted;
        delete result.password;
        delete result.__v;
        delete result.createdAt;
        delete result.updatedAt;
    };

    return {
        accessToken,
        refreshToken,
        user: result,
    };
};





const LoginUser = async (payload: TLogin) => {
    const { email, password } = payload;

    const isUserExistsOnDB = await UserModel.findOne({
        email,
    });

    if (!isUserExistsOnDB) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "User not exists");
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExistsOnDB?.password,
    );

    if (!isPasswordMatched) {
        throw new CustomAppError(
            httpStatus.BAD_REQUEST,
            "User password not matched, please try again with right password",
        );
    }

    if (isUserExistsOnDB && isUserExistsOnDB?.isDeleted === true) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "User not exists");
    }

    // jwt token

    const jwtPayload = {
        id: isUserExistsOnDB._id,
        email: isUserExistsOnDB?.email,
        role: isUserExistsOnDB?.role,
    };

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_token_secret_key as string,
        { expiresIn: config.jwt_access_token_expires_in },
    );
    const refreshToken = jwt.sign(
        jwtPayload,
        config.jwt_refresh_token_secret_key as string,
        { expiresIn: config.jwt_refresh_token_expires_in },
    );

    const result = isUserExistsOnDB.toObject() as Partial<TLogin>;

    // removing some property property from response after saving in DB
    if (result) {
        delete result.isDeleted;
        delete result.password;
        delete result.__v;
        delete result.createdAt;
        delete result.updatedAt;
    };


    return {
        accessToken,
        refreshToken,
        user: result,
    };
};

export const AuthService = {
    createUserIntoDB,
    LoginUser
};