import { Gym } from '@prisma/client'

interface GymRepository {
  findById(id: string): Promise<Gym | null>
}
export { GymRepository }
