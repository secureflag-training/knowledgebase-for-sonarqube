/**
 * @jest-environment jsdom
 */

import React from 'react'
import {mount} from 'enzyme'

import IssueTable from '../../src/main/js/knowledge_base/components/IssueTable'
import KbCache from '../../src/main/js/common/KbCache'

jest.mock('sonar-request', () => {
  return {
    getJSON: jest.fn(async () => 'response')
  }
}, {virtual: true})

const markdown = `
---
key: value
---

# Cross-Site Request Forgery

1. TOC
{:toc}

![image](/assets/images/vuln/cross_site_request_forgery/cross_site_request_forgery_vulnerability/kb_0.png)

Click [here](http://link.com)`

test('IssueTable single issue single table row', () => {
  fetch.mockResponseOnce(JSON.stringify({markdown}));

  const issues = [
    {tags: ['owasp-a2', 'cwe']}
  ]
  const wrapper = mount(<IssueTable issues={issues} kbCache={new KbCache()}/>);
  expect(wrapper.find('tr')).toHaveLength(2); // +1 for header row
});

test('IssueTable 2 issues 2 table rows', () => {
  const issues = [
    {tags: ['owasp-a2']},
    {tags: ['owasp-a3']}
  ]
  const wrapper = mount(<IssueTable issues={issues}/>);
  expect(wrapper.find('tr')).toHaveLength(3); // +1 for header row
});