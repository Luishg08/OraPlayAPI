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
  Estadistica,
} from '../models';
import {JugadorRepository} from '../repositories';

export class JugadorEstadisticaController {
  constructor(
    @repository(JugadorRepository) protected jugadorRepository: JugadorRepository,
  ) { }

  @get('/jugadors/{id}/estadisticas', {
    responses: {
      '200': {
        description: 'Array of Jugador has many Estadistica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estadistica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Estadistica>,
  ): Promise<Estadistica[]> {
    return this.jugadorRepository.estadisticas(id).find(filter);
  }

  @post('/jugadors/{id}/estadisticas', {
    responses: {
      '200': {
        description: 'Jugador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estadistica)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Jugador.prototype.idJugador,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estadistica, {
            title: 'NewEstadisticaInJugador',
            exclude: ['idEstadistica'],
            optional: ['jugadorId']
          }),
        },
      },
    }) estadistica: Omit<Estadistica, 'idEstadistica'>,
  ): Promise<Estadistica> {
    return this.jugadorRepository.estadisticas(id).create(estadistica);
  }

  @patch('/jugadors/{id}/estadisticas', {
    responses: {
      '200': {
        description: 'Jugador.Estadistica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estadistica, {partial: true}),
        },
      },
    })
    estadistica: Partial<Estadistica>,
    @param.query.object('where', getWhereSchemaFor(Estadistica)) where?: Where<Estadistica>,
  ): Promise<Count> {
    return this.jugadorRepository.estadisticas(id).patch(estadistica, where);
  }

  @del('/jugadors/{id}/estadisticas', {
    responses: {
      '200': {
        description: 'Jugador.Estadistica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Estadistica)) where?: Where<Estadistica>,
  ): Promise<Count> {
    return this.jugadorRepository.estadisticas(id).delete(where);
  }
}
