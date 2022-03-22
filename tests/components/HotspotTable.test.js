/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import {act} from 'react-dom/test-utils';
 import { setImmediate } from 'core-js';
 import {mount, shallow} from 'enzyme'
 
 import HotspotTable from '../../src/main/js/knowledge_base/components/HotspotTable'
 
 test('HotspotTable single issue single table row', () => {
   const hotspots = [
     {tags: ['owasp-a2']}
   ]
   const wrapper = mount(<HotspotTable hotspots={hotspots}/>);
   expect(wrapper.find('tr')).toHaveLength(2); // +1 for header row
 });

 test('HotspotTable 2 issues 2 table rows', () => {
  const hotspots = [
    {tags: ['owasp-a2']},
    {tags: ['owasp-a3']}
  ]
  const wrapper = mount(<HotspotTable hotspots={hotspots}/>);
  expect(wrapper.find('tr')).toHaveLength(3); // +1 for header row
});