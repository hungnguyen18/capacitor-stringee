import { ref, useContext } from '@nuxtjs/composition-api'
import jwt from 'jsonwebtoken'

export function useStringee() {
  const { $config } = useContext()
  const { secret, iss } = $config.stringee
  const token = ref()
  token.value = jwt.sign(
    {
      jti: iss + new Date().toString(), // JWT ID
      iss, // API key sid
      exp: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime() / 1000 // expiration time in seconds,
    },
    secret,
    {
      alg: 'HS256',
      typ: 'JWT',
      cty: 'stringee-api;v=1'
    }
  )
  return { token }
}
