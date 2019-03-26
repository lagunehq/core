// tslint:disable no-console
import Masto from '../src';

// For more inromation:
// https://github.com/neet/masto.js/blob/master/docs/classes/_client_mastodon_.mastodon.md#createApp
(async () => {
  const masto = await Masto.login({
    uri: 'https://example.com',
  });

  masto.createApp({
    client_name: 'My app',
    redirect_uris: 'urn:ietf:wg:oauth:2.0:oob',
    scopes: 'read write',
    website: 'example.com'
  }).then((oauthInfo) => {
    console.log(oauthInfo.data);
  });
})()
