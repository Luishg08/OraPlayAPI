import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ApuestaEvento} from '../models';
import {ApuestaEventoRepository} from '../repositories';

export class ApuestaEventoController {
  constructor(
    @repository(ApuestaEventoRepository)
    public apuestaEventoRepository : ApuestaEventoRepository,
  ) {}

  @post('/apuesta-evento')
  @response(200, {
    description: 'ApuestaEvento model instance',
    content: {'application/json': {schema: getModelSchemaRef(ApuestaEvento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaEvento, {
            title: 'NewApuestaEvento',
            exclude: ['idApuestaEvento'],
          }),
        },
      },
    })
    apuestaEvento: Omit<ApuestaEvento, 'idApuestaEvento'>,
  ): Promise<ApuestaEvento> {
    return this.apuestaEventoRepository.create(apuestaEvento);
  }

  @get('/apuesta-evento/count')
  @response(200, {
    description: 'ApuestaEvento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ApuestaEvento) where?: Where<ApuestaEvento>,
  ): Promise<Count> {
    return this.apuestaEventoRepository.count(where);
  }

  @get('/apuesta-evento')
  @response(200, {
    description: 'Array of ApuestaEvento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ApuestaEvento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ApuestaEvento) filter?: Filter<ApuestaEvento>,
  ): Promise<ApuestaEvento[]> {
    return this.apuestaEventoRepository.find(filter);
  }

  @patch('/apuesta-evento')
  @response(200, {
    description: 'ApuestaEvento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaEvento, {partial: true}),
        },
      },
    })
    apuestaEvento: ApuestaEvento,
    @param.where(ApuestaEvento) where?: Where<ApuestaEvento>,
  ): Promise<Count> {
    return this.apuestaEventoRepository.updateAll(apuestaEvento, where);
  }

  @get('/apuesta-evento/{id}')
  @response(200, {
    description: 'ApuestaEvento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ApuestaEvento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ApuestaEvento, {exclude: 'where'}) filter?: FilterExcludingWhere<ApuestaEvento>
  ): Promise<ApuestaEvento> {
    return this.apuestaEventoRepository.findById(id, filter);
  }

  @patch('/apuesta-evento/{id}')
  @response(204, {
    description: 'ApuestaEvento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaEvento, {partial: true}),
        },
      },
    })
    apuestaEvento: ApuestaEvento,
  ): Promise<void> {
    await this.apuestaEventoRepository.updateById(id, apuestaEvento);
  }

  @put('/apuesta-evento/{id}')
  @response(204, {
    description: 'ApuestaEvento PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() apuestaEvento: ApuestaEvento,
  ): Promise<void> {
    await this.apuestaEventoRepository.replaceById(id, apuestaEvento);
  }

  @del('/apuesta-evento/{id}')
  @response(204, {
    description: 'ApuestaEvento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.apuestaEventoRepository.deleteById(id);
  }
}
