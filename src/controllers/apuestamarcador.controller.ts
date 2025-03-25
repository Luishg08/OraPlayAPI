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
import {ApuestaMarcador} from '../models';
import {ApuestaMarcadorRepository} from '../repositories';

export class ApuestamarcadorController {
  constructor(
    @repository(ApuestaMarcadorRepository)
    public apuestaMarcadorRepository : ApuestaMarcadorRepository,
  ) {}

  @post('/apuesta-marcador')
  @response(200, {
    description: 'ApuestaMarcador model instance',
    content: {'application/json': {schema: getModelSchemaRef(ApuestaMarcador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaMarcador, {
            title: 'NewApuestaMarcador',
            exclude: ['idApuestaMarcador'],
          }),
        },
      },
    })
    apuestaMarcador: Omit<ApuestaMarcador, 'idApuestaMarcador'>,
  ): Promise<ApuestaMarcador> {
    return this.apuestaMarcadorRepository.create(apuestaMarcador);
  }

  @get('/apuesta-marcador/count')
  @response(200, {
    description: 'ApuestaMarcador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ApuestaMarcador) where?: Where<ApuestaMarcador>,
  ): Promise<Count> {
    return this.apuestaMarcadorRepository.count(where);
  }

  @get('/apuesta-marcador')
  @response(200, {
    description: 'Array of ApuestaMarcador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ApuestaMarcador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ApuestaMarcador) filter?: Filter<ApuestaMarcador>,
  ): Promise<ApuestaMarcador[]> {
    return this.apuestaMarcadorRepository.find(filter);
  }

  @patch('/apuesta-marcador')
  @response(200, {
    description: 'ApuestaMarcador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaMarcador, {partial: true}),
        },
      },
    })
    apuestaMarcador: ApuestaMarcador,
    @param.where(ApuestaMarcador) where?: Where<ApuestaMarcador>,
  ): Promise<Count> {
    return this.apuestaMarcadorRepository.updateAll(apuestaMarcador, where);
  }

  @get('/apuesta-marcador/{id}')
  @response(200, {
    description: 'ApuestaMarcador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ApuestaMarcador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ApuestaMarcador, {exclude: 'where'}) filter?: FilterExcludingWhere<ApuestaMarcador>
  ): Promise<ApuestaMarcador> {
    return this.apuestaMarcadorRepository.findById(id, filter);
  }

  @patch('/apuesta-marcador/{id}')
  @response(204, {
    description: 'ApuestaMarcador PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApuestaMarcador, {partial: true}),
        },
      },
    })
    apuestaMarcador: ApuestaMarcador,
  ): Promise<void> {
    await this.apuestaMarcadorRepository.updateById(id, apuestaMarcador);
  }

  @put('/apuesta-marcador/{id}')
  @response(204, {
    description: 'ApuestaMarcador PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() apuestaMarcador: ApuestaMarcador,
  ): Promise<void> {
    await this.apuestaMarcadorRepository.replaceById(id, apuestaMarcador);
  }

  @del('/apuesta-marcador/{id}')
  @response(204, {
    description: 'ApuestaMarcador DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.apuestaMarcadorRepository.deleteById(id);
  }
}
