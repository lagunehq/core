import type { MastoConfig } from '../../../../config';
import type { Http } from '../../../../http';
import type { Logger } from '../../../../logger';
import { Paginator } from '../../../../paginator';
import type { Admin, Status, TrendLink } from '../../entities';

export class TrendRepository {
  constructor(
    private readonly http: Http,
    readonly config: MastoConfig,
    readonly logger?: Logger,
  ) {}

  /**
   * Links that have been shared more than others, including unapproved and unreviewed links.
   * @see https://docs.joinmastodon.org/methods/admin/trends/#links
   */
  listLinks(): Paginator<TrendLink, undefined> {
    return new Paginator(this.http, '/api/v1/admin/trends/links');
  }

  /**
   * Statuses that have been interacted with more than others, including unapproved and unreviewed statuses.
   * @see https://docs.joinmastodon.org/methods/admin/trends/#statuses
   */
  listStatuses(): Paginator<Status, undefined> {
    return new Paginator(this.http, '/api/v1/admin/trends/statuses');
  }

  /**
   * Tags that are being used more frequently within the past week, including unapproved and unreviewed tags.
   * @see https://docs.joinmastodon.org/methods/admin/trends/#tags
   */
  listTags(): Paginator<Admin.Tag, undefined> {
    return new Paginator(this.http, '/api/v1/admin/trends/statuses');
  }
}
