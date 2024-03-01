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
import tachyons from "../../tachyons.css";

export default function LinkPill(props) {
  return (
    <a
      className={`${tachyons.f6} ${tachyons.link} ${tachyons["br-pill"]} ${tachyons.ph3} ${tachyons.pv2} ${tachyons.dib} ${tachyons.white} ${tachyons["hover-white"]} ${tachyons.dim} ${tachyons["bg-blue"]}`}
      href={props.link}
    >
      {props.text}
    </a>
  );
}
