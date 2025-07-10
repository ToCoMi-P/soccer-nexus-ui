"use client";

import React, { FormEvent, useEffect, useState } from "react";
import WarteMeldung from "@/components/WarteMeldung";
import { Button, Select, SelectItem } from "@heroui/react";

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
      body: formData
    });

    window.location.reload();
  }

  if (maxPlayers === null) return <WarteMeldung />;

  return (
    <div className="w-full p-3 sm:p-4 md:p-6 max-w-md mx-auto">
      <div className="bg-gray-800/90 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-white mb-4 text-center">Admin Einstellungen</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <Select
            label="Grenze der Nachrücker"
            name="maxPlayers"
            selectedKeys={[selectedPlayers]}
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0];
              if (key) setSelectedPlayers(key.toString());
            }}
            className="w-full"
            size="sm"
            aria-label="Maximale Spieleranzahl auswählen"
          >
            {[15, 18, 20, 22, 24, 26, 30, 36].map((num) => (
              <SelectItem key={String(num)} value={String(num)} textValue={`${num} Spieler`} className="text-xs sm:text-sm">
                {num} Spieler
              </SelectItem>
            ))}
          </Select>

          <div className="flex justify-center pt-2">
            <Button color="primary" type="submit" className="text-xs sm:text-sm font-medium" size="sm" aria-label="Einstellungen speichern">
              Einstellungen speichern
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
