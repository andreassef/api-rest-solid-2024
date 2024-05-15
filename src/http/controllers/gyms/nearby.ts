import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/makeSearchGymsUseCase'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymQuerySchema.parse(request.body)

  const createGym = makeSearchGymsUseCase()
  const { gyms } = await createGym.execute({ query: q, page })

  return reply.status(201).send({ gyms })
}
