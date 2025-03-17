import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/send.response";
import config from "../../config";
import { AuthService } from "./auth.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken, refreshToken, user } = await AuthService.createUserIntoDB(req.body);

        // saving refresh token in browser cookie
        res.cookie("refreshToken", refreshToken, {
            secure: config.NODE_ENV === "production",
            httpOnly: true,
        });


        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User registered successfully",
            token: accessToken,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};


const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken, refreshToken, user } = await AuthService.LoginUser(
            req.body,
        );

        // saving refresh token in browser cookie
        res.cookie("refreshToken", refreshToken, {
            secure: config.NODE_ENV === "production",
            httpOnly: true,
        });

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User logged in successfully",
            token: accessToken,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};



export const AuthController = {
    createUser,
    LoginUser
};