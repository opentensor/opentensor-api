import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text
} from '@react-email/components'
import { render } from '@react-email/components'

export const MagicLinkEmail = ({ signInLink, sentTo }: { signInLink: string; sentTo: string }) => (
  <Html>
    <Head />
    <Preview>Here is your one-time password for login</Preview>
    <Tailwind>
      <Body className="py-8 text-[#1a1a1a] font-sans">
        <Container>
          <Section>
            <Row className="">
              <Column width={'80'} className="pr-2">
                <Img
                  src={process.env.NEXT_PUBLIC_EMAIL_BRAND_LOGO! || '/logo.svg'}
                  width="80"
                  height="80"
                  className="rounded-sm"
                  alt="brand-logo"
                />
              </Column>
              <Column className="w-fit">
                <Text className="font-semibold tracking-tight text-2xl">{process.env.NEXT_PUBLIC_BRAND_NAME}</Text>
              </Column>
            </Row>
          </Section>
        </Container>
        <Container className="mx-auto">
          <Section className="flex flex-col gap-4">
            <Text className={'text-lg text-[#1a1a1a] font-semibold'}>Your one-time login link</Text>

            <Link
              href={signInLink}
              className="text-base text-right text-white bg-[#1a1a1a] px-6 py-3 rounded font-medium"
            >
              Login
            </Link>

            <Text>
              {
                'This code will expire in 24 hours. If you did not request this code, please reach out to support as soon as possible.'
              }
            </Text>
            <Text>— {process.env.NEXT_PUBLIC_BRAND_NAME}</Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export const generateEmailHtml = (signInLink: string, sentTo: string): string => {
  const emailComponent = <MagicLinkEmail signInLink={signInLink} sentTo={sentTo} />
  return render(emailComponent)
}
