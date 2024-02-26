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
import tachyons from "../../tachyons.css"

export default function HotspotTable(props) {
  const [hotspots, setHotspots] = React.useState(props.hotspots);

  React.useEffect(() => {
    // Query Knowledge Base API for each vulnerability
    async function queryKnowledgeBase() {
      hotspots.forEach(async (hotspot, index, hotspotsArray) => {
        if (hotspot.securityCategory) {
          hotspot.vulnerability = hotspot.securityCategory
          const markdown = await props.kbCache.fetch(hotspot.securityCategory);
          hotspot.kb = markdown ? markdown : 'N/A';
          setHotspots(hotspotsArray.slice());
        }
      });
    }
    queryKnowledgeBase();
  }, []);

  return (
    <div>
      <div className={`${tachyons['overflow-auto']}`}>
        <table className={`${tachyons.f6} ${tachyons['w-100']} ${tachyons.center}`} cellspacing="0">
          <thead>
            <tr>
              <th className={`${tachyons.fw6} ${tachyons.bb} ${tachyons['b--black-20']} ${tachyons.tl} ${tachyons.pb3} ${tachyons.pr3}" scope="col"`}>Hotspot</th>
              <th className={`${tachyons.fw6} ${tachyons.bb} ${tachyons['b--black-20']} ${tachyons.tl} ${tachyons.pb3} ${tachyons.pr3}" scope="col"`}>Category</th>
              <th className={`${tachyons.fw6} ${tachyons.bb} ${tachyons['b--black-20']} ${tachyons.tl} ${tachyons.pb3} ${tachyons.pr3}" scope="col"`}>Last Updated</th>
              <th className={`${tachyons.fw6} ${tachyons.bb} ${tachyons['b--black-20']} ${tachyons.tl} ${tachyons.pb3} ${tachyons.pr3}" scope="col"`}>Recommended Lab</th>
              <th className={`${tachyons.fw6} ${tachyons.bb} ${tachyons['b--black-20']} ${tachyons.tl} ${tachyons.pb3} ${tachyons.pr3}" scope="col"`}>Remediation Advice</th>
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