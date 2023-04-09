import type { MastoConfig } from '../../../config';
import type { Http } from '../../../http';
import type { Logger } from '../../../logger';
import type { Repository } from '../../repository';
import type { Marker, MarkerItem, MarkerTimeline } from '../entities';

export interface FetchMarkersParams {
  /**
   * Array of markers to fetch.
   * String enum anyOf `home`, `notifications`.
   * If not provided, an empty object will be returned.
   */
  readonly timeline?: readonly MarkerTimeline[];
}

export type CreateMarkersParams = {
  /** ID of the last status read in the timeline. */
  readonly [key in MarkerTimeline]?: Pick<MarkerItem, 'lastReadId'>;
};

export class MarkerRepository
  implements Repository<Marker, CreateMarkersParams, never, FetchMarkersParams>
{
  constructor(
    private readonly http: Http,
    readonly config: MastoConfig,
    readonly logger?: Logger,
  ) {}

  /**
   * Get saved timeline position
   * @param params Parameters
   * @return Markers
   * @see https://docs.joinmastodon.org/methods/timelines/markers/
   */
  fetch(params?: FetchMarkersParams): Promise<Marker> {
    return this.http.get('/api/v1/markers', params);
  }

  /**
   * Save position in timeline
   * @param params Parameters
   * @return Markers
   * @see https://github.com/tootsuite/mastodon/pull/11762
   */
  create(params: CreateMarkersParams): Promise<Marker> {
    return this.http.post<Marker>('/api/v1/markers', params);
  }
}
