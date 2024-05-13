import { GetUserMetricsUseCase } from '../getUserMetrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const userMetrics = new GetUserMetricsUseCase(checkInsRepository)

  return userMetrics
}
