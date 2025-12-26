import { CategoryService } from './category.service'
import { Test } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

describe('CategoryService (unit)', () => {
	let service: CategoryService

	const prismaMock = {
		category: {
			findMany: jest.fn(),
			findUnique: jest.fn(),
			create: jest.fn(),
			update: jest.fn(),
			delete: jest.fn()
		}
	}

	beforeEach(async () => {
		jest.clearAllMocks()

		const moduleRef = await Test.createTestingModule({
			providers: [
				CategoryService,
				{ provide: PrismaService, useValue: prismaMock }
			]
		}).compile()

		service = moduleRef.get(CategoryService)
	})

	it('getByStoreId calls prisma.category.findMany with storeId', async () => {
		prismaMock.category.findMany.mockResolvedValue([{ id: 'c1' }])

		await expect(service.getByStoreId('s1')).resolves.toEqual([
			{ id: 'c1' }
		])

		expect(prismaMock.category.findMany).toHaveBeenCalledWith({
			where: { storeId: 's1' }
		})
	})

	it('getById throws NotFoundException when category not found', async () => {
		prismaMock.category.findUnique.mockResolvedValue(null)

		await expect(service.getById('x')).rejects.toBeInstanceOf(
			NotFoundException
		)
	})

	it('getById calls prisma.category.findUnique with id', async () => {
		prismaMock.category.findUnique.mockResolvedValue({ id: 'c1' })

		await expect(service.getById('c1')).resolves.toEqual({ id: 'c1' })

		expect(prismaMock.category.findUnique).toHaveBeenCalledWith({
			where: { id: 'c1' }
		})
	})

	it('create calls prisma.category.create with storeId and dto', async () => {
		prismaMock.category.create.mockResolvedValue({
			id: 'c1',
			storeId: 's1',
			title: 'a',
			description: 'a'
		})

		await expect(
			service.create('s1', { title: 'a', description: 'a' })
		).resolves.toEqual({
			id: 'c1',
			storeId: 's1',
			title: 'a',
			description: 'a'
		})

		expect(prismaMock.category.create).toHaveBeenCalledWith({
			data: { title: 'a', description: 'a', storeId: 's1' }
		})
	})

	it('update calls prisma.category.update with id and dto', async () => {
		prismaMock.category.findUnique.mockResolvedValue({ id: 'c1' })
		prismaMock.category.update.mockResolvedValue({
			id: 'c1',
			storeId: 's1',
			title: 'a',
			description: 'a'
		})

		await expect(
			service.update('c1', { title: 'a', description: 'a' })
		).resolves.toEqual({
			id: 'c1',
			storeId: 's1',
			title: 'a',
			description: 'a'
		})

		expect(prismaMock.category.update).toHaveBeenCalledWith({
			where: { id: 'c1' },
			data: { title: 'a', description: 'a' }
		})
	})
})
