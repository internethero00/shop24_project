import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { ConfigService } from '@nestjs/config'
import {
	UnauthorizedException,
	BadRequestException,
	NotFoundException
} from '@nestjs/common'

jest.mock('argon2', () => ({
	verify: jest.fn()
}))

import { verify } from 'argon2'
import { PrismaService } from '../prisma.service'

describe('AuthService (unit)', () => {
	let service: AuthService

	const jwtMock = {
		sign: jest.fn(),
		verify: jest.fn()
	}

	const userServiceMock = {
		getByEmail: jest.fn(),
		getById: jest.fn(),
		create: jest.fn()
	}

	const prismaMock = {
		user: {
			create: jest.fn()
		}
	}

	const configMock = {
		get: jest.fn()
	}

	beforeEach(async () => {
		jest.clearAllMocks()

		const moduleRef = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: JwtService, useValue: jwtMock },
				{ provide: UserService, useValue: userServiceMock },
				{ provide: PrismaService, useValue: prismaMock },
				{ provide: ConfigService, useValue: configMock }
			]
		}).compile()

		service = moduleRef.get(AuthService)
	})

	describe('login', () => {
		it('throws NotFoundException if user not found', async () => {
			userServiceMock.getByEmail.mockResolvedValue(null)

			await expect(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				service.login({ email: 'a@a.com', password: '123' } as any)
			).rejects.toBeInstanceOf(NotFoundException)
		})

		it('throws UnauthorizedException if password invalid', async () => {
			userServiceMock.getByEmail.mockResolvedValue({
				id: 'u1',
				password: 'hash'
			})
			;(verify as jest.Mock).mockResolvedValue(false)

			await expect(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				service.login({ email: 'a@a.com', password: 'wrong' } as any)
			).rejects.toBeInstanceOf(UnauthorizedException)
		})

		it('returns user + tokens if ok', async () => {
			const user = { id: 'u1', password: 'hash' }
			userServiceMock.getByEmail.mockResolvedValue(user)
			;(verify as jest.Mock).mockResolvedValue(true)

			jwtMock.sign
				.mockReturnValueOnce('access_token')
				.mockReturnValueOnce('refresh_token')

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const result = await service.login({
				email: 'a@a.com',
				password: '123'
			} as any)

			expect(result.user).toEqual(user)
			expect(result.accessToken).toBe('access_token')
			expect(result.refreshToken).toBe('refresh_token')

			expect(jwtMock.sign).toHaveBeenCalledTimes(2)
			expect(jwtMock.sign).toHaveBeenNthCalledWith(
				1,
				{ id: 'u1' },
				{ expiresIn: '1h' }
			)
			expect(jwtMock.sign).toHaveBeenNthCalledWith(
				2,
				{ id: 'u1' },
				{ expiresIn: '7d' }
			)
		})
	})

	describe('register', () => {
		it('throws BadRequestException if user exists', async () => {
			userServiceMock.getByEmail.mockResolvedValue({ id: 'exists' })

			await expect(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				service.register({ email: 'a@a.com', password: '123' } as any)
			).rejects.toBeInstanceOf(BadRequestException)
		})
	})

	describe('addRefreshTokenToResponse', () => {
		it('sets cookie with correct options', () => {
			configMock.get.mockReturnValue('example.com')

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const res = { cookie: jest.fn() } as any
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			service.addRefreshTokenToResponse(res, 'rt')

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			expect(res.cookie).toHaveBeenCalledWith(
				service.REFRESH_TOKEN_NAME,
				'rt',
				expect.objectContaining({
					httpOnly: true,
					domain: 'example.com',
					secure: true,
					sameSite: 'none',
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					expires: expect.any(Date)
				})
			)
		})
	})

	describe('removeRefreshTokenFromResponse', () => {
		it('clears cookie', () => {
			configMock.get.mockReturnValue('example.com')

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const res = { cookie: jest.fn() } as any
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			service.removeRefreshTokenFromResponse(res)

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			expect(res.cookie).toHaveBeenCalledWith(
				service.REFRESH_TOKEN_NAME,
				'',
				expect.objectContaining({
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					expires: expect.any(Date),
					httpOnly: true,
					domain: 'example.com',
					secure: true,
					sameSite: 'none'
				})
			)

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
			const call = (res.cookie as jest.Mock).mock.calls[0]
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
			const opts = call[2]
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
			expect(opts.expires.getTime()).toBeLessThan(Date.now())
		})
	})
})
