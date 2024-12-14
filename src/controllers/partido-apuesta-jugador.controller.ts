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
  Partido,
  ApuestaJugador,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoApuestaJugadorController {
  constructor(
    @repository(PartidoRepository) protected partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Array of Partido has many ApuestaJugador',
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
    return this.partidoRepository.apuestasJugador(id).find(filter);
  }

  @post('/partidos/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Partido model instance',
        content: {'application/json': {schema: getModelSchemaRef(ApuestaJugador)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Partido.prototype.idPartido,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaJugador, {
            title: 'NewApuestaJugadorInPartido',
            exclude: ['idApuestaJugador'],
            optional: ['partidoId']
          }),
        },
      },
    }) apuestaJugador: Omit<ApuestaJugador, 'idApuestaJugador'>,
  ): Promise<ApuestaJugador> {
    return this.partidoRepository.apuestasJugador(id).create(apuestaJugador);
  }

  @patch('/partidos/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Partido.ApuestaJugador PATCH success count',
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
    return this.partidoRepository.apuestasJugador(id).patch(apuestaJugador, where);
  }

  @del('/partidos/{id}/apuesta-jugadors', {
    responses: {
      '200': {
        description: 'Partido.ApuestaJugador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ApuestaJugador)) where?: Where<ApuestaJugador>,
  ): Promise<Count> {
    return this.partidoRepository.apuestasJugador(id).delete(where);
  }
}
