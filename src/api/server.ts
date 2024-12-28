'use server'
import { API } from '@/constants'
import { getCookie } from '@/actions/cookies'

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}

type TypeMethods = "GET" | "POST" | "PATCH" | "PUT " | "DELETE"
type TypeBody = [] | {}
type TypeResponse = { data?: any, error?: any }





async function normalRequest(method: TypeMethods, endpoint: string, body?: TypeBody): Promise<TypeResponse> {

  try {
    // const token = await getCookie('_advertiser.token')

    // if (!token) {
    //   return {
    //     error: {
    //       name: "INVALID_TOKEN",
    //       message: "Token can't be null",
    //       statusCode: 401
    //     }
    //   }
    // }

    const response = await fetch(`${API}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    })

    const data = await response.json() as TypeResponse

    if (!data) {
      throw new Error('Invalid response')
    }

    return data

  } catch (e) {
    return {
      error: {
        name: "BAD_REQUEST",
        message: "Bad request conection",
        statusCode: 520
      }
    }
  }
}

async function reactQuery(method: TypeMethods, endpoint: string, body?: TypeBody): Promise<{ data: any } | void> {
  const response = await normalRequest(method, endpoint, body)

  if (response.error) {
    throw new Error(JSON.stringify(response.error))
  }

  return response.data
}

normalRequest.reactQuery = reactQuery

export const request = normalRequest