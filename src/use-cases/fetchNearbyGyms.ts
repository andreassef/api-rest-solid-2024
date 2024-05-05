import type { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gymRepository'

interface FetchNearbyGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymUseCaseResponse {
  gyms: Gym[]
}

class FetchNearbyGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymUseCaseRequest): Promise<FetchNearbyGymUseCaseResponse> {
    const gyms = await this.gymRepository.findManyGymsNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}

export { FetchNearbyGymUseCase }
