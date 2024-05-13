import { FetchUserCheckInUseCase } from '../fetchUserCheckInsHistory'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchUserCheckInsHistory = new FetchUserCheckInUseCase(
    checkInsRepository,
  )

  return fetchUserCheckInsHistory
}
