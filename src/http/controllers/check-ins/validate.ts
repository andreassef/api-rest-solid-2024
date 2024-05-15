import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateUseCase } from '@/use-cases/factories/makeValidateCheckInUseCase'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateUseCase()
  await validateCheckInUseCase.execute({ checkInId })

  return reply.status(204).send()
}
