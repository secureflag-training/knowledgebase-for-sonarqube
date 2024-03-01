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
  findNewSecurityHotspots
} from "../../common/api";
import KbCache from "../../common/KbCache";
import IssueTable from "./IssueTable";
import HotspotTable from "./HotspotTable";
import styles from "../../style.css"
import tachyons from '../../tachyons.css'

export default class KnowledgeBaseApp extends React.Component {
  state = {
    loading: true,
    securityIssues: "",
    kbCache: new KbCache()
  };

  componentDidMount() {
    Promise.all([
      findNewSecurityIssues(this.props.options.component),
      findNewSecurityHotspots(this.props.options.component)
    ]).then(([securityIssues, securityHotspots]) => {
      this.setState({
        loading: false,
        securityIssues,
        securityHotspots
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
      <div className={`${styles.pluginContainer} ${tachyons.center} ${tachyons.pa3} ${tachyons['ph5-ns']}`}>
        <img src="https://user-images.githubusercontent.com/87369283/128739726-f334fbf2-c531-4972-a175-547485ba2322.png" width="20%"/>
        <h1 className={`${tachyons.f1} ${tachyons['lh-title']} ${tachyons.mb4}`}>Knowledge Base</h1>
        <h2 className={`${tachyons.f3} ${tachyons['lh-title']}`}>Recent Vulnerabilities</h2>
        <IssueTable issues={this.state.securityIssues.issues} kbCache={this.state.kbCache}></IssueTable>
        <h2 className={`${tachyons.f3} ${tachyons['lh-title']}`}>Recent Security Hotspots</h2>
        <HotspotTable hotspots={this.state.securityHotspots.hotspots} kbCache={this.state.kbCache}></HotspotTable>
      </div>
    );
  }
}
