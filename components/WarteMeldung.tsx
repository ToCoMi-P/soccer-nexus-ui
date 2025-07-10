import { Spinner } from "@heroui/react";

export default function WarteMeldung() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 p-4 sm:p-6 text-center max-w-md mx-auto">
      <Spinner size="md" color="primary" aria-label="Ladeindikator" />
      <div className="space-y-1">
        <h2 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">Spielerdaten werden geladen...</h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Bitte warte einen Moment, während die Spielerdaten geladen werden. Falls die Daten nicht innerhalb von 1-2 Minuten erscheinen, lade die Seite bitte neu.</p>
      </div>
    </div>
  );
}
