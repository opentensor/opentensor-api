# OpenTensor API & PaaS

This repository is designed to provide simple and easy-to-use templates (PaaS -- Product as a Service) for validators which enables:

- API endpoints to Bittensor subnet services and digital commodities

- Frontend and Backend templates

- Monetization with stripe integration

NOTE: At present, you have to manually configure your own validator to route the requests to. Reach out to koyuki@opentensor.dev for further assistance. In addition, if you need a customized design & UI beyond the templates given, the OTF team is here to help.

## Deploy

We use vercel for deployment: https://opentensor-paas-template.vercel.app/

## API documentation

https://opentensor-paas-template.apidog.io/

## Setup

## 1. Clone the repository

i. Clone the opentensor-api repository to your local machine using git:

`git clone https://github.com/opentensor/opentensor-api.git`

ii. use to following command to pull docker image

`docker pull...`

## 2. Setup environment

After cloning the repository, you first need to configure the project's environment variables.

In the projects root directory, rename the .env.example file to .env.

### Database

`DATABASE_URL:`

Any postgresSQL database connection url

### Stripe

`STRIPE_SECRET:`

Get your stripe keys: https://stripe.com/docs/keys

### Email

1. Using Gmail SMPT and nodemailer:
   Signing in to Google > App passwords
   https://myaccount.google.com › apppasswords

`EMAIL_USER: your_gmail_email@gmail.com`

`EMAIL_APP_PASSWORD: your_app_password_here`

1. Using Resend: Create a free Resend account and paste in your API key: https://resend.com

Connect your domain, and replace the email in `src/lib/email/resend-mailer.ts` file.

`RESEND_SECRET:`

`RESEND_DOMAIN: your custom domain or 'resend.dev' `

### Auth

1. Create your Google Auth Credentials here:
   https://console.cloud.google.com/apis/

`GOOGLE_CLIENT_ID:`

`GOOGLE_CLIENT_SECRET:`

2. Create your Github Auth Credentials here:
   https://github.com/settings/developers

`GITHUB_CLIENT_ID:`

`GITHUB_CLIENT_SECRET:`

3. NEXT Auth

`NEXTAUTH_URL='http://localhost:3000'` for development
for production, replace this with your website url

`NEXTAUTH_SECRET:` A random string is used to hash tokens, sign/encrypt cookies and generate cryptographic keys.

`APIKEY_ENCRYPT_KEY:`

### Vision(SN19)

Modify these to set your own validator url and key

`VISION_KEY_OTF_VALIDATOR:`

`VISION_URL_OTF_VALIDATOR:`

### Niche(SN23)

Modify these to set your own validator url and key

`NICHE_KEY_OTF_VALIDATOR:`

`NICHE_URL_OTF_VALIDATOR:`

NOTE:

## 3. Install

Next, to install the projects dependencies, run the following command in your console inside of the projects directory:

`pnpm install`

## 4. Generate Prisma

In order to make sure your DB has the correct schema run:

`pnpm dlx prisma db push`

Then, generate the prisma client using:

`pnpm dlx prisma generate`

## 5. Run

Run the local development server:

`pnpm run dev`

## 6. Notes

When deploying to Vercel, make sure you update your environment variables.

## 7. Release

To initaie a release, after commiting the changes to github run the following commands:

1. `npx changeset add`

the above command lets you add a custom Release note

2. `pnpm run release` choose: patch | minor | major

See here for information on [semver](https://semver.org/) versioning

3. Your final prompt will be to provide a message to go alongside the changeset. This will be written into the changelog when the next release occurs.
4. After this, a new changeset will be added which is a markdown file with YAML front matter.

```
-| .changeset/
-|-| UNIQUE_ID.md

```

The message you typed can be found in the markdown file. If you want to expand on it, you can write as much markdown as you want, which will all be added to the changelog on publish. If you want to change the bump type for the changeset, that's also fine.

4. Once you are happy with the changeset, commit the file to your branch.

# Resources

1. https://nodemailer.com/smtp
2. https://next-auth.js.org/getting-started
3. https://github.com/changesets/changesets
