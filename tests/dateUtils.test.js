/**
 * @jest-environment jsdom
 */

import { formatDateWithBrowserTimeZone } from "../src/main/js/common/dateUtils";

test('Timezone is formatted correctly', () => {
  const dateString = formatDateWithBrowserTimeZone(new Date('2022-02-24T16:39:37+0000'));
  expect(dateString).toEqual('24/02/2022, 16:39:37');
});