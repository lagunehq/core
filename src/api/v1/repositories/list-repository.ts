import type { MastoConfig } from '../../../config';
import { version } from '../../../decorators';
import type { Http } from '../../../http';
import { Paginator } from '../../../paginator';
import type { DefaultPaginationParams, Repository } from '../../repository';
import type { Account, List } from '../entities';

export interface ModifyListParams {
  /** The title of the list to be created. */
  readonly title: string;
}

export interface ModifyListAccountsParams {
  /** Array of account IDs */
  readonly accountIds: string[];
}

export class ListRepository
  implements Repository<List, ModifyListParams, ModifyListParams>
{
  constructor(private readonly http: Http, readonly config: MastoConfig) {}

  /**
   * Fetch the list with the given ID. Used for verifying the title of a list.
   * @param id ID of the list in the database
   * @return List
   * @see https://docs.joinmastodon.org/methods/timelines/lists/
   */
  @version({ since: '2.1.0' })
  fetch(id: string): Promise<List> {
    return this.http.get<List>(`/api/v1/lists/${id}`);
  }

  /**
   * Fetch all lists that the user owns.
   * @return Array of List
   * @see https://docs.joinmastodon.org/methods/timelines/lists/
   */
  @version({ since: '2.1.0' })
  list(): Paginator<List[]> {
    return new Paginator(this.http, '/api/v1/lists');
  }

  /**
   * Create a new list.
   * @param params Parameters
   * @return List
   * @see https://docs.joinmastodon.org/methods/timelines/lists/
   */
  @version({ since: '2.1.0' })
  create(params: ModifyListParams): Promise<List> {
    return this.http.post<List>('/api/v1/lists', params);
  }

  /**
   * Change the title of a list.
   * @param id ID of the list in the database
   * @param params Parameters
   * @return List
   * @see https://docs.joinmastodon.org/methods/timelines/lists/
   */
  @version({ since: '2.1.0' })
  update(id: string, params: ModifyListParams): Promise<List> {
    return this.http.put<List>(`/api/v1/lists/${id}`, params);
  }

  /**
   * Delete a list
   * @param id ID of the list in the database
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/timelines/lists/
   */
  @version({ since: '2.1.0' })
  remove(id: string): Promise<void> {
    return this.http.delete<void>(`/api/v1/lists/${id}`);
  }

  /**
   * View accounts in list
   * @param id ID of the list in the database
   * @param params Parameters
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/timelines/lists/
   */
  @version({ since: '2.1.0' })
  listAccounts(
    id: string,
    params?: DefaultPaginationParams,
  ): Paginator<Account[], DefaultPaginationParams> {
    return new Paginator(this.http, `/api/v1/lists/${id}/accounts`, params);
  }

  /**
   * Add accounts to the given list. Note that the user must be following these accounts.
   * @param id ID of the list in the database
   * @param params Parameters
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/timelines/lists/
   */
  @version({ since: '2.1.0' })
  addAccount(id: string, params: ModifyListAccountsParams): Promise<void> {
    return this.http.post<void>(`/api/v1/lists/${id}/accounts`, params);
  }

  /**
   * Remove accounts from the given list.
   * @param id ID of the list in the database
   * @param params Parameters
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/timelines/lists/
   */
  @version({ since: '2.1.0' })
  removeAccount(id: string, params: ModifyListAccountsParams): Promise<void> {
    return this.http.delete<void>(`/api/v1/lists/${id}/accounts`, params);
  }
}
