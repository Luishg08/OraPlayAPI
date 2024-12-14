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
  Torneo,
  Partido,
} from '../models';
import {TorneoRepository} from '../repositories';

export class TorneoPartidoController {
  constructor(
    @repository(TorneoRepository) protected torneoRepository: TorneoRepository,
  ) { }

  @get('/torneos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Array of Torneo has many Partido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Partido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Partido>,
  ): Promise<Partido[]> {
    return this.torneoRepository.partidos(id).find(filter);
  }

  @post('/torneos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Torneo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partido)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Torneo.prototype.idTorneo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {
            title: 'NewPartidoInTorneo',
            exclude: ['idPartido'],
            optional: ['torneoId']
          }),
        },
      },
    }) partido: Omit<Partido, 'idPartido'>,
  ): Promise<Partido> {
    return this.torneoRepository.partidos(id).create(partido);
  }

  @patch('/torneos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Torneo.Partido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {partial: true}),
        },
      },
    })
    partido: Partial<Partido>,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    return this.torneoRepository.partidos(id).patch(partido, where);
  }

  @del('/torneos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Torneo.Partido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    return this.torneoRepository.partidos(id).delete(where);
  }
}
