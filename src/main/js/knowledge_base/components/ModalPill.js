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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../../style.css";
import tachyons from "../../tachyons.css";

export default function ModalPill(props) {
  const [showModal, setShowModal] = React.useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <a
        className={`${tachyons.f6} ${tachyons.link} ${tachyons.dim} ${tachyons["br-pill"]} ${tachyons.ph3} ${tachyons.pv2} ${tachyons.dib} ${tachyons.white} ${tachyons["hover-white"]} ${tachyons["bg-near-black"]}`}
        href={props.link}
        onClick={handleOpenModal}
      >
        Read More
      </a>
      {showModal ? (
        <div className={`${styles.modalContainer}`}>
          <div className={`${styles.modalContent}`}>
            <p align="left" width="100%">
              <img
                src="https://user-images.githubusercontent.com/87369283/128739726-f334fbf2-c531-4972-a175-547485ba2322.png"
                width="600px"
              />
            </p>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >
              {props.markdown}
            </ReactMarkdown>
            <a
              className={`${tachyons.f6} ${tachyons.link} ${tachyons.dim} ${tachyons["br-pill"]} ${tachyons.ph3} ${tachyons.pv2} ${tachyons.dib} ${tachyons.white} ${tachyons["bg-near-black"]}`}
              href={props.link}
              onClick={handleCloseModal}
            >
              Close
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
