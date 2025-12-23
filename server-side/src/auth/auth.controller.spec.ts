import { Test } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UnauthorizedException } from '@nestjs/common'

describe('AuthController (unit)', () => {
	let controller: AuthController

	const authServiceMock = {
		REFRESH_TOKEN_NAME: 'refreshToken',
		login: jest.fn(),
		register: jest.fn(),
		getNewTokens: jest.fn(),
		validateOAuthLogin: jest.fn(),
		addRefreshTokenToResponse: jest.fn(),
		removeRefreshTokenFromResponse: jest.fn()
	}

	beforeEach(async () => {
		jest.clearAllMocks()

		const moduleRef = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [{ provide: AuthService, useValue: authServiceMock }]
		}).compile()

		controller = moduleRef.get(AuthController)
	})

	describe('getNewTokens', () => {
		it('removes cookie and throws if refreshToken missing', async () => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const req = { cookies: {} } as any
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const res = {} as any

			await expect(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				controller.getNewTokens(req, res)
			).rejects.toBeInstanceOf(UnauthorizedException)

			expect(
				authServiceMock.removeRefreshTokenFromResponse
			).toHaveBeenCalledWith(res)
			expect(authServiceMock.getNewTokens).not.toHaveBeenCalled()
		})

		it('calls service and sets new cookie if refreshToken exists', async () => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const req = { cookies: { refreshToken: 'old_rt' } } as any
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const res = {} as any

			authServiceMock.getNewTokens.mockResolvedValue({
				user: { id: 'u1' },
				accessToken: 'a',
				refreshToken: 'new_rt'
			})

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const result = await controller.getNewTokens(req, res)

			expect(authServiceMock.getNewTokens).toHaveBeenCalledWith('old_rt')
			expect(
				authServiceMock.addRefreshTokenToResponse
			).toHaveBeenCalledWith(res, 'new_rt')

			expect(result).toEqual({
				user: { id: 'u1' },
				accessToken: 'a'
			})
		})
	})
	describe('login', () => {
		it('calls service login and sets refresh cookie', async () => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const dto = { email: 'a@a.com', password: '123' } as any
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const res = {} as any

			authServiceMock.login.mockResolvedValue({
				refreshToken: 'new_rt',
				user: { id: 'u1' },
				accessToken: 'a'
			})

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const result = await controller.login(dto, res)

			expect(authServiceMock.login).toHaveBeenCalledWith(dto)
			expect(
				authServiceMock.addRefreshTokenToResponse
			).toHaveBeenCalledWith(res, 'new_rt')

			expect(result).toEqual({
				user: { id: 'u1' },
				accessToken: 'a'
			})
		})
	})
	describe('logout', () => {
		it('removes refresh token cookie and returns true', async () => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const res = {} as any

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const result = await controller.logout(res)

			expect(
				authServiceMock.removeRefreshTokenFromResponse
			).toHaveBeenCalledWith(res)

			expect(result).toBe(true)
		})
	})
})
