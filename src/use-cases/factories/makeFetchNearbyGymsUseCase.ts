import { FetchNearbyGymUseCase } from '../fetchNearbyGyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prismaGymsRepository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymUseCase = new FetchNearbyGymUseCase(gymsRepository)

  return fetchNearbyGymUseCase
}
