import supabase from "@/app/lib/supabase/supabase_api";

const rest_endpoint: string = 'Players'

export default class Players {
    static async getPlayers() {
        return supabase.from(rest_endpoint).select();
    }
}