"use client"
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import React, {useEffect, useState} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/table";
import PlayerTables from "@/components/PlayerTables";
import {Button} from "@nextui-org/button";
import {Tooltip, useDisclosure} from "@nextui-org/react";
import ApplyPlayerModal from "@/components/ApplyPlayerModal";

import {
	DeleteIcon
} from "@/components/icons";
import RemovePlayerModal from "@/components/RemovePlayerModal";

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

	const maxPlayers = 4

	useEffect(() => {

		fetch( `${BASE_URL}/players`)
			.then(response => response.json())
			.then(data => {
				setPlayers(data)
			})

		fetch( `${BASE_URL}/playersappliesnextmonday`)
			.then(response => response.json())
			.then(data => {
				setPlayersApplies(data)

				console.log("playerappppppppkies")
				console.log(data)
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
	}, [])





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
	const rows = ["asdfasd", "affdfdfd", "FAFasdfas"]

	return (
		<section>
			<div>
				{/*<ApplyPlayerModal players={...(players.length > 0 ? {players}: {})}/>
				<RemovePlayerModal players={...(players.length > 0 ? {players}: {})}/>*/}
                <PlayerTables nameOfTable="Angemeldete Spieler" startRange={0} endRange={maxPlayers} columns={columns} rows={...playersApplies}/>
				<PlayerTables nameOfTable="Nachrücker" startRange={maxPlayers} endRange={100} columns={columns} rows={...playersApplies}/>
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
