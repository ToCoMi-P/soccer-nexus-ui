import React, { FormEvent } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

export default function RegisterPlayerModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/players", {
      method: "POST",
      body: formData
    });

    window.location.reload();
  }

  return (
    <>
      <Button color="primary" variant="solid" onPress={onOpen} className="text-xs sm:text-sm font-medium" size="sm" aria-label="Neuen Spieler registrieren">
        Neue Spieler registrieren
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} placement="center" className="max-w-[95vw]" size="sm">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={onSubmit}>
              <ModalHeader className="border-b border-gray-200 dark:border-gray-700 p-3">
                <h3 className="text-sm sm:text-base font-bold">Neuen Spieler registrieren</h3>
              </ModalHeader>
              <ModalBody className="p-3 gap-2">
                <Input label="Vorname" placeholder="Vorname eingeben" name="vorname" isRequired size="sm" className="text-xs sm:text-sm" aria-label="Vorname des Spielers" />
                <Input label="Nachname" placeholder="Nachname eingeben" name="nachname" isRequired size="sm" className="text-xs sm:text-sm" aria-label="Nachname des Spielers" />
              </ModalBody>
              <ModalFooter className="border-t border-gray-200 dark:border-gray-700 p-2">
                <Button color="danger" variant="light" onPress={onClose} size="sm" className="text-xs sm:text-sm" aria-label="Abbrechen">
                  Abbrechen
                </Button>
                <Button color="primary" type="submit" size="sm" className="text-xs sm:text-sm" aria-label="Spieler registrieren">
                  Registrieren
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
