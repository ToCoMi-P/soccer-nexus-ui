"use client"

import React, {FormEvent, useEffect, useState} from "react";
import RegisterPlayerModal from "@/components/RegisterPlayerModal";
import PlayerTables from "@/components/PlayerTables";
import WarteMeldung from "@/components/WarteMeldung";
import {Button, Select, SelectItem} from "@nextui-org/react";

export default function RegisterNewPlayerPage() {

	const [maxPlayers, setMaxPlayers] = useState(-1)

	useEffect(() => {
		
	}, [])

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		console.log(event.currentTarget)
		console.log(formData)
		const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/admin/maxPlayers', {
			method: 'POST',
			body: formData,
		})

		window.location.reload();
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<Select
					label="Grenze der Nachrücker"
					className="max-w-full mx-28 my-28"
					name={"maxPlayers"}
					defaultSelectedKeys={[15]}
				>
					<SelectItem key={15}>15</SelectItem>
					<SelectItem key={18}>18</SelectItem>
					<SelectItem key={24}>24</SelectItem>
					<SelectItem key={26}>26</SelectItem>
					<SelectItem key={30}>30</SelectItem>
					<SelectItem key={36}>36</SelectItem>
				</Select>
				<Button color="primary" type="submit" variant="ghost">
					Maximale Spieleranzahl abändern
				</Button>
			</form>
		</div>
);
}
