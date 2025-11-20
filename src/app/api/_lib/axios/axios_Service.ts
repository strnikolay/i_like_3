import { IUser, IContact, IcartItem } from "@/store/interfaces";
import $api from "./axios";
import {AxiosResponse} from 'axios';
import { Store } from "@/store/store";
import { toast } from "react-toastify";
//import {AuthResponse} from "../models&interface/interfaces/AuthResponse";

export default class axios_Service {
    static async get_user(email:string): Promise<AxiosResponse<IUser>> {
        return $api.post<IUser>('/user', {email})
    }

    static async update_fav(fav:string[], email:string): Promise<AxiosResponse<IUser>> {
        return $api.patch<IUser>('/user', {fav, email})
    }

    static async update_cart(cart:IcartItem[], email:string): Promise<AxiosResponse<IUser>> {
        return $api.patch<IUser>('/user', {cart, email})
    }

    static async login(email: string, pass:string): Promise<IUser|null> {
        const res = await $api.post<IUser>('/auth', {email})

        //console.log("pass",pass, " password", res.data.password)

        if(res.status===200&&!res.data){
            toast.error("пользователь с таким e-mail не найден",{
                autoClose: 3000,
            })
            return null;
        } else if(res.status===200&&res.data&&res.data.pass!==pass){
            toast.error("неправельный пароль",{
                autoClose: 3000,
            })
            return null
        } else {
            return res.data
        }
    }

    static async registration(email: string, pass: string): Promise<IUser|null>{
        const res = await $api.post<IUser>('/reg', {email, pass})
        if(res.status===200&&res.data){
            toast.success("пользователь зарегистрирован",{
                autoClose: 3000,
            })
            return res.data

        } else {
            toast.error("пользователь с таким e-mail уже зарегистрирован",{
                autoClose: 3000,
            })
            return null;
        }
    }

    /*static async refresh(accesstoken: string, refreshtoken: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/refresh', {accesstoken, refreshtoken})
    }*/
    /*static async refresh(accesstoken: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/refresh', {accesstoken})
    }*/

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

    /*static updateUser(email: string, nickname: string, border: string, avatar: string): Promise<AxiosResponse<IUser[]>> {
        return $api.post<IUser[]>('/update', {email, nickname, border, avatar})
    }

    static BuyGold(email: string, gold: number): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/update', {email, gold})
    }*/
}

