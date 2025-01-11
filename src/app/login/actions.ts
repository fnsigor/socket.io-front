"use server"
import { API } from "@/constants"

type TypeResponse = { data?: any, error?: any }


export async function login(email: string, password: string): Promise<TypeResponse> {

  const response = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json() as TypeResponse

  if (!data) {
    throw new Error('Invalid response')
  }

  return data


}