# Launching this project with Prismic CMS

This page will show you how to launch a new Prismic repository with all the default content you need to get started.

## Clone the default Prismic repo

The Prismic command line interface will help get your Prismic repo launched. First install the CLI.

```bash
yarn global add prismic-cli
```

> Note: make sure to update to least version `3.8.4` of the `prismic-cli` if you already have it installed on your machine.

Then you can clone the project and launch a Prismic repository.

```bash
prismic theme --theme-url https://github.com/ogiste/swigg/archive/main.zip --conf lib/cms-providers/prismic/README.md --custom-types lib/cms-providers/prismic/custom_types --documents lib/cms-providers/prismic/documents
```

Note that you will likely need to log into your Prismic account or signup. After that, the command will download the project files, create a Prismic repository, & install the project dependencies.

## Running Locally

First, set local environment variables in `.env.local.example`.

```
cp .env.local.example .env.local
```

Then update the environment variables with your Prismic repo ID. Your repo id will the be subdomain of your Prismic repository. For example if your repo url is https://your-repo-name.prismic.io, then you would update your `.env.local` file as follows:

```
PRISMIC_REPO_ID=your-repo-name
```

Next at the top of the file, make sure to remove the the value from `DATOCMS_READ_ONLY_API_TOKEN`. The project won't source the content from Prismic until this has been done.

```
DATOCMS_READ_ONLY_API_TOKEN=
```

From the root of the project, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

