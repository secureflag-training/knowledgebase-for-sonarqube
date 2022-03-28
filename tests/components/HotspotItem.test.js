/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import {mount, shallow} from 'enzyme'
 
 import HotspotItem from '../../src/main/js/knowledge_base/components/HotspotItem';
 
 test('HotspotItem creates link to issue', () => {
   const hotspot = {
     project: "project",
     key: "key"
   }
   const wrapper = shallow(<HotspotItem hotspot={hotspot}/>);
   expect(wrapper.debug()).toContain("<a href=\"/security_hotspots?id=project&hotspots=key\" />");
 });
 
 test('HotspotItem extracts exrLink', () => {
   const hotspot = {
     project: "project",
     key: "key",
     kb: "Click [here](https://exrlink.com)"
   }
   const wrapper = mount(<HotspotItem hotspot={hotspot}/>);
   expect(wrapper.debug()).toContain('href="https://exrlink.com"');
 });

 test('HotspotItem "N/A" kb', () => {
  const hotspot = {
    project: "project",
    key: "key",
    kb: "N/A"
  }
  const wrapper = mount(<HotspotItem hotspot={hotspot}/>);
  expect(wrapper.debug()).toContain('N/A');
 });


test('HotspotItem has full vulnerability name', () => {
  const hotspot = {
    project: "project",
    key: "key",
    kb: "N/A",
    vulnerability: "Cross-Site Scripting"
  }

  const wrapper = mount(<HotspotItem hotspot={hotspot}/>);
  expect(wrapper.debug()).toContain('Cross-Site Scripting');
});