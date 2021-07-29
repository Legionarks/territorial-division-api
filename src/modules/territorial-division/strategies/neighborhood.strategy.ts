import { Raw, Repository } from 'typeorm';

import { QueryNeighborhoodDto } from '../dto';
import { Neighborhood } from '../entities';
import { QueryStrategy } from '../interfaces';

export class NeighborhoodStrategy
  implements QueryStrategy<Neighborhood, QueryNeighborhoodDto>
{
  find(
    query: QueryNeighborhoodDto,
    repository: Repository<Neighborhood>,
  ): Promise<Neighborhood | Neighborhood[]> {
    if (query.name) {
      return repository.find({
        where: {
          name: Raw((name: string) => `LOWER(${name}) Like '%${query.name}%'`),
        },
      });
    }

    if (query.code) {
      return repository.findOne({
        where: { code: query.code },
      });
    }

    if (query.sectionCode) {
      return repository.find({
        where: { sectionCode: query.sectionCode },
      });
    }

    if (query.districtCode) {
      return repository.find({
        where: { districtCode: query.districtCode },
      });
    }

    if (query.municipalityCode) {
      return repository.find({
        where: { municipalityCode: query.municipalityCode },
      });
    }

    if (query.provinceCode) {
      return repository.find({
        where: { provinceCode: query.provinceCode },
      });
    }

    if (query.regionCode) {
      return repository.find({
        where: { regionCode: query.regionCode },
      });
    }

    return repository.find({ take: 100 });
  }
}