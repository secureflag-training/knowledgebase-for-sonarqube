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
import { OwaspTop10 } from "../../common/OwaspTop10";
import IssueItem from "./IssueItem";
import tachyons from '../../tachyons.css'
import { getRuleDetails } from "../../common/api";

export default function IssueTable(props) {
  const [issues, setIssues] = React.useState(props.issues);

  React.useEffect(() => {
    // Query Knowledge Base API for each vulnerability
    async function queryKnowledgeBase() {
      issues.forEach(async (issue, index, issuesArray) => {
        let markdown = null;

        // rule details contain information about the vuln
        let ruleDetails = await getRuleDetails(issue.rule)
        if (ruleDetails.rule?.descriptionSections) {
          let resourcesSection = ruleDetails.rule.descriptionSections.find((section) => section.key == 'resources')
          if (resourcesSection) {
            markdown = await props.kbCache.fetch(resourcesSection.content);
          }
        } else if (ruleDetails.rule?.htmlDesc) {
          markdown = await props.kbCache.fetch(ruleDetails.rule.htmlDesc);
        }

        if (!markdown && issue.tags.includes('cwe')) {
          issue.vulnerability = OwaspTop10.getTitle(issue.tags);
          if(issue.vulnerability) {
            markdown = await props.kbCache.fetch(issue.vulnerability);
          }
        }

        console.log(markdown)
        issue.kb = !!markdown ? markdown : 'N/A';
        setIssues(issuesArray.slice());
      });
    }
    queryKnowledgeBase();
  }, []);

  return (
    <div className={`${tachyons.mb3}`}>
      <div className={`${tachyons['overflow-auto']}`}>
        <table className={`${tachyons.f6} ${tachyons['w-100']} ${tachyons.center}`} cellspacing="0">
          <thead>
            <tr>
              <th className={`${tachyons.fw6} ${tachyons.bb} ${tachyons['b--black-20']} ${tachyons.tl} ${tachyons.pb3} ${tachyons.pr3}" scope="col"`}>Issue</th>
              <th className={`${tachyons.fw6} ${tachyons.bb} ${tachyons['b--black-20']} ${tachyons.tl} ${tachyons.pb3} ${tachyons.pr3}" scope="col"`}>Last Updated</th>
              <th className={`${tachyons.fw6} ${tachyons.bb} ${tachyons['b--black-20']} ${tachyons.tl} ${tachyons.pb3} ${tachyons.pr3}" scope="col"`}>Related Labs</th>
              <th className={`${tachyons.fw6} ${tachyons.bb} ${tachyons['b--black-20']} ${tachyons.tl} ${tachyons.pb3} ${tachyons.pr3}" scope="col"`}>Remediation Advice</th>
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