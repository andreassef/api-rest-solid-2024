import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/inMemoryGymsRepository'
import { FetchNearbyGymUseCase } from './fetchNearbyGyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymUseCase

describe('Fetch nearby Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -29.9499867,
      longitude: -51.0929696,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -30.0094961,
      longitude: -51.1856082,
    })

    const { gyms } = await sut.execute({
      userLatitude: -29.9499867,
      userLongitude: -51.0929696,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})

// -30.0094961,-51.1856082
