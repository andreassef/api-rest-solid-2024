import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verifyJwt'
import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'
import { verifyUserRole } from '@/http/middlewares/verifyUser'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
