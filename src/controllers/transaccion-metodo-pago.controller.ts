import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Transaccion,
  MetodoPago,
} from '../models';
import {TransaccionRepository} from '../repositories';

export class TransaccionMetodoPagoController {
  constructor(
    @repository(TransaccionRepository)
    public transaccionRepository: TransaccionRepository,
  ) { }

  @get('/transaccions/{id}/metodo-pago', {
    responses: {
      '200': {
        description: 'MetodoPago belonging to Transaccion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MetodoPago),
          },
        },
      },
    },
  })
  async getMetodoPago(
    @param.path.number('id') id: typeof Transaccion.prototype.idTransaccion,
  ): Promise<MetodoPago> {
    return this.transaccionRepository.metodoPago(id);
  }
}
