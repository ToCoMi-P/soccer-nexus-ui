/*
import React from "react";
import {Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/react";

const PEModal = ({ data }) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div>
            {/!*<Button onPress={onOpen} color="primary" variant="ghost">Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <h2>Liste der Namen</h2>
                                <ul>
                                    {data.map((item:any) => (
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
            </Modal>*!/}

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

    );
};

export default PEModal;*/
