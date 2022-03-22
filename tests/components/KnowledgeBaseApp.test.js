/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import {act} from 'react-dom/test-utils';
 import { setImmediate } from 'core-js';
 import {mount, shallow} from 'enzyme'
 
 import KnowledgeBaseApp from '../../src/main/js/knowledge_base/components/KnowledgeBaseApp'
 
 jest.mock('sonar-request', () => {
  return {
    getJSON: jest.fn(async () => 'response')
  }
}, {virtual: true})

 test('App initially loading', async () => {
   const options = {
     component: {
       project: {
         key: 'key'
       }
     }
   }
   const wrapper = shallow(<KnowledgeBaseApp options={options}/>);
   expect(wrapper.contains('<div>Loading...</div>'));
 });