it('mutates a list', () => {
  return sessions.use(2, async ([alice, bob]) => {
    let list = await alice.rest.v1.lists.create({
      title: 'Test List',
    });
    await alice.rest.v1.accounts.select(bob.id).follow();

    try {
      await alice.rest.v1.lists.select(list.id).update({
        title: 'Test List Updated',
      });
      list = await alice.rest.v1.lists.select(list.id).fetch();

      const lists = await alice.rest.v1.lists.list();
      expect(lists).toContainId(list.id);

      await alice.rest.v1.lists
        .select(list.id)
        .accounts.create({ accountIds: [bob.id] });

      const accounts = await alice.rest.v1.lists
        .select(list.id)
        .accounts.list();
      expect(accounts).toContainId(bob.id);
    } finally {
      await alice.rest.v1.lists
        .select(list.id)
        .accounts.remove({ accountIds: [bob.id] });

      await alice.rest.v1.lists.select(list.id).remove();
      await alice.rest.v1.accounts.select(bob.id).unfollow();
    }
  });
});
