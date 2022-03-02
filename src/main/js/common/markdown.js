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

export function extractExrLink(markdown) {
  const linkRegex = /Click \[here\]\((.*?)\)/
  const match = markdown.match(linkRegex);
  console.log(match);
  return match[1];
}

export function formatMarkdown(text) {
  const frontmatterRegex = /^---[\s\S]+?---$/m
  text = text.replace(frontmatterRegex, "");
  const tocRegex = /^1. TOC\n{:toc}$/m;
  text = text.replace(tocRegex, "");
  const imageRegex = /^(!\[\w+\]\()(\/assets\/images.*)(\))$/gm;
  text = text.replace(imageRegex, "");
  return text;
}