"use client"

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

export default function RegisterPlayerModal() {


    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    //const maxPlayersToSelect = 10;
    //const maxPlayerNumberToSelect = [...Array(maxPlayersToSelect).keys()].slice(1, maxPlayersToSelect)



    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'players', {
            method: 'POST',
            body: formData,
        })

        window.location.reload();


        // Handle response if necessary
        const data = await response.json()
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
                                            <Input label="Vorname" placeholder="Dein Vorname" name="vorname"/>
                                            <Input label="Nachname" placeholder="Dein Nachname" name="nachname" />

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

