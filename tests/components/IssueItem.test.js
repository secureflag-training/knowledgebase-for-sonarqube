/**
 * @jest-environment jsdom
 */

import React from 'react'
import {mount, shallow} from 'enzyme'

import IssueItem from '../../src/main/js/knowledge_base/components/IssueItem';

test('IssueItem creates link to issue', () => {
  const issue = {
    project: "project",
    key: "key"
  }
  const wrapper = shallow(<IssueItem issue={issue}/>);
  expect(wrapper.debug()).toContain('<a href="/project/issues?id=project&open=key" />');
});

test('IssueItem extracts exrLink', () => {
  const issue = {
    project: "project",
    key: "key",
    kb: "Click [here](https://exrlink.com)"
  }
  const wrapper = mount(<IssueItem issue={issue}/>);
  expect(wrapper.debug()).toContain('href="https://exrlink.com"');
});

test('IssueItem has full vulnerability name', () => {
  const issue = {
    project: "project",
    key: "key",
    kb: "Click [here](https://exrlink.com)",
    vulnerability: "Cross-Site Scripting"
  }

  const wrapper = mount(<IssueItem issue={issue}/>);
  expect(wrapper.debug()).toContain('Cross-Site Scripting');
});