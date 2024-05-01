import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkInsRepository'

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

class CheckinUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}

export { CheckinUseCase }
