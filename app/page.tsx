"use client"
import React, {useEffect, useState} from "react";
import PlayerTables from "@/components/PlayerTables";
import {Button} from "@nextui-org/button";
import {Divider, Select, SelectItem, Tooltip, useDisclosure} from "@nextui-org/react";
import ApplyPlayerModal from "@/components/ApplyPlayerModal";

import {
	DeleteIcon
} from "@/components/icons";
import RemovePlayerModal from "@/components/RemovePlayerModal";
import WarteMeldung from "@/components/WarteMeldung";
import Player_Applies from "@/app/lib/supabase/API/Player_Applies";
import Players from "@/app/lib/supabase/API/Players";
import {PostgrestSingleResponse} from "@supabase/supabase-js";


/*async function getPlayers(){
	const response = await , {
		method: "GET",
	});
	return response.json();
}*/

export default function Home() {

	const BASE_URL = "http://localhost:8080";

	const [players, setPlayers] = useState([]);
	const [playersApplies, setPlayersApplies] = useState([]);
	const [maxPlayers, setMaxPlayers] = useState(26)

	useEffect(() => {

		Players.getPlayers().then((data: any) => {
			setPlayers(data)
		})

		Player_Applies.getPlayerAppliesJoint().then((res) => {
			if(res != null && res.data != null){
				let data = res.data;
				let count = 0;
				for (let obj of data) {
					// @ts-ignore
					obj.count = ++count
					if (count == maxPlayers) {
						count = 0
					}
					// @ts-ignore
					obj.vorname = obj.players.vorname
					// @ts-ignore
					obj.nachname = obj.players.nachname
				}
				// @ts-ignore
				setPlayersApplies(data)
			}
		})
	},[])

	// TODO: Type vom Parameter konkretisieren
	function setLimit(event: any){
		setMaxPlayers(event.target.value)
	}

	const columns = [
		{
			key: "count",
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
		{
			key: "apply_timestamp",
			label: "Anmeldezeitpunkt"
		}
	];


	return (
		<section>
			<div>
				<Select
					label="Grenze der Nachrücker"
					className="max-w-xs"
					onChange={setLimit}
					defaultSelectedKeys={[26]}
				>
					<SelectItem key={15}>15</SelectItem>
					<SelectItem key={24}>24</SelectItem>
					<SelectItem key={26}>26</SelectItem>
					<SelectItem key={30}>30</SelectItem>
					<SelectItem key={36}>36</SelectItem>
				</Select>
				<ApplyPlayerModal players={players}/>
				<RemovePlayerModal players={players}/>
                <PlayerTables nameOfTable="Angemeldete Spieler" startRange={0} endRange={maxPlayers} columns={columns} rows={playersApplies}/>
				<PlayerTables nameOfTable="Nachrücker" startRange={maxPlayers} endRange={100} columns={columns} rows={playersApplies}/>
			</div>























			{/*<h1 className={title()}>*/}
			{/*	websites regardless of your design experience.*/}
			{/*</h1>*/}
			{/*<h2 className={subtitle({ class: "mt-4" })}>*/}
			{/*	Beautiful, fast and modern React UI library.*/}
			{/*</h2>*/}


			{/*<div className="flex gap-3">*/}
			{/*	<Link*/}
			{/*		isExternal*/}
			{/*		href={siteConfig.links.docs}*/}
			{/*		className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}*/}
			{/*	>*/}
			{/*		Documentation*/}
			{/*	</Link>*/}
			{/*	<Link*/}
			{/*		isExternal*/}
			{/*		className={buttonStyles({ variant: "bordered", radius: "full" })}*/}
			{/*		href={siteConfig.links.github}*/}
			{/*	>*/}
			{/*		<GithubIcon size={20} />*/}
			{/*		GitHub*/}
			{/*	</Link>*/}
			{/*</div>*/}

			{/*<div className="mt-8">*/}
			{/*	<Snippet hideSymbol hideCopyButton variant="flat">*/}
			{/*		<span>*/}
			{/*			Get started by editing <Code color="primary">app/page.tsx</Code>*/}
			{/*		</span>*/}
			{/*	</Snippet>*/}
			{/*</div>*/}
		</section>
	);
}
