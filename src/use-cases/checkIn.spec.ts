import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/inMemoryCheckInsRepository'
import { CheckinUseCase } from './chekIn'
import { InMemoryGymsRepository } from '@/repositories/in-memory/inMemoryGymsRepository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-29.9499867),
      longitude: new Decimal(-51.0929696),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.9499867,
      userLongitude: -51.0929696,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice on current day', async () => {
    vi.setSystemTime(new Date(2024, 0, 2, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.9499867,
      userLongitude: -51.0929696,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -29.9499867,
        userLongitude: -51.0929696,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 3, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.9499867,
      userLongitude: -51.0929696,
    })

    vi.setSystemTime(new Date(2024, 0, 4, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -29.9499867,
      userLongitude: -51.0929696,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in when the user is too much distance from gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-29.9499867),
      longitude: new Decimal(-51.0929696),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -30.037369,
        userLongitude: -51.1899153,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
