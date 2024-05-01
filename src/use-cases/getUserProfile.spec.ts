import { InMemoryUsersRepository } from '@/in-memory/inMemoryUsersRepository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './getUserProfile'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

let usersRepository: InMemoryUsersRepository
// sut stands for system under test
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get a user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Assef',
      email: 'assef@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Assef')
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Assef',
      email: 'assef@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
