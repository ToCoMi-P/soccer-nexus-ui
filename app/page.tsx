"use client";
import React, { useEffect, useState } from "react";
import PlayerTables, { ColumnConfig } from "@/components/PlayerTables"; // Entkommentiert
import ApplyPlayerModal from "@/components/ApplyPlayerModal";
import RemovePlayerModal from "@/components/RemovePlayerModal";
import WarteMeldung from "@/components/WarteMeldung";
import { PlayerService } from "@/lib/RESTServices/PlayerService";
import { Button } from "@/components/ui/button";
import { AdminService } from "@/lib/RESTServices/AdminService";
import { PlayerAppliesService } from "@/lib/RESTServices/PlayerAppliesService";
import { Player } from "@/lib/Types/Player";
import { PlayerApplies, PlayerAppliesDTO, PlayerAppliesUtlity } from "@/lib/Types/PlayerApplies";
import { Admin } from "@/lib/Types/Admin";
import { MatchInfo } from "@/components/MatchInfo";

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersApplies, setPlayersApplies] = useState<PlayerApplies[]>([]);
  const [maxPlayers, setMaxPlayers] = useState(-1);
  const [copyStatus, setCopyStatus] = useState<{ success: boolean; count: number } | null>(null);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    PlayerService.getPlayers().then((players) => setPlayers(players));

    AdminService.getMaxPlayers().then((data: Admin) => setMaxPlayers(data.maxPlayers));

    PlayerAppliesService.getPlayersNextMonday().then((data: PlayerAppliesDTO[]) => {

        const processedData: PlayerApplies[] = PlayerAppliesUtlity.convertDTOToType(data)
        setPlayersApplies(processedData);
      })
  }, [maxPlayers]);

  const columns: ColumnConfig[] = [
    {
      key: "count",
      label: "NR",
      class: "w-[40px] sm:w-[50px] font-bold text-center",
      ariaLabel: "Spielernummer"
    },
    {
      key: "vorname",
      label: "VORNAME",
      class: "min-w-[80px] sm:min-w-[100px] font-semibold",
      ariaLabel: "Vorname des Spielers"
    },
    {
      key: "nachname",
      label: "NACHNAME",
      class: "min-w-[80px] sm:min-w-[100px] font-semibold",
      ariaLabel: "Nachname des Spielers"
    },
    // In Home.tsx - columns Definition:
    {
      key: "instant",
      label: "ANGEMELDET AM",
      class: "w-[90px] sm:w-[120px] md:w-[140px] text-xs sm:text-sm **leading-tight** **whitespace-pre-line**",
      ariaLabel: "Anmeldezeitpunkt"
    }

  ];

  const copyRegisteredPlayers = async () => {
    if (!playersApplies.length) return;

    setIsCopying(true);
    setCopyStatus(null);

    try {
      const registeredPlayers = playersApplies.slice(0, maxPlayers);
      const playerNames = registeredPlayers.map((p: PlayerApplies) => `${p.vorname} ${p.nachname}`).join("\n");

      await navigator.clipboard.writeText(playerNames);

      setCopyStatus({
        success: true,
        count: registeredPlayers.length
      });
    } catch (err) {
      setCopyStatus({
        success: false,
        count: 0
      });
    } finally {
      setIsCopying(false);
      setTimeout(() => setCopyStatus(null), 3000);
    }
  };

  if (players.length === 0 || maxPlayers === -1) return <WarteMeldung />;

  return (
      <div className="min-h-screen bg-background px-2 py-4 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto" role="main" aria-label="Fußball Anmeldeseite">
        <header className="w-full py-4 sm:py-6 md:py-8 text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              FUSSBALL ANMELDUNG
            </span>
          </h1>
          <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
            maximale Spieleranzahl:
            <span className="ml-2 px-3 py-1 bg-green-600 rounded-full text-white font-bold text-xs sm:text-sm">
              {maxPlayers}
            </span>
          </div>
        </header>

        <div className="pb-8 md:pb-12">  {/* ← Abstand UNTEN! */}
          <MatchInfo 
            ort="Aloha Halle" 
            anstosszeit="18:30" 
            treffzeit="18:15" 
          />
        </div>

        

        <section className="w-full space-y-4 sm:space-y-6 md:space-y-8 pb-8 sm:pb-12">
          {/* Buttons - FULL WIDTH auf Handy */}
          <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
            <ApplyPlayerModal players={players} />
            <RemovePlayerModal players={players} />
          </div>

          {/* Tables - Responsive Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="w-full bg-background/90 rounded-xl p-3 sm:p-4 shadow-lg border border-border border-l-4 border-green-500 min-h-[200px]">
              <PlayerTables 
                nameOfTable="ANGEMELDETE SPIELER" 
                startRange={0} 
                endRange={maxPlayers} 
                rows={playersApplies} 
                columns={columns}
              />
            </div>

            <div className="w-full bg-background/90 rounded-xl p-3 sm:p-4 shadow-lg border border-border border-l-4 border-blue-500 min-h-[200px]">
              <PlayerTables 
                nameOfTable="NACHRÜCKER" 
                startRange={maxPlayers} 
                endRange={100} 
                rows={playersApplies}
                columns={columns}
              />
            </div>
          </div>

          {/* Action Buttons - Center & Full Width auf Handy */}
          <div className="w-full flex flex-col items-center gap-4 mt-8 sm:mt-12">
            <Button 
              onClick={copyRegisteredPlayers} 
              className="w-full max-w-sm sm:max-w-md bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm sm:text-base shadow-lg disabled:opacity-50" 
              size="lg" 
              disabled={isCopying}
            >
              {isCopying ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Kopiere...
                </div>
              ) : (
                "Angemeldete Spieler kopieren"
              )}
            </Button>
            
            {copyStatus && (
              <div className={`w-full max-w-sm sm:max-w-md py-3 px-4 rounded-xl text-sm shadow-md ${
                copyStatus.success 
                  ? "bg-green-500/20 text-green-400 border-2 border-green-500/30" 
                  : "bg-destructive/20 text-destructive border-2 border-destructive/30"
              }`}>
                {copyStatus.success 
                  ? `✅ ${copyStatus.count} Spieler kopiert!` 
                  : `❌ Kopieren fehlgeschlagen.`
                }
              </div>
            )}
          </div>
        </section>
      </div>
    );
}
