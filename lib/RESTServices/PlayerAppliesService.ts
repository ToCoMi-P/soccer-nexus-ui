import { Player } from "@/Types/Player"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}

export class PlayerAppliesService {
  static async getPlayersNextMonday(): Promise<Player[]> {
    const res = await fetch(`${API_BASE_URL}/playersappliesnextmonday`, {
      cache: "no-store",
    })
    if (!res.ok) {
      throw new Error("Failed to fetch players")
    }
    return res.json()
  }
}
