// filepath: /c:/Users/luish/OneDrive/Documentos/Bases De Datos II/OraPlay/apioraplay/src/controllers/partido.controller.ts
import {inject} from '@loopback/core';
import {get} from '@loopback/rest';
import {PartidoRepository} from '../repositories';

export class PartidoController {
  constructor(
    @inject('repositories.PartidoRepository')
    private partidoRepository: PartidoRepository,
  ) {}

  @get('/partidos-en-curso', {
    responses: {
      '200': {
        description: 'Array of IDs of partidos en curso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {type: 'number'},
            },
          },
        },
      },
    },
  })
  async encontrarPartidosEnCurso(): Promise<any[]> {
    try {
      // Consultar los partidos en curso desde la base de datos
      const partidosCurso = await this.partidoRepository.dataSource.execute(
        `SELECT IDPARTIDO
         FROM PARTIDO
         WHERE SYSDATE
         BETWEEN TO_DATE(FECHAINICIO, 'YYYY-MM-DD HH24:MI:SS')
         AND TO_DATE(FECHAFIN, 'YYYY-MM-DD HH24:MI:SS')`
      );

      // Verificar si se encontraron partidos en curso
      if (partidosCurso.length === 0) {
        return [];
      }

      // Devolver los partidos en curso
      const partidosEnCurso = [];
      for (const partido of partidosCurso) {
        const partidoModel = await this.partidoRepository.findById(partido.IDPARTIDO, {
          include: [
            {relation: 'equipoLocal'},
            {relation: 'equipoVisitante'},
            {relation: 'estadio'},
            {relation: 'torneo'}
          ],
        });
        partidosEnCurso.push(partidoModel);
      }
      return partidosEnCurso;
    } catch (error) {
      console.error('Error al obtener los partidos en curso:', error);
      throw new Error('Error al obtener los partidos en curso');
    }
  }
}
