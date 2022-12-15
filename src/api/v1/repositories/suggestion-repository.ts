import type { MastoConfig } from '../../../config';
import { deprecated, version } from '../../../decorators';
import type { Http } from '../../../http';
import { Paginator } from '../../../paginator';
import type { Repository } from '../../repository';
import type { Account } from '../entities';

export interface ListSuggestionParams {
  /** Integer. Maximum number of results to return. Defaults to 40. */
  readonly limit?: number | null;
}

export class SuggestionRepository
  implements Repository<Account, never, never, never, ListSuggestionParams>
{
  constructor(private readonly http: Http, readonly config: MastoConfig) {}

  /**
   * Accounts the user has had past positive interactions with, but is not yet following.
   * @param params
   * @returns
   * @see https://docs.joinmastodon.org/methods/suggestions/#v1
   */
  @deprecated('Use MastoClient.v2.suggestions.list instead')
  @version({ since: '2.4.3' })
  list(
    params?: ListSuggestionParams,
  ): Paginator<Account[], ListSuggestionParams> {
    return new Paginator(this.http, '/api/v1/suggestions', params);
  }

  /**
   * Remove an account from follow suggestions.
   * @param id id of the account in the database to be removed from suggestions
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/accounts/suggestions/
   */
  @version({ since: '2.4.3' })
  remove(id: string): Promise<void> {
    return this.http.delete(`/api/v1/suggestions/${id}`);
  }
}
