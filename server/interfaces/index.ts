import { Types, Document, ObjectId } from "mongoose";
import { WebSocketServer } from "ws";

declare global {
  namespace Express {
    interface Request {
      wss?: WebSocketServer;
      user_id?: ObjectId
    }
  }
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegistration extends IUserLogin {
  confirm_password: string;
}

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  currency: "USD" | "PLN" | "EUR" | "UAH";
}

export interface IProductQuatitied extends IProduct {
  quantity: number;
  addedToCartAt: Date;
}

export interface ICartItem {
  item_id: Types.ObjectId;
  quantity: number;
  addedToCartAt: Date;
}

export interface IUserInfo {
  email: string;
  shared_carts: Types.ObjectId[];
}

export interface IAppContext {
  user: IUserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
  currentCart: ICartOption | null;
  setCurrentCart: React.Dispatch<React.SetStateAction<ICartOption | null>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ICartOption {
  label: string;
  value: string;
}
