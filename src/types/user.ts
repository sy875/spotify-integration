import { JwtPayload } from "jsonwebtoken";


export interface IUser {
  avatar: {
    url?: string | null;
    localPath?: string | null;
  };
  username: string;
  email: string;
  fullName?: string;
  password: string;
  isEmailVerified: boolean;
  refreshToken?: string;
  spotifyAccessToken?:string;
  spotifyRefreshToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date | number;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date | number;
  loginType:String,
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
  generateTemporaryToken(): {
    unHashedToken: string;
    hashedToken: string;
    tokenExpiry: number;
  };
}


export interface MyJwtPayload extends JwtPayload {
  _id: string;
}
