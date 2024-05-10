"use client";

import React, {createElement, useState} from "react";
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
import {map} from "yaml/dist/schema/common/map";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

export default function RegisterPlayerModal() {

    //const [selectPlayerNumber, setValue] = useState()
    //const [selectPlayerNumberList, changeTheList] = useState([])
    const [player] = useState({
        vorname: "",
        nachname: "",
    })


    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const maxPlayersToSelect = 10;
    const maxPlayerNumberToSelect = [...Array(maxPlayersToSelect).keys()].slice(1, maxPlayersToSelect)



    /*function handleSelect(event){
        setValue(event.target.value)

    }

    function addPlayer(event){
        event.preventDefault()
        //changeTheList(event)
        console.log(selectPlayerNumber)
        return changeTheList([...selectPlayerNumberList, 10]);
    }*/

    const addPlayerSubmit = (e) => {
        // We don't want the page to refresh
        e.preventDefault()

        const formURL = e.target.action
        const data = new FormData()

        // Turn our formData state into data we can use with a form submission
        Object.entries(player).forEach(([key, value]) => {
            data.append(key, value);
        })

        // POST the data to the URL of the form
        fetch(formURL, {
            method: "POST",
            body: data,
            headers: {
                'accept': 'application/json',
            },
        }).then(() => {
            /*setFormData({
                name: "",
                email: "",
                message: ""
            });*/
        })

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
                                <ModalHeader className="flex flex-col gap-1">Spieler anmelden</ModalHeader>
                                <ModalBody>

                                    {/*<Button color="primary" onPress={addPlayer} variant="ghost">
                                        Spieler hinzufügen
                                    </Button>

                                    <Select onChange={handleSelect}>
                                        {maxPlayerNumberToSelect.map((n) => (
                                            <SelectItem key={n} value={n}>
                                                {""+n}
                                            </SelectItem>
                                        ))}
                                    </Select>*/}

                                    Vorname
                                    <Autocomplete>
                                        <AutocompleteItem>Tommy</AutocompleteItem>
                                        <AutocompleteItem>Henry</AutocompleteItem>
                                    </Autocomplete>

                                    Nachname
                                    <Autocomplete>
                                        <AutocompleteItem>Tran</AutocompleteItem>
                                        <AutocompleteItem>Bergmann</AutocompleteItem>
                                    </Autocomplete>



                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose} variant="ghost">
                                        Abbrechen
                                    </Button>
                                    <Button color="primary" onPress={addPlayerSubmit} variant="ghost">
                                        Anmelden
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </section>
    );
}

