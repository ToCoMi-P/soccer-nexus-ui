"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Player = {
  id: string;
  vorname: string;
  nachname: string;
};

export default function RemovePlayerModal({ players }: { players: Player[] }) {
  const [open, setOpen] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Ausgewählte Spieler IDs hinzufügen
    selectedPlayers.forEach((id) => formData.append("selectedPlayers", id));

    await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/removeplayer", {
      method: "POST",
      body: formData,
    });

    window.location.reload();
  }

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setOpen(true)}
        className="text-xs sm:text-sm font-medium"
        size="sm"
        aria-label="Spieler abmelden"
      >
        Abmelden
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-sm">
          <form onSubmit={onSubmit}>
            <DialogHeader className="border-b border-gray-200 dark:border-gray-700 p-3">
              <DialogTitle className="text-sm sm:text-base font-bold">
                Spieler abmelden
              </DialogTitle>
            </DialogHeader>

            <div className="p-3 space-y-2">
              <Label className="text-xs sm:text-sm font-medium">
                Spieler auswählen
              </Label>
              
              {/* Multi-Select Workaround (shadcn hat kein natives multiple) */}
              <Select
                onValueChange={(value) => {
                  setSelectedPlayers((prev) =>
                    prev.includes(value)
                      ? prev.filter((id) => id !== value)
                      : [...prev, value]
                  );
                }}
              >
                <SelectTrigger className="w-full text-xs sm:text-sm">
                  <SelectValue placeholder="Spieler auswählen (klicke mehrmals zum Toggle)" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((player) => (
                    <SelectItem
                      key={player.id}
                      value={player.id}
                      className="text-xs sm:text-sm"
                    >
                      {player.vorname} {player.nachname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Anzeige ausgewählter Spieler */}
              {selectedPlayers.length > 0 && (
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Ausgewählt: {selectedPlayers.length} Spieler
                </div>
              )}
            </div>

            <DialogFooter className="border-t border-gray-200 dark:border-gray-700 p-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
                aria-label="Abbrechen"
                onClick={() => setOpen(false)}
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                variant="destructive"
                size="sm"
                className="text-xs sm:text-sm"
                disabled={selectedPlayers.length === 0}
                aria-label="Spieler abmelden"
              >
                Abmelden
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
