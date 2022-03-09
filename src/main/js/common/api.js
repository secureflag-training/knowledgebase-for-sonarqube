/*
 * SecureFlag Knowledge Base for SonarQube
 * Copyright (C) 2009-2020 SonarSource SA
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

import { getJSON } from "sonar-request";

export function findNewSecurityIssues(project) {
  return getJSON("/api/issues/search", {
    componentKeys: [project.key],
    types: ['VULNERABILITY'],
    facets: ['owaspTop10', 'sansTop25', 'cwe', 'sonarSourceSecurity'],
    p: 1,
    ps: 30,
    statuses: ['OPEN', 'REOPENED', 'CONFIRMED']
  }).then(response => {
    return response;
  });
}

export function findNewSecurityHotspots(project) {
  return getJSON("/api/hotspots/search", {
    projectKey: project.key,
    ps: 30,
    status: 'TO_REVIEW'
  }).then(response => {
    return response;
  });
}

export async function queryKnowledgeBase(text) {
  const res = await fetch('http://localhost:3100/dev/vuln/extract/markdown', {
    method: 'POST',
    headers: {
      'Authorization': 'IF4XmmBiQj',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      platformString: 'SONARQUBE',
      text,
      author: 'SONARQUBE'
    })
  });

  if (res.ok) {
    const json = await res.json();
    return json.markdown;
  }

  return '';
}

