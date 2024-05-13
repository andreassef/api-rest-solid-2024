import { CheckinUseCase } from '../chekIn'
import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'

export function makeCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInsUseCase = new CheckinUseCase(checkInsRepository, gymsRepository)

  return checkInsUseCase
}
