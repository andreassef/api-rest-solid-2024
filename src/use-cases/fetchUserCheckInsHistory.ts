import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkInsRepository'

interface FechtUserCheckInUseCaseRequest {
  userId: string
}

interface FechtUserCheckInUseCaseResponse {
  checkIns: CheckIn[]
}

class FechtUserCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: FechtUserCheckInUseCaseRequest): Promise<FechtUserCheckInUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId)

    return { checkIns }
  }
}

export { FechtUserCheckInUseCase }
