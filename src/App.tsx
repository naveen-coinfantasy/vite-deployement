import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useState } from "react";
import { useCfGameContract } from "./hooks/useCfGameContract";

function App() {
  // const { address, createGame, getGame, setTesting, getTesing } =
  //   useJoinGameContract();
  const { createGame, getGame, startGame, cancelGame, joinGame, endGame } =
    useCfGameContract();
  const [gameId, setGameId] = useState(0);
  return (
    <div>
      <TonConnectButton />
      {/* <button onClick={() => setTesting(1000)}>set Testing</button>
      <button
        onClick={async () => {
          const a = await getTesing(1000);
          console.log(a);
          console.log(a?.size);
          console.log(a?.get(BigInt(9001)));
          // console.log(a?.get(BigInt(9001)));
        }}
      >
        get Testing
      </button> */}
      {/* <button onClick={() => setStructure(1000)}>set Struct</button>
      <button onClick={async () => console.log(await getStructure(1000))}>get Struct</button> */}
      {/* <button onClick={() => setMap(1000)}>set</button>
      <button onClick={async () => console.log(await getMap(1000))}>get</button> */}
      {/* <button onClick={() => joinUserGame(toNano(1))}>Join</button> */}
      {/* <input
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
          const result = await getGame(gameId);
          console.log(result?.size);
          console.log(result?.get(BigInt(gameId)));
          console.log(result?.keys());
        }}
      >
        GEt Game
      </button> */}
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
          const result = await joinGame(gameId);
          console.log(result);
        }}
      >
        Join game
      </button>
      <button
        onClick={async () => {
          const result = await startGame(gameId);
          console.log(result);
        }}
      >
        start game
      </button>
      <button
        onClick={async () => {
          const result = await cancelGame(gameId);
          console.log(result);
        }}
      >
        Cancel game
      </button>
      <button
        onClick={async () => {
          const result = await endGame(gameId);
          console.log(result);
        }}
      >
        End game
      </button>
      <button
        onClick={async () => {
          const result = await getGame(gameId);
          console.log(result?.size);
          console.log(result?.get(BigInt(gameId)));
          console.log(result?.keys());
          // result = await getGame(gameId + 1);
          // console.log(result?.size);
          // console.log(result?.get(BigInt(gameId + 1)));
          // console.log(result?.keys());
        }}
      >
        GEt Game
      </button>
    </div>
  );
}

export default App;
