"use client"

import * as React from "react"
import { useState, FormEvent } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import router from "next/router"

type Player = {
  id: string
  vorname: string
  nachname: string
}

export default function ApplyPlayerModal({ players }: { players: Player[] }) {
  const [open, setOpen] = useState(false)
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    // ausgewählte Spieler ids hinzufügen
    selectedPlayers.forEach((id) => formData.append("selectedPlayers", id))

    await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + "/playersapplies",
      {
        method: "POST",
        body: formData,
      }
    )



    window.location.reload()
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="text-xs sm:text-sm font-medium"
        size="sm"
        aria-label="Spieler anmelden"
      >
        Anmelden
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-sm">
          <form onSubmit={onSubmit}>
            <DialogHeader className="border-b border-gray-200 dark:border-gray-700 p-3">
              <DialogTitle className="text-sm sm:text-base font-bold">
                Spieler anmelden
              </DialogTitle>
            </DialogHeader>

            <div className="p-3 space-y-2">
              {/* Label manuell, da shadcn-Select selbst kein label-Prop hat */}
              <label className="text-xs sm:text-sm font-medium">
                Spieler auswählen
              </label>

              {/* Einfaches Multi-Select mit Dropdown + Chips / Text */}
              <Select
                // shadcn-Select unterstützt von Haus aus kein echtes multiple,
                // daher: eigener State + einfache Lösung über Komma-getrennten String
                // oder nur eine Auswahl zulassen, hier Workaround:
                onValueChange={(value) => {
                  setSelectedPlayers((prev) =>
                    prev.includes(value)
                      ? prev.filter((id) => id !== value)
                      : [...prev, value]
                  )
                }}
              >
                <SelectTrigger className="w-full text-xs sm:text-sm">
                  <SelectValue placeholder="Spieler auswählen" />
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

              {/* Anzeige der aktuell gewählten Spieler */}
              {selectedPlayers.length > 0 && (
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Ausgewählt:{" "}
                  {players
                    .filter((p) => selectedPlayers.includes(p.id))
                    .map((p) => `${p.vorname} ${p.nachname}`)
                    .join(", ")}
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
                size="sm"
                className="text-xs sm:text-sm"
                aria-label="Spieler anmelden"
              >
                Anmelden
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
