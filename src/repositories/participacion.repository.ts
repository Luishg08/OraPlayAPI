import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OraplaysqlDataSource} from '../datasources';
import {Participacion, ParticipacionRelations} from '../models';

export class ParticipacionRepository extends DefaultCrudRepository<
  Participacion,
  typeof Participacion.prototype.idTorneo,
  ParticipacionRelations
> {
  constructor(
    @inject('datasources.oraplaysql') dataSource: OraplaysqlDataSource,
  ) {
    super(Participacion, dataSource);
  }
}
