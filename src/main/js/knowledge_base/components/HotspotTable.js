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
import HotspotItem from "./HotspotItem";

export default function HotspotTable(props) {
  const [hotspots, setHotspots] = React.useState(props.hotspots);

  React.useEffect(async () => {
    // Query Knowledge Base API for each vulnerability
    hotspots.forEach(async (hotspot, index, hotspots) => {
      if (hotspot.securityCategory) {
        const hotspotCopy = Object.assign({}, hotspot);
        const markdown = await props.kbCache.fetch(hotspot.securityCategory);
        hotspot.kb = markdown ? markdown : 'N/A';
        setHotspots(hotspots.slice());
      }
    });
  }, []);

  return (
    <div>
      <div class="overflow-auto">
        <table class="f6 w-100 center" cellspacing="0">
          <thead>
            <tr>
              <th class="fw6 bb b--black-20 tl pb3 pr3" scope="col">Hotspot</th>
              <th class="fw6 bb b--black-20 tl pb3 pr3" scope="col">Recommended Lab</th>
              <th class="fw6 bb b--black-20 tl pb3 pr3" scope="col">Remediation Advice</th>
            </tr>
          </thead>
          <tbody class="lh-copy">
            {hotspots.map(hotspot =>
              <HotspotItem hotspot={hotspot}></HotspotItem>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}