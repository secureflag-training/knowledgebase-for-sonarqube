/**
 * @jest-environment jsdom
 */

import KbCache from '../src/main/js/common/KbCache';

jest.mock('sonar-request', () => {}, {virtual: true})

test('KbCache constructor instantiates cache and awaiting', () => {
  const kbCache = new KbCache();
  expect(kbCache.cache).toEqual(expect.anything());
  expect(kbCache.awaiting).toEqual(expect.anything());
});

test('`KbCache set and get value', () => {
  const kbCache = new KbCache();
  kbCache.set('key', 'value');
  expect(kbCache.get('key')).toEqual('value');
});

test('KbCache fetches and caches response', async () => {
  const kbCache = new KbCache();
  fetch.mockResponseOnce(JSON.stringify({'markdown':'XSS'}))
  await kbCache.fetch('XSS');
  expect(kbCache.get('XSS')).toEqual('XSS');
});

test('KbCache returns cached response', async () => {
  const kbCache = new KbCache();
  fetch.mockResponseOnce(JSON.stringify({'markdown':'XSS'}))
  await kbCache.fetch('XSS');
  fetch.mockResponseOnce(JSON.stringify({'markdown':'NOT_XSS'}))
  await kbCache.fetch('XSS');
  expect(kbCache.get('XSS')).toEqual('XSS');
});