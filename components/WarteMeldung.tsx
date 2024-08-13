import { Divider } from "@nextui-org/react";
import React from "react";

export default function WarteMeldung() {
  return (
    <>
      <div>
        <h1>Auf der Seite {"Spielerliste"} schauen, ob alle bereits registrierten Spieler schon geladen worden sind. Falls nicht, erstmal 1-2 mins warten und erst dann sich erstmalig registrieren oder für den kommenden Montag sich an- oder abmelden </h1>
      </div>
      <Divider className="my-4" />
    </>
  );
}
