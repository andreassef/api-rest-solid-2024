import { PrismaUsersRepository } from '@/repositories/prisma/prismaUsersRepository'

import { GetUserProfileUseCase } from '../getUserProfile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const userProfile = new GetUserProfileUseCase(usersRepository)

  return userProfile
}
