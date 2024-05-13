import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkInsRepository'

interface FetchUserCheckInUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInUseCaseResponse {
  checkIns: CheckIn[]
}

class FetchUserCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInUseCaseRequest): Promise<FetchUserCheckInUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}

export { FetchUserCheckInUseCase }
