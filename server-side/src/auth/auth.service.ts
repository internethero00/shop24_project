import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { PrismaService } from '../prisma.service'
import { ConfigService } from '@nestjs/config'
import { AuthDto } from './dto/auth.dto'
import { UserDB } from '../types/user_db'
import { verify } from 'argon2'
import { Response } from 'express'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private jwt: JwtService,
		private userService: UserService,
		private prisma: PrismaService,
		private configService: ConfigService
	) {
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const checkPassword = await verify(user.password!, dto.password)
		if (!checkPassword) throw new UnauthorizedException('Invalid password')
		const tokens = this.issueTokens(user.id)
		return { user, ...tokens }
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userService.getByEmail(dto.email)
		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.userService.create(dto)
		const tokens = this.issueTokens(user.id)
		return { user, ...tokens }
	}


	issueTokens(userId: string) {
		const data = { id: userId }
		const accessToken = this.jwt.sign(data, { expiresIn: '1h' })
		const refreshToken = this.jwt.sign(data, { expiresIn: '7d' })

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)

		if (!user) throw new NotFoundException('User not found')

		return user
	}

	async validateOAuthLogin(req: any) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		let user = await this.userService.getByEmail(req.user.email)

		if (!user) {
			user = await this.prisma.user.create({
				data: {
					email: req.user.email,
					name: req.user.name,
					picture: req.user.picture
				},
				include: {
					stores: true,
					favorites: true,
					orders: true
				}
			})
		}

		const tokens = this.issueTokens(user.id)

		return { user, ...tokens }
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			expires: expiresIn,
			httpOnly: true,
			domain: this.configService.get('SERVER_DOMAIN'),
			secure: true,
			sameSite: 'none'
		})
	}


}
