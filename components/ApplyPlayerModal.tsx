import React, { FormEvent } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem } from "@heroui/react";

export default function ApplyPlayerModal({ players }: { players: any[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/playersapplies", {
      method: "POST",
      body: formData
    });

    window.location.reload();
  }

  return (
    <>
      <Button color="primary" variant="solid" onPress={onOpen} className="text-xs sm:text-sm font-medium" size="sm" aria-label="Spieler anmelden">
        Anmelden
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} placement="center" className="max-w-[95vw]" size="sm">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={onSubmit}>
              <ModalHeader className="border-b border-gray-200 dark:border-gray-700 p-3">
                <h3 className="text-sm sm:text-base font-bold">Spieler anmelden</h3>
              </ModalHeader>
              <ModalBody className="p-3">
                <Select selectionMode="multiple" name="selectedPlayers" label="Spieler auswählen" labelPlacement="outside" placeholder="Spieler auswählen" className="max-w-full" size="sm" aria-label="Spieler auswählen">
                  {players.map((player) => (
                    <SelectItem key={player.id} textValue={`${player.vorname} ${player.nachname}`} className="text-xs sm:text-sm">
                      {`${player.vorname} ${player.nachname}`}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter className="border-t border-gray-200 dark:border-gray-700 p-2">
                <Button color="danger" variant="light" onPress={onClose} size="sm" className="text-xs sm:text-sm" aria-label="Abbrechen">
                  Abbrechen
                </Button>
                <Button color="primary" type="submit" size="sm" className="text-xs sm:text-sm" aria-label="Spieler anmelden">
                  Anmelden
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
