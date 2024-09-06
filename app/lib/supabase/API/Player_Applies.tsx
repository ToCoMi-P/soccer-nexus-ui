import supabase from "@/app/lib/supabase/supabase_api";
import {list} from "postcss";
import {PostgrestSingleResponse} from "@supabase/supabase-js";
import {getNextMonday} from "@/app/__lib/Date";

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
        const now = new Date()

        listOfPlayers.forEach((playerId: string) => {
            res.push({date: getNextMonday(now), apply_timestamp: `${now.getFullYear()}-${now.getMonth()+1}-${now.getDay()+1} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`, player_id: playerId})
        })
        return supabase.from(rest_endpoint).insert(res)
    }

    static async removePlayerApply(playerId: number){
        console.log(playerId)
        return supabase.from(rest_endpoint).delete().eq("player_id", playerId)
    }

    static async removePlayerApplies(listOfPlayers: any){
        await listOfPlayers.forEach((playerId: number) => this.removePlayerApply(playerId))
    }
}

