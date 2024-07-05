import {
  CreateGameRequest,
  CreateGameContact,
  // CfGameContract,
} from "../contracts/contract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Dictionary, OpenedContract, toNano } from "@ton/core";
import { useTonConnect } from "./useTonConnect";

export function useJoinGameContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();
  //   const sleep = (time: number) =>
  //     new Promise((resolve) => setTimeout(resolve, time));
  const gameContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = await CreateGameContact.fromInit();
    return client.open(contract) as OpenedContract<CreateGameContact>;
    // const contract = await CfGameContract.fromInit();
    // return client.open(contract) as OpenedContract<CfGameContract>;
  }, [client]);
  //   gameContract?.getGetOwner().then((x) => console.log(x.toString()));
  //   const joinUserGame = async (gameId: bigint) => {
  //     if (!gameContract) return;
  //     console.log(sender, gameId);
  //     console.log("Calling contract");
  //     return gameContract.send(
  //       sender,
  //       { value: toNano("0.01"), bounce: true },
  //       {
  //         $$type: "JoinGame",
  //         gameId,
  //       }
  //     );
  //   };
  const setMap = async (one: number) => {
    if (!gameContract) return;
    console.log("Calling contract", one);

    return gameContract.send(
      sender,
      { value: toNano("0.01"), bounce: false },
      {
        $$type: "SetMap",
        gameId: BigInt(one),
        // gameCount: BigInt(1),
        // gameListData: data,
      }
    );
  };
  const getMap = async (one: number) => {
    if (!gameContract) return;
    console.log("Calling contract", one);

    return gameContract.getTestMapFn(BigInt(one));
  };
  const createGame = async (gameId: number) => {
    if (!gameContract) return;
    console.log("Calling contract");
    const data: Dictionary<number, CreateGameRequest> = Dictionary.empty();
    data.set(0, {
      $$type: "CreateGameRequest",
      entryFee: BigInt(gameId),
      gameDurationSeconds: BigInt(10),
      gameId: BigInt(1),
      totalRewardPool: BigInt(10),
      totalSpots: BigInt(10),
    });
    console.log(data);
    return gameContract.send(
      sender,
      { value: toNano("0.01"), bounce: false },
      {
        $$type: "CreateGameList",
        entryFee: BigInt(gameId),
        gameDurationSeconds: BigInt(10),
        gameId: BigInt(1),
        totalRewardPool: BigInt(10),
        totalSpots: BigInt(10),
        // gameCount: BigInt(1),
        // gameListData: data,
      }
    );
  };
  const getGame = async (gameId: number) => {
    if (!gameContract) return;
    console.log("Calling GetGame", gameId);

    return gameContract.getGameStatus(BigInt(gameId));
  };

  return {
    joinUserGame: () => {},
    createGame,
    getGame,
    address: gameContract?.address.toString(),
    setMap,
    getMap,
  };
}
