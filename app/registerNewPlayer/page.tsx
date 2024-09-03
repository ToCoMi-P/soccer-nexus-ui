"use client"

import React, {useEffect, useState} from "react";
import RegisterPlayerModal from "@/components/RegisterPlayerModal";
import PlayerTables from "@/components/PlayerTables";
import WarteMeldung from "@/components/WarteMeldung";
import getPlayers from "@/app/lib/supabase/API/Players";
import Players from "@/app/lib/supabase/API/Players";

export default function RegisterNewPlayerPage() {

	//const BASE_URL = "http://localhost:8080";

	const [players, setPlayers] = useState(null);
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {

		Players.getPlayers().then((res: any) => {
			setPlayers(res.data)
			setLoading(false)
		})

	}, [])

	const columns = [
		/*{
			key: "id",
			label: "NR"
		},*/
		{
			key: "vorname",
			label: "Vorname"
		},
		{
			key: "nachname",
			label: "Nachname"
		},
	];

	if (isLoading) return <div>Loading...</div>
    if (!players) return <div>no Players</div>

	return (
		<div>
			<RegisterPlayerModal/>

			<PlayerTables nameOfTable="Tabelle aller bereits registrierten Spieler" startRange={0} endRange={200} columns={columns} rows={players}></PlayerTables>
		</div>
	);
}
