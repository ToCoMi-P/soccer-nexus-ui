import { Admin } from "../Types/Admin"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}

export class AdminService {
  static async getMaxPlayers(): Promise<Admin> {
    const res = await fetch(`${API_BASE_URL}/admin/maxPlayers`, {
      cache: "no-store",
    })
    if (!res.ok) {
      throw new Error("Failed to fetch admin details")
    }
    return res.json()
  }
}
