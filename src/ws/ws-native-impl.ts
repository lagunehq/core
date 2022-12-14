import EventEmitter from 'eventemitter3';
import WebSocket from 'isomorphic-ws';

import type { MastoConfig } from '../config';
import type { Serializer } from '../serializers';
import { BaseWs } from './base-ws';
import type { Event, EventType, EventTypeMap, Ws, WsEvents } from './ws';

/**
 * Mastodon streaming api wrapper
 */
export class WsEventsNativeImpl
  extends EventEmitter<EventTypeMap>
  implements WsEvents
{
  constructor(
    private readonly ws: WebSocket,
    private readonly serializer: Serializer,
  ) {
    super();
  }

  /**
   * Connect to the websocket endpoint
   * @param url URL of the websocket endpoint
   * @param protocols Subprotocol(s) for `Sec-Websocket-Protocol`
   * @param params URL parameters
   */
  static connect(
    url: string,
    serializer: Serializer,
    protocols?: string | string[],
  ): Promise<WsEvents> {
    return new Promise<WsEvents>((resolve, reject) => {
      const ws = new WebSocket(url, protocols);
      const instance = new WsEventsNativeImpl(ws, serializer);
      ws.addEventListener('message', instance.handleMessage);
      ws.addEventListener('error', reject);
      ws.addEventListener('open', () => resolve(instance));
    });
  }

  /**
   * Disconnect from the websocket endpoint
   */
  disconnect(): void {
    if (!this.ws) return;
    this.ws.close();
  }

  /**
   * Parse JSON data and emit it as an event
   * @param message Websocket message
   */
  private handleMessage = ({ data }: WebSocket.MessageEvent): void => {
    const { event, payload } = this.serializer.deserialize<Event>(
      'application/json',
      data,
    );

    // https://github.com/neet/masto.js/issues/750
    if (event === 'delete') {
      return void this.emit(event, payload);
    }

    let args: EventTypeMap[EventType] = [];
    try {
      args.push(this.serializer.deserialize('application/json', payload));
    } catch {
      args = [];
    }

    this.emit(event, ...args);
  };
}

export class WsNativeImpl extends BaseWs implements Ws {
  constructor(
    protected readonly baseUrl: string,
    protected readonly version: string,
    protected readonly config: MastoConfig,
    protected readonly serializer: Serializer,
  ) {
    super();
  }

  stream(
    path: string,
    params: Record<string, unknown> = {},
  ): Promise<WsEvents> {
    return WsEventsNativeImpl.connect(
      this.resolveUrl(path, params),
      this.serializer,
      this.createProtocols(),
    );
  }
}
