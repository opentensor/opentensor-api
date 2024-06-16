import nodemailer from 'nodemailer'

import { generateEmailHtml } from './templates/magic-link'

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
})
export async function sendMagicLinkFromGmail(email: string, signInLink: string, provider: any) {
  const result = await transport.sendMail({
    to: email,
    from: `${process.env.NEXT_PUBLIC_BRAND_NAME!} ${provider.from}`,
    subject: 'Sign in to your ' + process.env.NEXT_PUBLIC_BRAND_NAME + ' account',
    // text: text({ signInLink, host }),
    html: generateEmailHtml(signInLink, email)
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}
