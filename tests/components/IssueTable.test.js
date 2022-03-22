/**
 * @jest-environment jsdom
 */

import React from 'react'
import {mount} from 'enzyme'

import IssueTable from '../../src/main/js/knowledge_base/components/IssueTable'

test('IssueTable single issue single table row', () => {
  const issues = [
    {tags: ['owasp-a2']}
  ]
  const wrapper = mount(<IssueTable issues={issues}/>);
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