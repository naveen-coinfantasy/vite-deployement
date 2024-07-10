import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useJoinGameContract } from "./hooks/useJoinGameContract";
import { toNano } from "@ton/core";
import { useState } from "react";

function App() {
  const { address, joinUserGame, createGame, getGame, setMap, getMap, getStructure, setStructure, setTesting, getTesing } =
    useJoinGameContract();
  const [gameId, setGameId] = useState(0);
  return (
    <div>
      {address}
      <TonConnectButton />
      <button onClick={() => setTesting(1000)}>set Testing</button>
      <button onClick={async () => { const a = await getTesing(1000);
        console.log(a)
        console.log(a?.size);
        console.log(a?.get(BigInt(9001)));
        // console.log(a?.get(BigInt(9001)));
       }}>get Testing</button>
      {/* <button onClick={() => setStructure(1000)}>set Struct</button>
      <button onClick={async () => console.log(await getStructure(1000))}>get Struct</button> */}
      {/* <button onClick={() => setMap(1000)}>set</button>
      <button onClick={async () => console.log(await getMap(1000))}>get</button> */}
      {/* <button onClick={() => joinUserGame(toNano(1))}>Join</button> */}
      <input
        type="number"
        onChange={(e) => {
          setGameId(e.target.valueAsNumber);
        }}
        value={gameId}
      />
      <button
        onClick={() => {
          console.log("current game id", gameId);
          createGame(gameId);
        }}
      >
        Create
      </button>
      <button
        onClick={async () => {
          console.log(await getGame(gameId));
        }}
      >
        GEt
      </button>
    </div>
  );
}

export default App;
