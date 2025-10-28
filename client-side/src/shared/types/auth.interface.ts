import { IUser } from '@/shared/types/user.interface'

export interface IAuthForm {
	name: string
	email: string
	password: string
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
}