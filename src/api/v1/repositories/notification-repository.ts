import type { MastoConfig } from '../../../config';
import { version } from '../../../decorators';
import type { Http } from '../../../http';
import { Paginator } from '../../../paginator';
import { IterableRepository } from '../../iterable-repository';
import type { DefaultPaginationParams } from '../../repository';
import type { Notification, NotificationType } from '../entities';

export interface FetchNotificationsParams extends DefaultPaginationParams {
  /** Instead of specifying every known type to exclude, you can specify only the types you want. */
  readonly types?: NotificationType[] | null;
  /** ID of the account */
  readonly accountId?: string | null;
  /** Array of notifications to exclude (Allowed values: "follow", "favourite", "reblog", "mention") */
  readonly excludeTypes?: NotificationType[] | null;
}

export class NotificationsRepository extends IterableRepository<Notification> {
  constructor(private readonly http: Http, readonly config: MastoConfig) {
    super();
  }

  /**
   * Notifications concerning the user.
   * This API returns Link headers containing links to the next/previous page.
   * However, the links can also be constructed dynamically using query params and `id` values.
   * @param params Query parameter
   * @return Array of Notification
   * @see https://docs.joinmastodon.org/methods/notifications/
   */
  @version({ since: '0.0.0' })
  iterate(
    params?: FetchNotificationsParams,
  ): Paginator<FetchNotificationsParams, Notification[]> {
    return new Paginator(this.http, '/api/v1/notifications', params);
  }

  /**
   * View information about a notification with a given ID.
   * @param id ID of the notification in the database.
   * @return Notification
   * @see https://docs.joinmastodon.org/methods/notifications/
   */
  @version({ since: '0.0.0' })
  fetch(id: string): Promise<Notification> {
    return this.http.get<Notification>(`/api/v1/notifications/${id}`);
  }

  /**
   * Clear all notifications from the server.
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/notifications/
   */
  @version({ since: '0.0.0' })
  clear(): Promise<void> {
    return this.http.post<void>('/api/v1/notifications/clear');
  }

  /**
   * Clear a single notification from the server.
   * @param id ID of the notification to be cleared
   * @return N/A
   * @see https://docs.joinmastodon.org/methods/notifications/
   */
  @version({ since: '2.6.0' })
  dismiss(id: string): Promise<void> {
    return this.http.post<void>(`/api/v1/notifications/${id}/dismiss`);
  }
}
