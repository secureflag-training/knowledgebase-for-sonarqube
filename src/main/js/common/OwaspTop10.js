/*
 * SecureFlag Knowledge Base for SonarQube
 * Copyright (C) 2022 SecureFlag Limited
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

export class OwaspTop10 {
  static tags =  {
    'owasp-a1': 'Code Injection',
    'owasp-a2': 'Broken Authentication',
    'owasp-a3': 'Sensitive Information Disclosure',
    'owasp-a4': 'XXE',
    'owasp-a5': 'Broken Access Control',
    'owasp-a6': 'Security Misconfiguration',
    'owasp-a7': 'XSS',
    'owasp-a8': 'Insecure Deserialization',
    'owasp-a9': 'Using Components with Known Vulnerabilities',
    'owasp-a10': 'Insufficient Logging',
  }

  static tagToName(tag) {
    return this.tags[tag];
  }

  static getTag(tagArray) {
    for (const tag of tagArray) {
      if (tag.startsWith('owasp-')) {
        return tag;
      }
    }
    return '';
  }

  static getTitle(tagArray) {
    return this.tagToName(this.getTag(tagArray));
  }
}