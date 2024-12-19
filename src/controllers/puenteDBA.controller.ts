// filepath: /c:/Users/luish/OneDrive/Documentos/Bases De Datos II/OraPlay/apioraplay/src/controllers/puenteDBA.controller.ts
import {inject} from '@loopback/core';
import {post, requestBody, Response, RestBindings} from '@loopback/rest';
import {PuenteDBARepository, UsuarioRepository} from '../repositories';

export class PuenteDBAController {
  constructor(
    @inject('repositories.PuenteDBARepository')
    private puenteDBARepository: PuenteDBARepository,
    @inject('repositories.UsuarioRepository')
    private usuarioRepository: UsuarioRepository,
  ) {}

  @post('/verificar-usuario', {
    responses: {
      '200': {
        description: 'Ejecución del procedimiento Verificar usuario para logueo',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async ejecutarProcedimiento(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {type: 'string'},
              contraseña: {type: 'string'},
            },
            required: ['email', 'contraseña'],
          },
        },
      },
    })
    body: {email: string, contraseña: string},
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    const {email} = body;
    const {contraseña} = body;
    const resultado = await this.puenteDBARepository.ejecutarProcedimientoVerificarUsuario(email, contraseña);
    // const resultadoJSON = JSON.parse(resultado);
    // //obtener el valor de "resultado" del JSON resultado;
    let usuario = this.usuarioRepository.findById(parseInt(resultado));
    return usuario;
  }
}
