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
  Estadistica,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoEstadisticaController {
  constructor(
    @repository(PartidoRepository) protected partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/estadisticas', {
    responses: {
      '200': {
        description: 'Array of Partido has many Estadistica',
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
    return this.partidoRepository.estadisticas(id).find(filter);
  }

  @post('/partidos/{id}/estadisticas', {
    responses: {
      '200': {
        description: 'Partido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estadistica)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Partido.prototype.idPartido,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estadistica, {
            title: 'NewEstadisticaInPartido',
            exclude: ['idEstadistica'],
            optional: ['partidoId']
          }),
        },
      },
    }) estadistica: Omit<Estadistica, 'idEstadistica'>,
  ): Promise<Estadistica> {
    return this.partidoRepository.estadisticas(id).create(estadistica);
  }

  @patch('/partidos/{id}/estadisticas', {
    responses: {
      '200': {
        description: 'Partido.Estadistica PATCH success count',
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
    return this.partidoRepository.estadisticas(id).patch(estadistica, where);
  }

  @del('/partidos/{id}/estadisticas', {
    responses: {
      '200': {
        description: 'Partido.Estadistica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Estadistica)) where?: Where<Estadistica>,
  ): Promise<Count> {
    return this.partidoRepository.estadisticas(id).delete(where);
  }
}
