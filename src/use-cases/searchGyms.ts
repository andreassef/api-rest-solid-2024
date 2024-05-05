import type { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gymRepository'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

class SearchGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchManyByQuery(query, page)

    return {
      gyms,
    }
  }
}

export { SearchGymsUseCase }
