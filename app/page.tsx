"use client"
import React, {useEffect, useState} from "react";
import PlayerTables from "@/components/PlayerTables";
import ApplyPlayerModal from "@/components/ApplyPlayerModal";

import RemovePlayerModal from "@/components/RemovePlayerModal";
import WarteMeldung from "@/components/WarteMeldung";

export default function Home() {

	const [players, setPlayers] = useState([]);
	const [playersApplies, setPlayersApplies] = useState([]);
	const [maxPlayers, setMaxPlayers] = useState(-1)

	useEffect(() => {

		fetch( process.env.NEXT_PUBLIC_API_BASE_URL + `/players`)
			.then(response => {
				return response.json()
			})
			.then(data => {
				setPlayers(data)
			})

		fetch( process.env.NEXT_PUBLIC_API_BASE_URL + `/admin/maxPlayers`)
			.then(response => response.json())
			.then(data1 => {
				setMaxPlayers(data1.maxPlayers)
			})

		

		fetch( process.env.NEXT_PUBLIC_API_BASE_URL + `/playersappliesnextmonday`)
			.then(response => response.json())
			.then(data => {
				setPlayersApplies(data)
				let count = 0;
				for(let obj of data){
					obj.count = ++count
					if(count == maxPlayers){
						count = 0
					}
					obj.vorname = obj.player.vorname
					obj.nachname = obj.player.nachname
				}
				
			})
	}, [maxPlayers])

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
			key: "instant",
			label: "Anmeldezeitpunkt"
		}
	];

	if (players.length == 0 || playersApplies.length == 0 || maxPlayers == -1) return <WarteMeldung/>;

	return (
		<section >
			{players && playersApplies && 
				<div className="space-y-4">
					<div className="mb-12">
						Grenze der Nachrücker: {maxPlayers}
					</div>
					<div>
						<ApplyPlayerModal players={players}/>
						<RemovePlayerModal players={players}/>
					</div>
					
					<PlayerTables nameOfTable="Angemeldete Spieler" startRange={0} endRange={maxPlayers} columns={columns} rows={playersApplies}/>
					<PlayerTables nameOfTable="Nachrücker" startRange={maxPlayers} endRange={100} columns={columns} rows={playersApplies}/>

				</div>
			}
				



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
