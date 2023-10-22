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

import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { ConfUser, SwiggEvent } from '@lib/types';
import validator from 'validator';
import { COOKIE } from '@lib/constants';
import cookie from 'cookie';
import ms from 'ms';
import { getTicketNumberByUserId, getUserById, createUser } from '@lib/db-api';
import { emailToId } from '@lib/user-api';
import { validateCaptchaResult, IS_CAPTCHA_ENABLED } from '@lib/captcha';

type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<SwiggEvent | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  const userAddress: string = ((req.body.email as string) || '').trim().toLowerCase();
  const token: string = req.body.token as string;


  if (IS_CAPTCHA_ENABLED) {
    const isCaptchaValid = await validateCaptchaResult(token);

    if (!isCaptchaValid) {
      return res.status(400).json({
        error: {
          code: 'bad_captcha',
          message: 'Invalid captcha'
        }
      });
    }
  }

  let eventId = nanoid();
  let capacity: number;
  let date = new Date(Date.now() + ms('1 days'));
  let statusCode = 200;
  let name: string | null | undefined = undefined;
  let username: string | null | undefined = undefined;

 
  // Save `key` in a httpOnly cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(COOKIE, eventId, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/api',
      expires: new Date(Date.now() + ms('7 days'))
    })
  );

  return res.status(statusCode).json({
    eventId,
    name,
  });
}
