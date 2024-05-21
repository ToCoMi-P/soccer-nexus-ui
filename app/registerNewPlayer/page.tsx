"use client";
import { title } from "@/components/primitives";
import {Button, Input} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import RegisterPlayerModal from "@/components/RegisterPlayerModal";
import PlayerTables from "@/components/PlayerTables";

export default function RegisterNewPlayerPage() {

	const BASE_URL = "http://localhost:8080";

	const [players, setPlayers] = useState([]);

	useEffect(() => {

		fetch( `${BASE_URL}/players`)
			.then(response => response.json())
			.then(data => {
				setPlayers(data)
			})
	}, [])

	const columns = [
		{
			key: "id",
			label: "NR"
		},
		{
			key: "vorname",
			label: "Vorname"
		},
		{
			key: "nachname",
			label: "Nachname"
		},
	];

	return (
		<div>
			{/*<RegisterPlayerModal/>*/}

			<PlayerTables nameOfTable="Tabelle aller Spieler" startRange={0} endRange={200} columns={columns} rows={players}></PlayerTables>
		</div>
	);
}
