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

import React from "react";
import { getOwaspTitle } from "../../common/owasp";
import IssueItem from "./IssueItem";

export default function IssueTable(props) {
  const [issues, setIssues] = React.useState(props.issues);

  React.useEffect(async () => {
    // Query Knowledge Base API for each vulnerability
    issues.forEach(async (issue, index, issues) => {
      if (issue.tags.includes('cwe')) {
        const issueCopy = Object.assign({}, issue);
        const owaspTitle = getOwaspTitle(issueCopy.tags);
        if(owaspTitle) {
          console.log(owaspTitle);

          const markdown = await props.kbCache.fetch(owaspTitle);
          issue.kb = markdown ? markdown : 'N/A';
          setIssues(issues.slice());
        }
      }
    });
  }, []);

  return (
    <div>
      <div class="overflow-auto">
        <table class="f6 w-100 center" cellspacing="0">
          <thead>
            <tr>
              <th class="fw6 bb b--black-20 tl pb3 pr3" scope="col">Issue</th>
              <th class="fw6 bb b--black-20 tl pb3 pr3" scope="col">Recommended Lab</th>
              <th class="fw6 bb b--black-20 tl pb3 pr3" scope="col">Remediation Advice</th>
            </tr>
          </thead>
          <tbody class="lh-copy">
            {issues.map(issue =>
              <IssueItem issue={issue}></IssueItem>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}