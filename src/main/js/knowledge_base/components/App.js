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
import {
  findNewSecurityIssues,
} from "../../common/api";
import KbCache from "../../common/kbCache";
import IssueTable from "./IssueTable";

export default class KnowledgeBaseApp extends React.Component {
  state = {
    loading: true,
    securityIssues: "",
    kbCache: new KbCache()
  };

  componentDidMount() {
    Promise.all([
      findNewSecurityIssues(this.props.options.component)
    ]).then(([securityIssues]) => {
      this.setState({
        loading: false,
        securityIssues
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    return (
      <div class="center pa3 ph5-ns">
        <img src="https://user-images.githubusercontent.com/87369283/128739726-f334fbf2-c531-4972-a175-547485ba2322.png" width="20%"/>
        <h1 class="f2 lh-title mb4">SecureFlag Knowledge Base</h1>
        <h2 class="f3 lh-title">Recent Issues</h2>
        <IssueTable issues={this.state.securityIssues.issues} kbCache={this.state.kbCache}></IssueTable>
      </div>
    );
  }
}
