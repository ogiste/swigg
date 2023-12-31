/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const SITE_URL = 'https://dreamscapemastermind.com';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'og1ste';
export const BRAND_NAME = 'Swigg';
export const SITE_NAME_MULTILINE = ['DM', 'Swigg Community Events'];
export const SITE_NAME = 'Swigg';
export const META_DESCRIPTION =
  'Swigg Events ~ live events and ticketing';
export const SITE_DESCRIPTION =
  'A new age events and ticketing platform';
export const DATE = 'October 2023';
export const SHORT_DATE = 'October 24 - 9:00am PST';
export const FULL_DATE = 'October 25 Pacific Time (GMT-7)';
export const TWEET_TEXT = META_DESCRIPTION;
export const COOKIE = 'user-id';

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;

export const CODE_OF_CONDUCT =
  'dreamscapemastermind.com';
export const REPO = 'https://github.com/ogiste/swigg';
export const SAMPLE_TICKET_NUMBER = 1234;
export const NAVIGATION = [
  {
    name: 'ETHGlobal Live',
    route: '/stage/a'
  },
  // {
  //   name: 'Vercel Stage',
  //   route: '/stage/c'
  // },
  // {
  //   name: '100ms Stage',
  //   route: '/stage/m'
  // },
  // {
  //   name: 'Schedule',
  //   route: '/schedule'
  // },
  // {
  //   name: 'Events',
  //   route: '/speakers'
  // },
  // {
  //   name: 'Expo',
  //   route: '/expo'
  // },
  // {
  //   name: 'Upcoming Festivals',
  //   route: '/jobs'
  // }
];

export type TicketGenerationState = 'default' | 'loading';
