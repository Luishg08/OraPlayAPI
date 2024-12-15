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
  Estadio,
  Partido,
} from '../models';
import {EstadioRepository} from '../repositories';

export class EstadioPartidoController {
  constructor(
    @repository(EstadioRepository) protected estadioRepository: EstadioRepository,
  ) { }

  @get('/estadios/{id}/partidos', {
    responses: {
      '200': {
        description: 'Array of Estadio has many Partido',
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
    return this.estadioRepository.partidos(id).find(filter);
  }

  @post('/estadios/{id}/partidos', {
    responses: {
      '200': {
        description: 'Estadio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partido)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Estadio.prototype.idEstadio,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {
            title: 'NewPartidoInEstadio',
            exclude: ['idPartido']
          }),
        },
      },
    }) partido: Omit<Partido, 'idPartido'>,
  ): Promise<Partido> {
    return this.estadioRepository.partidos(id).create(partido);
  }

  @patch('/estadios/{id}/partidos', {
    responses: {
      '200': {
        description: 'Estadio.Partido PATCH success count',
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
    return this.estadioRepository.partidos(id).patch(partido, where);
  }

  @del('/estadios/{id}/partidos', {
    responses: {
      '200': {
        description: 'Estadio.Partido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    return this.estadioRepository.partidos(id).delete(where);
  }
}
