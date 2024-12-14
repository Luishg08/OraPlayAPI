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
  MetodoPago,
  Transaccion,
} from '../models';
import {MetodoPagoRepository} from '../repositories';

export class MetodoPagoTransaccionController {
  constructor(
    @repository(MetodoPagoRepository) protected metodoPagoRepository: MetodoPagoRepository,
  ) { }

  @get('/metodo-pagos/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Array of MetodoPago has many Transaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Transaccion>,
  ): Promise<Transaccion[]> {
    return this.metodoPagoRepository.transacciones(id).find(filter);
  }

  @post('/metodo-pagos/{id}/transaccions', {
    responses: {
      '200': {
        description: 'MetodoPago model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MetodoPago.prototype.idMetodoPago,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaccion, {
            title: 'NewTransaccionInMetodoPago',
            exclude: ['idTransaccion'],
            optional: ['metodoPagoId']
          }),
        },
      },
    }) transaccion: Omit<Transaccion, 'idTransaccion'>,
  ): Promise<Transaccion> {
    return this.metodoPagoRepository.transacciones(id).create(transaccion);
  }

  @patch('/metodo-pagos/{id}/transaccions', {
    responses: {
      '200': {
        description: 'MetodoPago.Transaccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaccion, {partial: true}),
        },
      },
    })
    transaccion: Partial<Transaccion>,
    @param.query.object('where', getWhereSchemaFor(Transaccion)) where?: Where<Transaccion>,
  ): Promise<Count> {
    return this.metodoPagoRepository.transacciones(id).patch(transaccion, where);
  }

  @del('/metodo-pagos/{id}/transaccions', {
    responses: {
      '200': {
        description: 'MetodoPago.Transaccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Transaccion)) where?: Where<Transaccion>,
  ): Promise<Count> {
    return this.metodoPagoRepository.transacciones(id).delete(where);
  }
}
