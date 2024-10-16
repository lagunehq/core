export type Direction = "next" | "prev";

// eslint-disable-next-line prettier/prettier
export interface Paginator<Entity, Params = undefined> extends PromiseLike<Entity>, AsyncIterable<Entity> { 
  /**
   * Get the current direction of the paginator.
   * @returns The current direction of the paginator.
   */
  getDirection(): Direction;

  /**
   * Creates a new paginator with the given direction.
   * @param direction New direction of the paginator.
   * @returns A new paginator with the given direction.
   */
  setDirection(direction: Direction): Paginator<Entity, Params>;

  values(): AsyncIterableIterator<Entity>;

  [Symbol.asyncIterator](): AsyncIterator<
    Entity,
    undefined,
    Params | string | undefined
  >;
}
