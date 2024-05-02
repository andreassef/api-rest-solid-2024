import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkInsRepository'
import { GymRepository } from '@/repositories/gymRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenCoordinates'

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

class CheckinUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISNTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISNTANCE_IN_KILOMETERS) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error('Checkin Already exists')
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}

export { CheckinUseCase }
