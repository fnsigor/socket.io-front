'use server'
import { cookies } from "next/headers"

export async function setCookie(name: string, value: any, maxAge = 24 * 60 * 60) {
  cookies().set(name, value, { maxAge, httpOnly: true, path: '/' })
}

export async function getCookie(name: string) {
  return cookies().get(name)?.value || null
}

export async function removeAllCookies() {
  cookies().delete('_advertiser.info')
  cookies().delete('_advertiser.token')
  cookies().delete('user.invalid.token')
}
