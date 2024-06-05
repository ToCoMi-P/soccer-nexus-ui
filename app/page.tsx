"use client"
import React, {useEffect, useState} from "react";
import PlayerTables from "@/components/PlayerTables";
import {Select, SelectItem} from "@nextui-org/react";
import ApplyPlayerModal from "@/components/ApplyPlayerModal";
import RemovePlayerModal from "@/components/RemovePlayerModal";
import WarteMeldung from "@/components/WarteMeldung";

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

        fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/players`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPlayers(data)
            })

        fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/playersappliesnextmonday`)
            .then(response => response.json())
            .then(data => {
                setPlayersApplies(data)

                // TODO: wenn grenze der Nachrücker angepasst wird, sollte sich auch der Datensatz dementsprechend anpassen
                let count = 0;
                for (let obj of data) {
                    obj.count = ++count
                    if (count == maxPlayers) {
                        count = 0
                    }
                    obj.vorname = obj.player.vorname
                    obj.nachname = obj.player.nachname
                }
            })
    }, [maxPlayers])

    // TODO: Type vom Parameter konkretisieren
    function setLimit(event: any) {
        setMaxPlayers(event.target.value)
    }


    const columns = [
        {
            key: "count",
            label: "#"
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
                <WarteMeldung/>
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
                <PlayerTables nameOfTable="Angemeldete Spieler" startRange={0} endRange={maxPlayers} columns={columns}
                              rows={playersApplies}/>
                <PlayerTables nameOfTable="Nachrücker" startRange={maxPlayers} endRange={100} columns={columns}
                              rows={playersApplies}/>
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
