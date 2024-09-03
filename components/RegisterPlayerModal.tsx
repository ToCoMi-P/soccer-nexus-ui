import React, {createElement, FormEvent, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select, SelectItem, Autocomplete, AutocompleteItem, Input
} from "@nextui-org/react";
import Players from "@/app/lib/supabase/API/Players";

export default function RegisterPlayerModal() {


    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    //const maxPlayersToSelect = 10;
    //const maxPlayerNumberToSelect = [...Array(maxPlayersToSelect).keys()].slice(1, maxPlayersToSelect)



    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const vornameInput: any = document.getElementById('Vorname')
        const nachnameInput: any = document.getElementById('Nachname')

        if(vornameInput.value && nachnameInput.value) {
            const test = {vorname: vornameInput.value, nachname: nachnameInput.value}
            console.log(test)
            console.log(Players.addPlayer(test));
        }


        /*const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/players', {
            method: 'POST',
            body: formData,
        })*/

       //window.location.reload();
    }


    return (
        <section>
            <div>
                <Button color="primary" variant="ghost" onPress={onOpen}>
                    Spieler registrieren
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Spieler anmelden</ModalHeader>
                                <form onSubmit={onSubmit}>
                                    <ModalBody>
                                            <Input id={"Vorname"} label="Vorname" placeholder="Dein Vorname" name="vorname"/>
                                            <Input id={"Nachname"} label="Nachname" placeholder="Dein Nachname" name="nachname" />

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" onPress={onClose} variant="ghost">
                                            Abbrechen
                                        </Button>
                                        <Button color="primary" variant="ghost" type="submit">
                                            Spieler registrieren
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

