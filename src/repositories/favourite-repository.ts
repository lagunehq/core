import type { MastoConfig } from '../config';
import { version } from '../decorators';
import type { Status } from '../entities';
import type { Http } from '../http';
import { Paginator } from '../paginator';
import { IterableRepository } from './iterable-repository';
import type { DefaultPaginationParams } from './repository';

export class FavouriteRepository extends IterableRepository<Status> {
  constructor(private readonly http: Http, readonly config: MastoConfig) {
    super();
  }

  /**
   * Statuses the user has favourited.
   * @param params Parameters
   * @return Array of Status
   * @see https://docs.joinmastodon.org/methods/accounts/favourites/
   */
  @version({ since: '0.0.0' })
  iterate(
    params?: DefaultPaginationParams,
  ): Paginator<DefaultPaginationParams, Status[]> {
    return new Paginator(this.http, `/api/v1/favourites`, params);
  }
}
