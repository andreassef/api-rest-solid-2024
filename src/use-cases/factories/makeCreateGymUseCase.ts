import { CreateGymUseCase } from '../createGym'
import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(gymsRepository)

  return createGymUseCase
}
