describe('filters', () => {
  it('creates a filter', () => {
    return sessions.use(async (session) => {
      let filter = await session.rest.v2.filters.create({
        title: 'Filter',
        context: ['notifications'],
        keywordsAttributes: [{ keyword: 'test' }],
      });

      try {
        await session.rest.v2.filters.select(filter.id).update({
          title: 'Filter Updated',
        });
        filter = await session.rest.v2.filters.select(filter.id).fetch();
        expect(filter.title).toBe('Filter Updated');

        const filters = await session.rest.v2.filters.list();
        expect(filters).toContainId(filter.id);
      } finally {
        await session.rest.v2.filters.select(filter.id).remove();
      }
    });
  });

  it('handles filter keywords', () => {
    return sessions.use(async (session) => {
      const filter = await session.rest.v2.filters.create({
        title: 'Filter',
        context: ['notifications'],
      });

      try {
        let keyword = await session.rest.v2.filters
          .select(filter.id)
          .keywords.create({
            keyword: 'test',
          });

        await session.rest.v2.filters.keywords.select(keyword.id).update({
          keyword: 'test2',
        });

        keyword = await session.rest.v2.filters.keywords
          .select(keyword.id)
          .fetch();
        expect(keyword.keyword).toBe('test2');

        const keywords = await session.rest.v2.filters
          .select(filter.id)
          .keywords.list();
        expect(keywords).toContainId(keyword.id);
        await session.rest.v2.filters.keywords.select(keyword.id).remove();
      } finally {
        await session.rest.v2.filters.select(filter.id).remove();
      }
    });
  });

  it('handles status filters', () => {
    return sessions.use(async (session) => {
      const filter = await session.rest.v2.filters.create({
        title: 'Filter',
        context: ['notifications'],
      });

      try {
        const status = await session.rest.v1.statuses.create({
          status: 'test',
        });
        let statusFilter = await session.rest.v2.filters
          .select(filter.id)
          .statuses.create({
            statusId: status.id,
          });

        statusFilter = await session.rest.v2.filters.statuses
          .select(statusFilter.id)
          .fetch();
        expect(statusFilter.statusId).toBe(status.id);

        const statusFilters = await session.rest.v2.filters
          .select(filter.id)
          .statuses.list();
        expect(statusFilters).toContainId(statusFilter.id);
        await session.rest.v2.filters.statuses.select(statusFilter.id).remove();
      } finally {
        await session.rest.v2.filters.select(filter.id).remove();
      }
    });
  });

  it('removes a filter with _destroy', () => {
    return sessions.use(async (session) => {
      let filter = await session.rest.v2.filters.create({
        title: 'Filter',
        context: ['notifications'],
        keywordsAttributes: [{ keyword: 'test' }, { keyword: 'test2' }],
      });
      expect(filter.keywords).toHaveLength(2);

      try {
        filter = await session.rest.v2.filters.select(filter.id).update({
          keywordsAttributes: [{ id: filter.keywords[0].id, _destroy: true }],
        });
        expect(filter.keywords).toHaveLength(1);
      } finally {
        await session.rest.v2.filters.select(filter.id).remove();
      }
    });
  });
});
