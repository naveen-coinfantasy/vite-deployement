import { CfGameContract, CreateGameRequest } from "../contracts/cfGameContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Dictionary, OpenedContract, toNano } from "@ton/core";

export function useCfGameContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();
  const gameContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = await CfGameContract.fromInit();
    return client.open(contract) as OpenedContract<CfGameContract>;
  }, [client]);

  const createGame = async (gameId: number) => {
    if (!gameContract) return;
    console.log("Calling contract");
    const secondGameId = gameId + 1;
    const data: Dictionary<number, CreateGameRequest> = Dictionary.empty();
    data.set(gameId, {
      $$type: "CreateGameRequest",
      entryFee: BigInt(gameId),
      gameDurationSeconds: BigInt(10),
      gameId: BigInt(gameId),
      totalRewardPool: BigInt(10),
      totalSpots: BigInt(10),
    });
    // data.set(secondGameId, {
    //   $$type: "CreateGameRequest",
    //   entryFee: BigInt(secondGameId),
    //   gameDurationSeconds: BigInt(10),
    //   gameId: BigInt(secondGameId),
    //   totalRewardPool: BigInt(10),
    //   totalSpots: BigInt(10),
    // });
    console.log(data.get(gameId));
    console.log(data.get(secondGameId));
    return gameContract.send(
      sender,
      { value: toNano("0.01"), bounce: false },
      {
        $$type: "CreateGameList",
        gameCount: BigInt(data.size),
        gameListData: data,
      }
    );
  };

  const getGame = async (gameId: number) => {
    if (!gameContract) return;
    console.log("Calling GetGame", gameId);

    return gameContract.getGetGameStatus(BigInt(gameId));
  };
  const startGame = async (gameId: number) => {
    if (!gameContract) return;
    console.log("Calling GetGame", gameId);
    const data: Dictionary<number, number> = Dictionary.empty();
    data.set(gameId, gameId);
    return gameContract.send(
      sender,
      { value: toNano("0.01"), bounce: false },
      {
        $$type: "StartGameList",
        gameCount: BigInt(data.size),
        gameIds: data,
      }
    );
  };
  const cancelGame = async (gameId: number) => {
    if (!gameContract) return;
    console.log("Calling GetGame", gameId);
    const data: Dictionary<number, number> = Dictionary.empty();
    data.set(gameId, gameId);
    return gameContract.send(
      sender,
      { value: toNano("0.01"), bounce: false },
      {
        $$type: "CancelGameList",
        gameCount: BigInt(data.size),
        gameIds: data,
      }
    );
  };
  const endGame = async (gameId: number) => {
    if (!gameContract) return;
    console.log("Calling GetGame", gameId);
    const data: Dictionary<number, number> = Dictionary.empty();
    data.set(gameId, gameId);
    return gameContract.send(
      sender,
      { value: toNano("0.01"), bounce: true },
      {
        $$type: "EndGameList",
        gameCount: BigInt(data.size),
        gameIds: data,
      }
    );
  };
  const joinGame = async (gameId: number) => {
    if (!gameContract) return;
    console.log("Calling joinGame", gameId);
    return gameContract.send(
      sender,
      { value: toNano("0.01"), bounce: false },
      {
        $$type: "JoinGame",
        gameId: BigInt(gameId),
      }
    );
  };

  return {
    joinUserGame: () => {},
    createGame,
    getGame,
    startGame,
    cancelGame,
    joinGame,
    endGame,
    address: gameContract?.address.toString(),
  };
}
