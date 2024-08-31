import supabase from "@/app/lib/supabase/supabase_api";
import {list} from "postcss";

const rest_endpoint: string = 'Player_Applies'

export default class Player_Applies {
    static async getPlayerApplies() {
        return supabase.from(rest_endpoint).select()
    }

    static async getPlayerAppliesJoint() {
        return supabase.from(rest_endpoint).select('id, date, apply_timestamp, players:player_id (id, nachname, vorname)')
    }

    static async addPlayerApplies(listOfPlayers: any){
        let res: any[] = []
        listOfPlayers.forEach((playerId: string) => {
            res.push({date: '2024-09-02', apply_timestamp: '2024-08-29 09:13:00', player_id: playerId})
        })
        supabase.from(rest_endpoint).insert(res)
        return supabase.from(rest_endpoint).insert(res)
    }

    static async removePlayerApply(playerId: number){
        return supabase.from(rest_endpoint).delete().eq("player_id", playerId)
    }

    static async removePlayerApplies(listOfPlayers: any){
        await listOfPlayers.forEach((playerId: number) => this.removePlayerApply(playerId))
    }
}

