"use client";

import React, { FormEvent, useEffect, useState } from "react";
import WarteMeldung from "@/components/WarteMeldung";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminPage() {
  const [maxPlayers, setMaxPlayers] = useState<number | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<string>("");

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/admin/maxPlayers`)
      .then((response) => response.json())
      .then((data) => {
        setMaxPlayers(data.maxPlayers);
        setSelectedPlayers(String(data.maxPlayers));
      });
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("maxPlayers", selectedPlayers);

    await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/maxPlayers", {
      method: "POST",
      body: formData,
    });

    window.location.reload();
  }

  if (maxPlayers === null) return <WarteMeldung />;

  return (
    <div className="w-full p-3 sm:p-4 md:p-6 max-w-md mx-auto">
      <div className="bg-background/90 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-4 text-center">
          Admin Einstellungen
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Grenze der Nachrücker
            </label>
            <Select
              value={selectedPlayers}
              onValueChange={setSelectedPlayers}
              className="w-full"
            >
              <SelectTrigger className="text-xs sm:text-sm">
                <SelectValue placeholder="Spieleranzahl auswählen" />
              </SelectTrigger>
              <SelectContent>
                {[15, 18, 20, 22, 24, 26, 30, 36].map((num) => (
                  <SelectItem
                    key={String(num)}
                    value={String(num)}
                    className="text-xs sm:text-sm"
                  >
                    {num} Spieler
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              type="submit"
              className="text-xs sm:text-sm font-medium"
              size="sm"
              aria-label="Einstellungen speichern"
            >
              Einstellungen speichern
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
