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
import Pill from "./Pill";
import tachyons from '../../tachyons.css'

export default function HotspotItem(props) {
  const hotspot = props.hotspot;
  const hotspotLink = "/security_hotspots?id=" + hotspot.project + "&hotspots=" + hotspot.key

  if (hotspot.kb !== undefined && hotspot.kb !== 'N/A') {
    hotspot.exr = extractExrLink(hotspot.kb);
  }
  
  return (
    <tr key={hotspot.key}>
      <td className={`${tachyons.pv3} ${tachyons.pr3} ${tachyons.bb} ${tachyons['b--black-20']}`}>
        <a href={hotspotLink}>{hotspot.message}</a>
      </td>
      <td className={`${tachyons.pv3} ${tachyons.pr3} ${tachyons.bb} ${tachyons['b--black-20']}`}>
        {hotspot.vulnerability ? hotspot.vulnerability : ''}
      </td>
      <td className={`${tachyons.pv3} ${tachyons.pr3} ${tachyons.bb} ${tachyons['b--black-20']}`}>
      {formatDateWithBrowserTimeZone(new Date(hotspot.updateDate))}
      </td>
      <td className={`${tachyons.pv3} ${tachyons.pr3} ${tachyons.bb} ${tachyons['b--black-20']}`}>
        {hotspot.exr !== undefined ?
          <LinkPill link={hotspot.exr} text="Training Lab"></LinkPill>
        :
          hotspot.kb ? <Pill text="N/A"/> : 'Fetching...'
        }
      </td>
      <td className={`${tachyons.pv3} ${tachyons.pr3} ${tachyons.bb} ${tachyons['b--black-20']}`}>
        {hotspot.exr !== undefined ?
          <ModalPill markdown={formatMarkdown(hotspot.kb)}></ModalPill>
        :
          hotspot.kb ? <Pill text="N/A"/> : 'Fetching...'
        }
      </td>
    </tr>
  );
}