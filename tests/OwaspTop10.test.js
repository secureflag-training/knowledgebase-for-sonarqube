/**
 * @jest-environment jsdom
 */

 import { OwaspTop10 } from "../src/main/js/common/OwaspTop10";

test('Getting owasp-a<X> tag from array', () => {
  expect(OwaspTop10.getTag(['one', 'owasp-a3', 'three'])).toBe('owasp-a3');
});

test('Empty string from invalid tag', () => {
  expect(OwaspTop10.getTag('owasp-a11')).toBe('');
});

test('Gets correct OWASP Top 10 name from owasp-a<X> tag', () => {
  expect(OwaspTop10.tagToName('owasp-a3')).toBe('Sensitive Information Disclosure');
})

test('Get OWASP Top 10 name from tag array', () => {
  expect(OwaspTop10.getTitle(['one', 'owasp-a3', 'three'])).toBe('Sensitive Information Disclosure');
})