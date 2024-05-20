"use client";

import React, {createElement, FormEvent, useEffect, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select, SelectItem, Autocomplete, AutocompleteItem, Tooltip
} from "@nextui-org/react";
import {map} from "yaml/dist/schema/common/map";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;
import {DeleteIcon} from "@/components/icons";

export default function RemovePlayerModal(players: any) {


    console.log("players applic modeal")

    //const [selectPlayerNumber, setValue] = useState()
    //const [selectPlayerNumberList, changeTheList] = useState([])
    const [selectedPlayers, setSelectedPlayers] = useState(null)


    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    //const maxPlayersToSelect = 10;
    //const maxPlayerNumberToSelect = [...Array(maxPlayersToSelect).keys()].slice(1, maxPlayersToSelect)

    const BASE_URL = "http://localhost:8080";

    /*const [players, setPlayers] = useState([]);

    useEffect(() => {

        fetch( `${BASE_URL}/playersapplies`)
            .then(response => response.json())
            .then(data => {
                setPlayers(data)
            })
    }, [])*/

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(event.currentTarget)
        const formData = new FormData(event.currentTarget)
        console.log(formData)

        const response = await fetch('http://localhost:8080/removeplayer', {
            method: 'POST',
            body: formData,
        })

        window.location.reload();
    }


    return (
        <section>
            <div>
                <Button color="danger" variant="ghost" onPress={onOpen}>
                    Spieler abmelden
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <form onSubmit={onSubmit}>
                                    <ModalHeader className="flex flex-col gap-1">Spieler löschen</ModalHeader>
                                    <ModalBody>

                                        <Select selectionMode="multiple" name="selectedPlayers">
                                            {players.players.map((player: any) => {
                                                return <SelectItem key={player.id}  value={`${player.vorname} ${player.nachname}`}>{`${player.vorname} ${player.nachname}`}</SelectItem>;
                                            })}
                                        </Select>




                                        {/*Vorname
                                    <Autocomplete>
                                        <AutocompleteItem>Tommy</AutocompleteItem>
                                        <AutocompleteItem>Henry</AutocompleteItem>
                                    </Autocomplete>

                                    Nachname
                                    <Autocomplete>
                                        <AutocompleteItem>Tran</AutocompleteItem>
                                        <AutocompleteItem>Bergmann</AutocompleteItem>
                                    </Autocomplete>*/}



                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" onPress={onClose} variant="ghost">
                                            Abbrechen
                                        </Button>
                                        <Button color="primary" type="submit" variant="ghost">
                                            Löschen
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </section>
    );
}

