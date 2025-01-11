"use server"
import { getCookie } from '@/actions/cookies'
import { API } from '@/constants'
import { redirect } from 'next/navigation'

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}

type TypeMethods = "GET" | "POST" | "PATCH" | "PUT " | "DELETE"
type TypeBody = [] | {}
type TypeResponse = { data?: any, error?: any }





export async function request(method: TypeMethods, endpoint: string, body?: TypeBody): Promise<TypeResponse> {

  try {

    let authCookie = ""
    const cookie = await getCookie("token")

    if (cookie) {
      authCookie = cookie
    }

    const response = await fetch(`${API}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${authCookie}`
      },
      body: JSON.stringify(body),
    })

    const data = await response.json() as TypeResponse

    return data

  } catch (e: any) {
    if (e.error) {
      return {
        error: e.error
      }
    }
    return {
      error: "Bad request conection"
    }
  }
}

export async function reactQueryRequest(method: TypeMethods, endpoint: string, body?: TypeBody): Promise<any | void> {
  const response = await request(method, endpoint, body)

  if (response.error) {
    throw new Error(JSON.stringify(response.error))
  }

  return response.data
}
