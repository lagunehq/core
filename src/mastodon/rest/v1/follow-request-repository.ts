import type { HttpMetaParams } from '../../../interfaces';
import type { Paginator } from '../../../paginator';
import type { Account, Relationship } from '../../entities/v1';
import type { DefaultPaginationParams } from '../../repository';

export interface FollowRequestRepository {
  /**
   * Pending Follows
   * @param params Parameters
   * @return Array of Account
   * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/
   */
  list(
    params?: DefaultPaginationParams,
    meta?: HttpMetaParams,
  ): Paginator<Account[], DefaultPaginationParams>;

  select(id: string): {
    /**
     * Accept Follow
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/#post-authorize
     */
    authorize(meta?: HttpMetaParams): Promise<Relationship>;

    /**
     * Reject Follow
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/#post-reject
     */
    reject(meta?: HttpMetaParams): Promise<Relationship>;
  };
}
