import { Test } from '@nestjs/testing'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { NotFoundException } from '@nestjs/common'

describe('CategoryController (unit)', () => {
	let controller: CategoryController

	const categoryServiceMock = {
		getByStoreId: jest.fn(),
		getById: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		delete: jest.fn()
	}

	beforeEach(async () => {
		jest.clearAllMocks()

		const moduleRef = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [
				{ provide: CategoryService, useValue: categoryServiceMock }
			]
		}).compile()

		controller = moduleRef.get(CategoryController)
	})

	describe('getByStoreId', () => {
		it('should return categories by storeId and call service with storeId', async () => {
			categoryServiceMock.getByStoreId.mockResolvedValue([
				{ id: 'c1', title: 'a', description: 'a', storeId: 's1' }
			])

			await expect(controller.getByStoreId('s1')).resolves.toEqual([
				{ id: 'c1', title: 'a', description: 'a', storeId: 's1' }
			])

			expect(categoryServiceMock.getByStoreId).toHaveBeenCalledTimes(1)
			expect(categoryServiceMock.getByStoreId).toHaveBeenCalledWith('s1')
		})
		it('should bubble up errors from service', async () => {
			categoryServiceMock.getByStoreId.mockRejectedValue(
				new NotFoundException('Store not found')
			)

			await expect(controller.getByStoreId('bad')).rejects.toBeInstanceOf(
				NotFoundException
			)
		})
	})

	describe('getById', () => {
		it('should return categories by id and call service with id', async () => {
			categoryServiceMock.getById.mockResolvedValue({
				id: 'i1',
				title: 'a',
				description: 'a',
				storeId: 's1'
			})

			await expect(controller.getById('i1')).resolves.toEqual({
				id: 'i1',
				title: 'a',
				description: 'a',
				storeId: 's1'
			})

			expect(categoryServiceMock.getById).toHaveBeenCalledTimes(1)
			expect(categoryServiceMock.getById).toHaveBeenCalledWith('i1')
		})
		it('should bubble up errors from service', async () => {
			categoryServiceMock.getById.mockRejectedValue(
				new NotFoundException('Category not found')
			)

			await expect(controller.getById('bad')).rejects.toBeInstanceOf(
				NotFoundException
			)
		})
	})

	describe('create', () => {
		it('should return categories and call service with storeId, dto', async () => {
			categoryServiceMock.create.mockResolvedValue({
				id: 'i1',
				title: 'a',
				description: 'a',
				storeId: 's1'
			})

			await expect(
				controller.create('s1', { title: 'a', description: 'a' })
			).resolves.toEqual({
				id: 'i1',
				title: 'a',
				description: 'a',
				storeId: 's1'
			})

			expect(categoryServiceMock.create).toHaveBeenCalledTimes(1)
			expect(categoryServiceMock.create).toHaveBeenCalledWith('s1', {
				title: 'a',
				description: 'a'
			})
		})
	})
})
