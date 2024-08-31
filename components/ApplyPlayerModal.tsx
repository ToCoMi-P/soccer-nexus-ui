import React, {createElement, FormEvent, useEffect, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select, SelectItem, Autocomplete, AutocompleteItem
} from "@nextui-org/react";
import Players from "@/app/lib/supabase/API/Players";
import Player_Applies from "@/app/lib/supabase/API/Player_Applies";

export default function ApplyPlayerModal(players: any) {

    const [selectedPlayers, setSelectedPlayers] = useState(null)

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const iter = formData.values();
        let playerIdList = [];
        // @ts-ignore
        for(var id of iter){
            playerIdList.push(id)
        }

        Player_Applies.addPlayerApplies(playerIdList)

        window.location.reload();
    }


    return (
        <section>
            <div>
                <Button color="primary" variant="ghost" onPress={onOpen}>
                    Anmelden
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <form onSubmit={onSubmit}>
                                    <ModalHeader className="flex flex-col gap-1">Spieler anmelden</ModalHeader>
                                    <ModalBody>

                                        <Select selectionMode="multiple" name="selectedPlayers">
                                            {players.players.map((player:any) => {
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
                                            Anmelden
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

