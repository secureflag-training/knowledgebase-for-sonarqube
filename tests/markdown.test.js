/**
 * @jest-environment jsdom
 */

import {extractExrLink, formatMarkdown} from '../src/main/js/common/markdown';

test('Extract recommended exr link from markdown', () => {
  expect(extractExrLink('TEXT Click [here](http://link.com) TEXT')).toBe('http://link.com')
});

test('Format Knowledge Base markdown', () => {
  const markdown = `
---
key: value
---

# Cross-Site Request Forgery

1. TOC
{:toc}

![image](/assets/images/vuln/cross_site_request_forgery/cross_site_request_forgery_vulnerability/kb_0.png)`

 const expectedMarkdown = `


# Cross-Site Request Forgery



`
  expect(formatMarkdown(markdown)).toEqual(expectedMarkdown)
});
