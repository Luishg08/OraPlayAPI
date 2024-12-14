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
  ApuestaMarcador,
} from '../models';
import {PartidoRepository} from '../repositories';

export class PartidoApuestaMarcadorController {
  constructor(
    @repository(PartidoRepository) protected partidoRepository: PartidoRepository,
  ) { }

  @get('/partidos/{id}/apuesta-marcadors', {
    responses: {
      '200': {
        description: 'Array of Partido has many ApuestaMarcador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ApuestaMarcador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ApuestaMarcador>,
  ): Promise<ApuestaMarcador[]> {
    return this.partidoRepository.apuestasMarcador(id).find(filter);
  }

  @post('/partidos/{id}/apuesta-marcadors', {
    responses: {
      '200': {
        description: 'Partido model instance',
        content: {'application/json': {schema: getModelSchemaRef(ApuestaMarcador)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Partido.prototype.idPartido,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaMarcador, {
            title: 'NewApuestaMarcadorInPartido',
            exclude: ['idApuestaMarcador'],
            optional: ['partidoId']
          }),
        },
      },
    }) apuestaMarcador: Omit<ApuestaMarcador, 'idApuestaMarcador'>,
  ): Promise<ApuestaMarcador> {
    return this.partidoRepository.apuestasMarcador(id).create(apuestaMarcador);
  }

  @patch('/partidos/{id}/apuesta-marcadors', {
    responses: {
      '200': {
        description: 'Partido.ApuestaMarcador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaMarcador, {partial: true}),
        },
      },
    })
    apuestaMarcador: Partial<ApuestaMarcador>,
    @param.query.object('where', getWhereSchemaFor(ApuestaMarcador)) where?: Where<ApuestaMarcador>,
  ): Promise<Count> {
    return this.partidoRepository.apuestasMarcador(id).patch(apuestaMarcador, where);
  }

  @del('/partidos/{id}/apuesta-marcadors', {
    responses: {
      '200': {
        description: 'Partido.ApuestaMarcador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ApuestaMarcador)) where?: Where<ApuestaMarcador>,
  ): Promise<Count> {
    return this.partidoRepository.apuestasMarcador(id).delete(where);
  }
}
