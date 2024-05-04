import { CheckInsRepository } from '@/repositories/checkInsRepository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount =
      await this.checkInsRepository.countCheckInsByUserId(userId)

    return { checkInsCount }
  }
}

export { GetUserMetricsUseCase }
