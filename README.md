

# Community Experience Platform (Events and Social App)

This includes the following features (WIP):

- Multiple stages - with the ability to add multiple sessions on each stage
- Each stage can be configured as -
  - An embedded YouTube stream OR
  - A live interactive audio-video experience powered by [100ms](https://www.100ms.live)
- Sponsor expo, including individual virtual booths
- Career Fair, allowing attendees to network and find job opportunities
- Ticket registration and generation
- Speaker pages and bios
- Schedule
---

## Built With

- Framework: [Next.js](https://nextjs.org/)
  - [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support)
  - [TypeScript](https://nextjs.org/docs/basic-features/typescript)
- CMS: [DatoCMS](https://www.datocms.com/docs)
- Live interactive video: [100ms](http://www.100ms.live)
- Database: [Supabase](https://supabase.com/)

## What’s the goal?

The go to community experience platform for :

1. Live Webinars
2. Community Calls
3. Hackathons
4. Panel Discussions
5. Multi-stage live conferences with a backstage (coming soon)

## Running Locally


First, to set local environment variables you can either use Vercel CLI [vercel env pull](https://vercel.com/docs/cli#commands/env) or just manually copy paste them.

```bash

cp .env.local.example .env.local
```

Then install the package and run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000/) to see the landing page.

### Stages

There are four different stages included in the seed data. Feel free to add or remove these based on your schedule. Each stage can be easily configured to be a Live Video/Audio experience or an embedded YouTube stream. (You can do all of these configurations via DatoCMS console)

### Joining a stage

Visit `/stage/a` after entering your email you should see a "Enter your name" input form.

> NOTE: by default, you will join as a Viewer

![join](/media/join.png)

Click on Join and you should see "No Speakers Present". This is because only you have joined the Stage aka the "Room" as a viewer. A viewer does not have the permission to publish their audio and video. You can read more about roles in the sections below.

![stage.png](/media/stage.png)

### Joining with different Roles

For this we pass a query param in url for eg: `/stage/a?role=<ROLE_NAME>`

- Moderator: `/stage/a?role=backstage`

- Speaker: `/stage/a?role=stage`

- Viewer: `/stage/a`

So if you visit `/stage/a?role=stage` now you should see a Preview screen opening up. After joining you should be able to see yourselves. Open a new tab or invite others to host your next meetup, community calls, etc.

![preview](/media/preview.png)

### Customize

#### Live Video

To learn more on how to customise the live video aspect of this template, refer to [this document](/hms.md).

### **CMS**

Environment variables determine which CMS to use. See [lib/cms-api.ts](https://github.com/ogiste/swigg/blob/main/lib/cms-api.ts) for details and `.env.local.example` for all environment variables.

### **Constants**

`lib/constants.ts` contains a list of variables you should customize.


---

## **Authentication and Database**

Some features won’t work until you set up authentication and database.

### **Authentication**

You need to have GitHub OAuth set up to be able to customize the ticket after signing up on the registration form.

First, create a [GitHub OAuth application](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app) to use for authentication.

- Set **Authorization Callback URL** as `<your domain>/api/github-oauth`
- After creating the OAuth app, create a **client secret**.

### **Running Locally:**

- Set the Authorization Callback URL as `http://localhost:3000/api/github-oauth` on GitHub.
- On `.env.local`, set `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID` as the **Client ID** of the OAuth app.
- Set `GITHUB_OAUTH_CLIENT_SECRET` as the **Client secret** of the OAuth app.
- Finally, make sure the `NEXT_PUBLIC_SITE_ORIGIN` environment variable is set as `http://localhost:3000`. This is required to get the OAuth popup to work locally.
- Restart the app (`yarn dev`) after editing `.env.local`.

Once it’s set up, sign up using the registration form on the home page (not on a stage page) and then click "Generate with GitHub".

### **On Deployment ENV e.g vercel :**

- Set the Authorization Callback URL as `<your deployment’s URL>/api/github-oauth` on GitHub.
- Set `NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID` and `GITHUB_OAUTH_CLIENT_SECRET` on [Vercel Project Environment Variables Settings](https://vercel.com/docs/environment-variables) for the production environment.
- Edit `SITE_URL` in `lib/constants.ts` to match your deployment’s URL (no trailing slash).
- Push the code to redeploy the Project on Vercel.

### **Database**

You need a database to save user data and enable the following features:

- Generating a unique ticket number for each email when signing up on the registration form. If no DB is set up, it’ll always be `1234`.
- Generating a unique ticket image or ticket URL after signing in with GitHub. If no DB is set up, each ticket image or URL will show generic data.

Environment variables determine which database to use. See [lib/db-api.ts](https://github.com/ogiste/swigg/blob/main/lib/db-api.ts) for details and `.env.local.example` for all environment variables.
