import { Gym } from '@prisma/client'
import { GymRepository } from '../gymRepository'

class InMemoryGymsRepository implements GymRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
export { InMemoryGymsRepository }
