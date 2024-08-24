import supabase from "@/app/lib/supabase/supabase_api";

const rest_endpoint: string = 'Player_Applies'

export default class Player_Applies {
    static async getPlayerApplies() {
        return supabase.from(rest_endpoint).select()
    }

    static async getPlayerAppliesJoint() {
        return supabase.from(rest_endpoint).select('id, date, apply_timestamp, players:player_id (id, nachname, vorname)')
    }
}

