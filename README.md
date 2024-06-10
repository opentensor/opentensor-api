# opentensor-api

This repository is designed to provide simple and easy-to-use templates for validators which enables:

- API endpoints to Bittensor subnet services and digital commodities

- Frontend and Backend templates

- Monetization with stripe integration

NOTE: At present, you have to manually configure your own validator to route the requests to. Reach out to koyuki@opentensor.dev for further assistance. In addition, if you need a customized design & UI beyond the templates given, the OTF team is here to help.

## Run

## Deploy

We use vercel for deployment: https://staging-apis-platform.vercel.app/

## API Usage

## Troubleshooting/Testing

# Setup

## 1. Clone the repo

Clone the opentensor-api repository to your local machine:

`git clone https://github.com/opentensor/opentensor-api.git`

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

`RESEND_SECRET:`

Create a free Resend account and paste in your API key: https://resend.com

Connect your domain, and replace the email in `src/lib/email/mailer.ts` file.

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

# Resources
Links
