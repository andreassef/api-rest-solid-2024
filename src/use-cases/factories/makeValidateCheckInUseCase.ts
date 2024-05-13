import { PrismaCheckInsRepository } from '@/repositories/prisma/prismaCheckInsRepository'
import { ValidateCheckInUseCase } from '../validateCheckIn'

export function makeValidateUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

  return validateCheckInUseCase
}
