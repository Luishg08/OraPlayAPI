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
  Equipo,
  Partido,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoPartidoController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Array of Equipo has many Partido',
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
    return this.equipoRepository.partidos(id).find(filter);
  }

  @post('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Equipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Partido)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Equipo.prototype.idEquipo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partido, {
            title: 'NewPartidoInEquipo',
            exclude: ['idPartido'],
            optional: ['idEquipo']
          }),
        },
      },
    }) partido: Omit<Partido, 'idPartido'>,
  ): Promise<Partido> {
    return this.equipoRepository.partidos(id).create(partido);
  }

  @patch('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Equipo.Partido PATCH success count',
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
    return this.equipoRepository.partidos(id).patch(partido, where);
  }

  @del('/equipos/{id}/partidos', {
    responses: {
      '200': {
        description: 'Equipo.Partido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Partido)) where?: Where<Partido>,
  ): Promise<Count> {
    return this.equipoRepository.partidos(id).delete(where);
  }
}
