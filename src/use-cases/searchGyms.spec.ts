import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/inMemoryGymsRepository'
import { SearchGymsUseCase } from './searchGyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -29.9499867,
      longitude: -51.0929696,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -29.9499867,
      longitude: -51.0929696,
    })

    const { gyms } = await sut.execute({
      query: 'Javascript Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia numero: ${i}`,
        description: null,
        phone: null,
        latitude: -29.9499867,
        longitude: -51.0929696,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Academia',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia numero: 21' }),
      expect.objectContaining({ title: 'Academia numero: 22' }),
    ])
  })
})
