import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Jugador,
  ApuestaJugador,
} from '../models';
import {JugadorRepository} from '../repositories';

export class JugadorApuestaJugadorController {
  constructor(
    @repository(JugadorRepository) protected jugadorRepository: JugadorRepository,
  ) { }

  @get('/jugadors/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Array of Jugador has many ApuestaJugador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ApuestaJugador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ApuestaJugador>,
  ): Promise<ApuestaJugador[]> {
    return this.jugadorRepository.apuestasJugador(id).find(filter);
  }

  @post('/jugadors/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Jugador model instance',
        content: {'application/json': {schema: getModelSchemaRef(ApuestaJugador)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jugador.prototype.idJugador,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaJugador, {
            title: 'NewApuestaJugadorInJugador',
            exclude: ['idApuestaJugador'],
            optional: ['jugadorId']
          }),
        },
      },
    }) apuestaJugador: Omit<ApuestaJugador, 'idApuestaJugador'>,
  ): Promise<ApuestaJugador> {
    return this.jugadorRepository.apuestasJugador(id).create(apuestaJugador);
  }

  @patch('/jugadors/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Jugador.ApuestaJugador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaJugador, {partial: true}),
        },
      },
    })
    apuestaJugador: Partial<ApuestaJugador>,
    @param.query.object('where', getWhereSchemaFor(ApuestaJugador)) where?: Where<ApuestaJugador>,
  ): Promise<Count> {
    return this.jugadorRepository.apuestasJugador(id).patch(apuestaJugador, where);
  }

  @del('/jugadors/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Jugador.ApuestaJugador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ApuestaJugador)) where?: Where<ApuestaJugador>,
  ): Promise<Count> {
    return this.jugadorRepository.apuestasJugador(id).delete(where);
  }
}
