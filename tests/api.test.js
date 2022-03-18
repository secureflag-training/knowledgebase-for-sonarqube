/**
 * @jest-environment jsdom
 */

import {queryKnowledgeBase, findNewSecurityIssues, findNewSecurityHotspots} from '../src/main/js/common/api';

jest.mock('sonar-request', () => {
  return {
    getJSON: jest.fn(async () => 'response')
  }
}, {virtual: true})

test('Query knowledge base, get markdown text', async () => {
  fetch.mockResponseOnce(JSON.stringify({'markdown': 'XSS'}));
  const res = await queryKnowledgeBase('XSS');
  expect(res).toEqual('XSS');
});

test('Query knowledge base, response not ok', async () => {
  fetch.mockResponseOnce(JSON.stringify({}), {status: 400});
  const res = await queryKnowledgeBase('Test');
  expect(res).toEqual('');
});

// Not a super helpful test as it is essentially just resolving a Promise
test('Get issues', async () => {
  const project = {key: 'key'};
  const issues = await findNewSecurityIssues(project);
  expect(issues).toEqual('response');
});

// Not a super helpful test as it is essentially just resolving a Promise
test('Get security hotspots', async () => {
  const project = {key: 'key'};
  const hotspots = await findNewSecurityHotspots(project);
  expect(hotspots).toEqual('response');
});