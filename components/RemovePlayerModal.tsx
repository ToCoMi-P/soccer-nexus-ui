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
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/multi-select";
import { Player } from "@/lib/Types/Player";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function RemovePlayerModal({ players }: { players: Player[] }) {
  const [open, setOpen] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    //selectedPlayers.forEach((id) => formData.append("selectedPlayers", id))

    formData.append("selectedPlayers", selectedPlayers)

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
              
              <Select value={selectedPlayers} onValueChange={setSelectedPlayers}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Spieler auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {players.map(p => (
                    <SelectItem key={p.id} value={String(p.id)}>{p.vorname} {p.nachname}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
