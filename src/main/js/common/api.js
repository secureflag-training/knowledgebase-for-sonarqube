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
    facets: ['owaspTop10', 'sansTop25', 'cwe', 'sonarsourceSecurity'],
    p: 1,
    ps: 100,
    statuses: ['OPEN', 'REOPENED', 'CONFIRMED'],
    additionalFields: '_all'
  }).then(response => {
    console.debug(response);
    return response;
  });
}

export function findNewSecurityHotspots(project) {
  return getJSON("/api/hotspots/search", {
    projectKey: project.key,
    ps: 100,
    status: 'TO_REVIEW'
  }).then(response => {
    console.debug(response);
    return response;
  });
}

export function getRuleDetails(rule) {
  return getJSON("/api/rules/show", {
    key: rule
  }).then(response => {
    return response;
  });
}

export async function queryKnowledgeBase(text) {
  const res = await fetch('https://knowledge-base-api.secureflag.com/vuln/extract/markdown', {
    method: 'POST',
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

