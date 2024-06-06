import crypto from 'crypto'
import { v4 as uuid } from 'uuid'

export function generateApiKeys() {
  const apiKey = uuid()
  const hash = crypto.createHash('sha256').update(apiKey).digest('hex')

  return {
    apiKey: apiKey,
    apiKeyHash: hash
  }
}

export function hashApiKey(apiKey: string) {
  const hash = crypto.createHash('sha256').update(apiKey).digest('hex')

  return hash
}

export function encryptApiKey(apiKey: string) {
  // create a random initialization vector
  const secretKey = process.env.APIKEY_ENCRYPT_KEY // Secret key used for encryption (keep this secure)
  const iv = crypto.randomBytes(12).toString('base64')

  // create a cipher object
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(secretKey!, 'base64'), Buffer.from(iv, 'base64'))

  // update the cipher object with the plaintext to encrypt
  let ciphertext = cipher.update(apiKey, 'utf8', 'base64')

  // finalize the encryption process
  ciphertext += cipher.final('base64')

  // retrieve the authentication tag for the encryption
  const tag = cipher.getAuthTag().toString('base64')

  return { encKey: ciphertext, iv, tag }
}

export function decryptApiKey(encKey: string, ivStr: string, tag: string) {
  const secretKey = process.env.APIKEY_ENCRYPT_KEY // Secret key used for encryption (keep this secure)
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(secretKey!, 'base64'),
    Buffer.from(ivStr, 'base64')
  )

  decipher.setAuthTag(Buffer.from(tag, 'base64'))

  let decrypted = decipher.update(encKey, 'base64', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
