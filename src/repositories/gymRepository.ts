import { Gym, Prisma } from '@prisma/client'

interface GymRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
export { GymRepository }
