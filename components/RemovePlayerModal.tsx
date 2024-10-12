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

export default function RemovePlayerModal(players: any) {

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

        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/removeplayer', {
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
                                    <ModalHeader className="flex flex-col gap-1">Spieler abmelden</ModalHeader>
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

