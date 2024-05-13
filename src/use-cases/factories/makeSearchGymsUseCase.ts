import { SearchGymsUseCase } from '../searchGyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'

export function makeValidateUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(gymsRepository)

  return searchGymsUseCase
}
