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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPlayerModal() {
  const [open, setOpen] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/players", {
      method: "POST",
      body: formData,
    })

    window.location.reload()
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="text-xs sm:text-sm font-medium"
        size="sm"
        aria-label="Neuen Spieler registrieren"
      >
        Neue Spieler registrieren
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-sm">
          <form onSubmit={onSubmit}>
            <DialogHeader className="border-b border-gray-200 dark:border-gray-700 p-3">
              <DialogTitle className="text-sm sm:text-base font-bold">
                Neuen Spieler registrieren
              </DialogTitle>
            </DialogHeader>

            <div className="p-3 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vorname" className="text-xs sm:text-sm font-medium">
                  Vorname
                </Label>
                <Input
                  id="vorname"
                  name="vorname"
                  placeholder="Vorname eingeben"
                  required
                  className="text-xs sm:text-sm h-9"
                  aria-label="Vorname des Spielers"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nachname" className="text-xs sm:text-sm font-medium">
                  Nachname
                </Label>
                <Input
                  id="nachname"
                  name="nachname"
                  placeholder="Nachname eingeben"
                  required
                  className="text-xs sm:text-sm h-9"
                  aria-label="Nachname des Spielers"
                />
              </div>
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
                aria-label="Spieler registrieren"
              >
                Registrieren
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
