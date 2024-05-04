import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkInsRepository'

interface FechtUserCheckInUseCaseRequest {
  userId: string
  page: number
}

interface FechtUserCheckInUseCaseResponse {
  checkIns: CheckIn[]
}

class FechtUserCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FechtUserCheckInUseCaseRequest): Promise<FechtUserCheckInUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}

export { FechtUserCheckInUseCase }
