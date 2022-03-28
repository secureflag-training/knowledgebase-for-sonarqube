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
import { formatDateWithBrowserTimeZone } from "../../common/dateUtils";
import { extractExrLink, formatMarkdown } from "../../common/markdown";
import LinkPill from "./LinkPill";
import ModalPill from "./ModalPill";

export default function IssueItem(props) {
  const issue = props.issue;
  const issueLink = "/project/issues?id=" + issue.project + "&open=" + issue.key

  if (issue.kb !== undefined && issue.kb !== 'N/A') {
    issue.exr = extractExrLink(issue.kb);
  }
  
  return (
    <tr key={issue.key}>
      <td class="pv3 pr3 bb b--black-20">
        <a href={issueLink}>{issue.message}</a>
      </td>
      <td class="pv3 pr3 bb b--black-20">
        {issue.vulnerability ? issue.vulnerability : ''}
      </td>
      <td class="pv3 pr3 bb b--black-20">
        {formatDateWithBrowserTimeZone(new Date(issue.updateDate))}
      </td>
      <td class="pv3 pr3 bb b--black-20">
        {issue.kb !== undefined ?
          <LinkPill link={issue.exr} text="Training Lab"></LinkPill>
        :
          'Fetching...'
        }
      </td>
      <td class="pv3 pr3 bb b--black-20">
        {issue.kb !== undefined ?
          <ModalPill markdown={formatMarkdown(issue.kb)}></ModalPill>
        :
          'Fetching...'
        }
      </td>
    </tr>
  );
}