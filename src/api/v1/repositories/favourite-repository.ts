import type { MastoConfig } from '../../../config';
import { version } from '../../../decorators';
import type { Http } from '../../../http';
import { Paginator } from '../../../paginator';
import type { DefaultPaginationParams, Repository } from '../../repository';
import type { Status } from '../entities';

export class FavouriteRepository
  implements Repository<Status, never, never, never, DefaultPaginationParams>
{
  constructor(private readonly http: Http, readonly config: MastoConfig) {}

  /**
   * Statuses the user has favourited.
   * @param params Parameters
   * @return Array of Status
   * @see https://docs.joinmastodon.org/methods/accounts/favourites/
   */
  @version({ since: '0.0.0' })
  list(
    params?: DefaultPaginationParams,
  ): Paginator<Status[], DefaultPaginationParams> {
    return new Paginator(this.http, `/api/v1/favourites`, params);
  }
}
