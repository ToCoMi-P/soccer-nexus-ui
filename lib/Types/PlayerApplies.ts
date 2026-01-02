export type PlayerApplies = {
  id: number
  vorname: string
  nachname: string
  count: number
  instant: string
}

export type PlayerAppliesDTO = {
  player: {
    id: number
    vorname: string
    nachname: string
  }
  instant: string
}

export type MaxPlayersResponse = {
  maxPlayers: number
}


export class PlayerAppliesUtlity {
  static convertDTOToType(playerObject: PlayerAppliesDTO[]): PlayerApplies[] {

    console.log(playerObject)

    let count = 0;
    return playerObject.map((obj) => {
      const test: PlayerApplies = {  // ← NEUES Objekt pro map-Iteration!
        id: obj.player.id,
        count: ++count,
        vorname: obj.player.vorname,
        nachname: obj.player.nachname,
        instant: obj.instant
      };
      
      //if (count === maxPlayers) count = 0;
      return test;
    });
  }
}