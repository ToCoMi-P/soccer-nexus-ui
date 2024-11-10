"use client"
import React, {useEffect, useState} from "react";
import PlayerTables from "@/components/PlayerTables";
import ApplyPlayerModal from "@/components/ApplyPlayerModal";

import RemovePlayerModal from "@/components/RemovePlayerModal";
import WarteMeldung from "@/components/WarteMeldung";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";

export default function Home() {

	const [players, setPlayers] = useState([]);
	const [playersApplies, setPlayersApplies] = useState([]);
	const [maxPlayers, setMaxPlayers] = useState(-1)
	const [showModal, setShowModal] = useState(false);

	const {isOpen, onOpen, onOpenChange} = useDisclosure();

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

					<PlayerTables nameOfTable="Angemeldete Spieler" startRange={0} endRange={maxPlayers}
								  columns={columns} rows={playersApplies}/>
					<PlayerTables nameOfTable="Nachrücker" startRange={maxPlayers} endRange={100} columns={columns}
								  rows={playersApplies}/>

					<Button onPress={onOpen} color="primary" variant="ghost">Liste aller Spieler im Textformat zum Kopieren</Button>
					<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">Liste der Namen</ModalHeader>
									<ModalBody>
										<ul>
											{playersApplies.map((item:any) => (
												<li key={item.id}>
													{item.vorname} {item.nachname}
												</li>
											))}
										</ul>
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="light" onPress={onClose}>
											Close
										</Button>
										<Button color="primary" onPress={onClose}>
											Action
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>

					{/*<PlayerExportModal data={[]}/>*/}

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
