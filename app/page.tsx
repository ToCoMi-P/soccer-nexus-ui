"use client";
import React, { useEffect, useState } from "react";
import PlayerTables from "@/components/PlayerTables";
import ApplyPlayerModal from "@/components/ApplyPlayerModal";
import RemovePlayerModal from "@/components/RemovePlayerModal";
import WarteMeldung from "@/components/WarteMeldung";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Spinner } from "@heroui/react";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [playersApplies, setPlayersApplies] = useState([]);
  const [maxPlayers, setMaxPlayers] = useState(-1);
  const [copyStatus, setCopyStatus] = useState<{ success: boolean; count: number } | null>(null);
  const [isCopying, setIsCopying] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/players`)
      .then((response) => response.json())
      .then((data) => setPlayers(data));

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/admin/maxPlayers`)
      .then((response) => response.json())
      .then((data) => setMaxPlayers(data.maxPlayers));

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/playersappliesnextmonday`)
      .then((response) => response.json())
      .then((data) => {
        let count = 0;
        const processedData = data.map((obj: any) => {
          obj.count = ++count;
          if (count === maxPlayers) count = 0;
          obj.vorname = obj.player.vorname;
          obj.nachname = obj.player.nachname;
          return obj;
        });
        setPlayersApplies(processedData);
      });
  }, [maxPlayers]);

  const columns = [
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
    {
      key: "instant",
      label: "ANGEMELDET AM",
      class: "min-w-[100px] sm:min-w-[120px] text-xs sm:text-sm",
      ariaLabel: "Anmeldezeitpunkt"
    }
  ];

  const copyRegisteredPlayers = async () => {
    if (!playersApplies.length) return;

    setIsCopying(true);
    setCopyStatus(null);

    try {
      // Nur angemeldete Spieler (ohne Nachrücker)
      const registeredPlayers = playersApplies.slice(0, maxPlayers);
      const playerNames = registeredPlayers.map((p) => `${p.vorname} ${p.nachname}`).join("\n");

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
    <div className="w-full px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto" role="main" aria-label="Fußball Anmeldeseite">
      <header className="w-full py-3 sm:py-4 md:py-6 text-center">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">FUSSBALL ANMELDUNG</span>
        </h1>
        <div className="text-xs sm:text-sm md:text-base text-gray-200 mb-3 sm:mb-4">
          Grenze der Nachrücker:
          <span className="ml-1 sm:ml-2 px-2 py-1 bg-green-600 rounded-full text-white font-bold text-xs sm:text-sm">{maxPlayers}</span>
        </div>
      </header>

      <section className="w-full space-y-3 sm:space-y-4 md:space-y-6 pb-6 md:pb-8">
        <div className="w-full flex flex-col xs:flex-row gap-2 sm:gap-3 justify-center mb-3 sm:mb-4">
          <ApplyPlayerModal players={players} />
          <RemovePlayerModal players={players} />
        </div>

        <div className="w-full grid gap-3 sm:gap-4 md:gap-6">
          <div className="w-full bg-gray-800/90 rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg border-l-4 border-green-500">
            <PlayerTables nameOfTable="ANGEMELDETE SPIELER" startRange={0} endRange={maxPlayers} columns={columns} rows={playersApplies} />
          </div>

          <div className="w-full bg-gray-800/90 rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg border-l-4 border-blue-500">
            <PlayerTables nameOfTable="NACHRÜCKER" startRange={maxPlayers} endRange={100} columns={columns} rows={playersApplies} />
          </div>
        </div>

        <div className="w-full text-center mt-3 sm:mt-4 space-y-2">
          <div className="flex flex-col items-center gap-2">
            <Button onPress={onOpen} color="primary" variant="shadow" className="w-full max-w-xs sm:max-w-sm bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-2 sm:py-3 px-4 rounded-lg hover:scale-[1.02] transition-transform text-xs sm:text-sm" size="sm">
              Spielerliste anzeigen
            </Button>

            <Button onPress={copyRegisteredPlayers} color="secondary" variant="shadow" className="w-full max-w-xs sm:max-w-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 sm:py-3 px-4 rounded-lg hover:scale-[1.02] transition-transform text-xs sm:text-sm" size="sm" disabled={isCopying}>
              {isCopying ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" /> Kopiere...
                </div>
              ) : (
                "Angemeldete Spieler kopieren"
              )}
            </Button>
          </div>

          {copyStatus && <div className={`py-2 px-4 rounded-lg ${copyStatus.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{copyStatus.success ? <span>✅ {copyStatus.count} Spieler wurden kopiert!</span> : <span>❌ Kopieren fehlgeschlagen. Bitte manuell kopieren.</span>}</div>}

          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" scrollBehavior="inside" className="max-w-[100vw]">
            <ModalContent className="bg-gray-800/95 text-white max-h-[80vh]">
              {(onClose) => (
                <>
                  <ModalHeader className="border-b border-gray-700 p-3 sm:p-4">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-center w-full">Spielerliste</h2>
                  </ModalHeader>
                  <ModalBody className="p-0 overflow-y-auto">
                    <div className="divide-y divide-gray-700">
                      <div className="p-3 sm:p-4 bg-gray-700/50">
                        <h3 className="font-bold text-green-400 text-sm sm:text-base">ANGEMELDETE SPIELER ({playersApplies.slice(0, maxPlayers).length})</h3>
                      </div>
                      {playersApplies.slice(0, maxPlayers).map((item: any) => (
                        <div key={`active-${item.id}`} className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-700 transition-colors flex items-center">
                          <span className="font-bold w-8 text-center">{item.count}.</span>
                          <span>
                            {item.vorname} {item.nachname}
                          </span>
                        </div>
                      ))}

                      <div className="p-3 sm:p-4 bg-gray-700/50">
                        <h3 className="font-bold text-blue-400 text-sm sm:text-base">NACHRÜCKER ({playersApplies.slice(maxPlayers).length})</h3>
                      </div>
                      {playersApplies.slice(maxPlayers).map((item: any, index: number) => (
                        <div key={`waiting-${item.id}`} className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-700 transition-colors flex items-center">
                          <span className="font-bold w-8 text-center">{index + 1}.</span>
                          <span>
                            {item.vorname} {item.nachname}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ModalBody>
                  <ModalFooter className="border-t border-gray-700 p-2 sm:p-3 flex justify-center gap-2 sm:gap-3">
                    <Button color="danger" variant="light" onPress={onClose} className="font-bold text-xs sm:text-sm px-3 sm:px-4" size="sm">
                      Schließen
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </section>
    </div>
  );
}
