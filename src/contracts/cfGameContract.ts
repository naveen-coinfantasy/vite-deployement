import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "@ton/core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwner = {
  $$type: "ChangeOwner";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwnerOk = {
  $$type: "ChangeOwnerOk";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwnerOk(src.loadRef().beginParse());
    },
  };
}

export type GameData = {
  $$type: "GameData";
  gameOwnerAddress: Address;
  activePlayerCount: bigint;
  totalSpots: bigint;
  totalRewardPool: bigint;
  entryFee: bigint;
  gameStatus: bigint;
  gameDurationSeconds: bigint;
  activePlayers: Dictionary<Address, bigint>;
  createdAt: bigint;
  startedAt: bigint;
  completedAt: bigint;
};

export function storeGameData(src: GameData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.gameOwnerAddress);
    b_0.storeUint(src.activePlayerCount, 32);
    b_0.storeUint(src.totalSpots, 32);
    b_0.storeUint(src.totalRewardPool, 256);
    b_0.storeUint(src.entryFee, 32);
    b_0.storeUint(src.gameStatus, 32);
    b_0.storeUint(src.gameDurationSeconds, 256);
    b_0.storeDict(
      src.activePlayers,
      Dictionary.Keys.Address(),
      Dictionary.Values.BigUint(256)
    );
    let b_1 = new Builder();
    b_1.storeUint(src.createdAt, 256);
    b_1.storeUint(src.startedAt, 256);
    b_1.storeUint(src.completedAt, 256);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadGameData(slice: Slice) {
  let sc_0 = slice;
  let _gameOwnerAddress = sc_0.loadAddress();
  let _activePlayerCount = sc_0.loadUintBig(32);
  let _totalSpots = sc_0.loadUintBig(32);
  let _totalRewardPool = sc_0.loadUintBig(256);
  let _entryFee = sc_0.loadUintBig(32);
  let _gameStatus = sc_0.loadUintBig(32);
  let _gameDurationSeconds = sc_0.loadUintBig(256);
  let _activePlayers = Dictionary.load(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigUint(256),
    sc_0
  );
  let sc_1 = sc_0.loadRef().beginParse();
  let _createdAt = sc_1.loadUintBig(256);
  let _startedAt = sc_1.loadUintBig(256);
  let _completedAt = sc_1.loadUintBig(256);
  return {
    $$type: "GameData" as const,
    gameOwnerAddress: _gameOwnerAddress,
    activePlayerCount: _activePlayerCount,
    totalSpots: _totalSpots,
    totalRewardPool: _totalRewardPool,
    entryFee: _entryFee,
    gameStatus: _gameStatus,
    gameDurationSeconds: _gameDurationSeconds,
    activePlayers: _activePlayers,
    createdAt: _createdAt,
    startedAt: _startedAt,
    completedAt: _completedAt,
  };
}

function loadTupleGameData(source: TupleReader) {
  let _gameOwnerAddress = source.readAddress();
  let _activePlayerCount = source.readBigNumber();
  let _totalSpots = source.readBigNumber();
  let _totalRewardPool = source.readBigNumber();
  let _entryFee = source.readBigNumber();
  let _gameStatus = source.readBigNumber();
  let _gameDurationSeconds = source.readBigNumber();
  let _activePlayers = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    Dictionary.Values.BigUint(256),
    source.readCellOpt()
  );
  let _createdAt = source.readBigNumber();
  let _startedAt = source.readBigNumber();
  let _completedAt = source.readBigNumber();
  return {
    $$type: "GameData" as const,
    gameOwnerAddress: _gameOwnerAddress,
    activePlayerCount: _activePlayerCount,
    totalSpots: _totalSpots,
    totalRewardPool: _totalRewardPool,
    entryFee: _entryFee,
    gameStatus: _gameStatus,
    gameDurationSeconds: _gameDurationSeconds,
    activePlayers: _activePlayers,
    createdAt: _createdAt,
    startedAt: _startedAt,
    completedAt: _completedAt,
  };
}

function storeTupleGameData(source: GameData) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.gameOwnerAddress);
  builder.writeNumber(source.activePlayerCount);
  builder.writeNumber(source.totalSpots);
  builder.writeNumber(source.totalRewardPool);
  builder.writeNumber(source.entryFee);
  builder.writeNumber(source.gameStatus);
  builder.writeNumber(source.gameDurationSeconds);
  builder.writeCell(
    source.activePlayers.size > 0
      ? beginCell()
          .storeDictDirect(
            source.activePlayers,
            Dictionary.Keys.Address(),
            Dictionary.Values.BigUint(256)
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.createdAt);
  builder.writeNumber(source.startedAt);
  builder.writeNumber(source.completedAt);
  return builder.build();
}

function dictValueParserGameData(): DictionaryValue<GameData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeGameData(src)).endCell());
    },
    parse: (src) => {
      return loadGameData(src.loadRef().beginParse());
    },
  };
}

export type CreateGameRequest = {
  $$type: "CreateGameRequest";
  gameId: bigint;
  totalSpots: bigint;
  totalRewardPool: bigint;
  entryFee: bigint;
  gameDurationSeconds: bigint;
};

export function storeCreateGameRequest(src: CreateGameRequest) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.gameId, 256);
    b_0.storeUint(src.totalSpots, 32);
    b_0.storeUint(src.totalRewardPool, 256);
    b_0.storeUint(src.entryFee, 32);
    b_0.storeUint(src.gameDurationSeconds, 256);
  };
}

export function loadCreateGameRequest(slice: Slice) {
  let sc_0 = slice;
  let _gameId = sc_0.loadUintBig(256);
  let _totalSpots = sc_0.loadUintBig(32);
  let _totalRewardPool = sc_0.loadUintBig(256);
  let _entryFee = sc_0.loadUintBig(32);
  let _gameDurationSeconds = sc_0.loadUintBig(256);
  return {
    $$type: "CreateGameRequest" as const,
    gameId: _gameId,
    totalSpots: _totalSpots,
    totalRewardPool: _totalRewardPool,
    entryFee: _entryFee,
    gameDurationSeconds: _gameDurationSeconds,
  };
}

function loadTupleCreateGameRequest(source: TupleReader) {
  let _gameId = source.readBigNumber();
  let _totalSpots = source.readBigNumber();
  let _totalRewardPool = source.readBigNumber();
  let _entryFee = source.readBigNumber();
  let _gameDurationSeconds = source.readBigNumber();
  return {
    $$type: "CreateGameRequest" as const,
    gameId: _gameId,
    totalSpots: _totalSpots,
    totalRewardPool: _totalRewardPool,
    entryFee: _entryFee,
    gameDurationSeconds: _gameDurationSeconds,
  };
}

function storeTupleCreateGameRequest(source: CreateGameRequest) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.gameId);
  builder.writeNumber(source.totalSpots);
  builder.writeNumber(source.totalRewardPool);
  builder.writeNumber(source.entryFee);
  builder.writeNumber(source.gameDurationSeconds);
  return builder.build();
}

function dictValueParserCreateGameRequest(): DictionaryValue<CreateGameRequest> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeCreateGameRequest(src)).endCell()
      );
    },
    parse: (src) => {
      return loadCreateGameRequest(src.loadRef().beginParse());
    },
  };
}

export type CreateGameList = {
  $$type: "CreateGameList";
  gameListData: Dictionary<number, CreateGameRequest>;
  gameCount: bigint;
};

export function storeCreateGameList(src: CreateGameList) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2859698415, 32);
    b_0.storeDict(
      src.gameListData,
      Dictionary.Keys.Uint(32),
      dictValueParserCreateGameRequest()
    );
    b_0.storeUint(src.gameCount, 32);
  };
}

export function loadCreateGameList(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2859698415) {
    throw Error("Invalid prefix");
  }
  let _gameListData = Dictionary.load(
    Dictionary.Keys.Uint(32),
    dictValueParserCreateGameRequest(),
    sc_0
  );
  let _gameCount = sc_0.loadUintBig(32);
  return {
    $$type: "CreateGameList" as const,
    gameListData: _gameListData,
    gameCount: _gameCount,
  };
}

function loadTupleCreateGameList(source: TupleReader) {
  let _gameListData = Dictionary.loadDirect(
    Dictionary.Keys.Uint(32),
    dictValueParserCreateGameRequest(),
    source.readCellOpt()
  );
  let _gameCount = source.readBigNumber();
  return {
    $$type: "CreateGameList" as const,
    gameListData: _gameListData,
    gameCount: _gameCount,
  };
}

function storeTupleCreateGameList(source: CreateGameList) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.gameListData.size > 0
      ? beginCell()
          .storeDictDirect(
            source.gameListData,
            Dictionary.Keys.Uint(32),
            dictValueParserCreateGameRequest()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.gameCount);
  return builder.build();
}

function dictValueParserCreateGameList(): DictionaryValue<CreateGameList> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCreateGameList(src)).endCell());
    },
    parse: (src) => {
      return loadCreateGameList(src.loadRef().beginParse());
    },
  };
}

export type StartGameList = {
  $$type: "StartGameList";
  gameIds: Dictionary<number, number>;
  gameCount: bigint;
};

export function storeStartGameList(src: StartGameList) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4279441815, 32);
    b_0.storeDict(
      src.gameIds,
      Dictionary.Keys.Uint(32),
      Dictionary.Values.Uint(32)
    );
    b_0.storeUint(src.gameCount, 32);
  };
}

export function loadStartGameList(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4279441815) {
    throw Error("Invalid prefix");
  }
  let _gameIds = Dictionary.load(
    Dictionary.Keys.Uint(32),
    Dictionary.Values.Uint(32),
    sc_0
  );
  let _gameCount = sc_0.loadUintBig(32);
  return {
    $$type: "StartGameList" as const,
    gameIds: _gameIds,
    gameCount: _gameCount,
  };
}

function loadTupleStartGameList(source: TupleReader) {
  let _gameIds = Dictionary.loadDirect(
    Dictionary.Keys.Uint(32),
    Dictionary.Values.Uint(32),
    source.readCellOpt()
  );
  let _gameCount = source.readBigNumber();
  return {
    $$type: "StartGameList" as const,
    gameIds: _gameIds,
    gameCount: _gameCount,
  };
}

function storeTupleStartGameList(source: StartGameList) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.gameIds.size > 0
      ? beginCell()
          .storeDictDirect(
            source.gameIds,
            Dictionary.Keys.Uint(32),
            Dictionary.Values.Uint(32)
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.gameCount);
  return builder.build();
}

function dictValueParserStartGameList(): DictionaryValue<StartGameList> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStartGameList(src)).endCell());
    },
    parse: (src) => {
      return loadStartGameList(src.loadRef().beginParse());
    },
  };
}

export type EndGameList = {
  $$type: "EndGameList";
  gameIds: Dictionary<number, number>;
  gameCount: bigint;
};

export function storeEndGameList(src: EndGameList) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1772819452, 32);
    b_0.storeDict(
      src.gameIds,
      Dictionary.Keys.Uint(32),
      Dictionary.Values.Uint(32)
    );
    b_0.storeUint(src.gameCount, 32);
  };
}

export function loadEndGameList(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1772819452) {
    throw Error("Invalid prefix");
  }
  let _gameIds = Dictionary.load(
    Dictionary.Keys.Uint(32),
    Dictionary.Values.Uint(32),
    sc_0
  );
  let _gameCount = sc_0.loadUintBig(32);
  return {
    $$type: "EndGameList" as const,
    gameIds: _gameIds,
    gameCount: _gameCount,
  };
}

function loadTupleEndGameList(source: TupleReader) {
  let _gameIds = Dictionary.loadDirect(
    Dictionary.Keys.Uint(32),
    Dictionary.Values.Uint(32),
    source.readCellOpt()
  );
  let _gameCount = source.readBigNumber();
  return {
    $$type: "EndGameList" as const,
    gameIds: _gameIds,
    gameCount: _gameCount,
  };
}

function storeTupleEndGameList(source: EndGameList) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.gameIds.size > 0
      ? beginCell()
          .storeDictDirect(
            source.gameIds,
            Dictionary.Keys.Uint(32),
            Dictionary.Values.Uint(32)
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.gameCount);
  return builder.build();
}

function dictValueParserEndGameList(): DictionaryValue<EndGameList> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeEndGameList(src)).endCell());
    },
    parse: (src) => {
      return loadEndGameList(src.loadRef().beginParse());
    },
  };
}

export type CancelGameList = {
  $$type: "CancelGameList";
  gameIds: Dictionary<number, number>;
  gameCount: bigint;
};

export function storeCancelGameList(src: CancelGameList) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3158055813, 32);
    b_0.storeDict(
      src.gameIds,
      Dictionary.Keys.Uint(32),
      Dictionary.Values.Uint(32)
    );
    b_0.storeUint(src.gameCount, 32);
  };
}

export function loadCancelGameList(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3158055813) {
    throw Error("Invalid prefix");
  }
  let _gameIds = Dictionary.load(
    Dictionary.Keys.Uint(32),
    Dictionary.Values.Uint(32),
    sc_0
  );
  let _gameCount = sc_0.loadUintBig(32);
  return {
    $$type: "CancelGameList" as const,
    gameIds: _gameIds,
    gameCount: _gameCount,
  };
}

function loadTupleCancelGameList(source: TupleReader) {
  let _gameIds = Dictionary.loadDirect(
    Dictionary.Keys.Uint(32),
    Dictionary.Values.Uint(32),
    source.readCellOpt()
  );
  let _gameCount = source.readBigNumber();
  return {
    $$type: "CancelGameList" as const,
    gameIds: _gameIds,
    gameCount: _gameCount,
  };
}

function storeTupleCancelGameList(source: CancelGameList) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.gameIds.size > 0
      ? beginCell()
          .storeDictDirect(
            source.gameIds,
            Dictionary.Keys.Uint(32),
            Dictionary.Values.Uint(32)
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.gameCount);
  return builder.build();
}

function dictValueParserCancelGameList(): DictionaryValue<CancelGameList> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCancelGameList(src)).endCell());
    },
    parse: (src) => {
      return loadCancelGameList(src.loadRef().beginParse());
    },
  };
}

export type JoinGame = {
  $$type: "JoinGame";
  gameId: bigint;
};

export function storeJoinGame(src: JoinGame) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(631384654, 32);
    b_0.storeUint(src.gameId, 256);
  };
}

export function loadJoinGame(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 631384654) {
    throw Error("Invalid prefix");
  }
  let _gameId = sc_0.loadUintBig(256);
  return { $$type: "JoinGame" as const, gameId: _gameId };
}

function loadTupleJoinGame(source: TupleReader) {
  let _gameId = source.readBigNumber();
  return { $$type: "JoinGame" as const, gameId: _gameId };
}

function storeTupleJoinGame(source: JoinGame) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.gameId);
  return builder.build();
}

function dictValueParserJoinGame(): DictionaryValue<JoinGame> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJoinGame(src)).endCell());
    },
    parse: (src) => {
      return loadJoinGame(src.loadRef().beginParse());
    },
  };
}

export type OnGameContractDeployed = {
  $$type: "OnGameContractDeployed";
  contractAddress: Address;
  transaction_by: Address;
};

export function storeOnGameContractDeployed(src: OnGameContractDeployed) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1304490334, 32);
    b_0.storeAddress(src.contractAddress);
    b_0.storeAddress(src.transaction_by);
  };
}

export function loadOnGameContractDeployed(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1304490334) {
    throw Error("Invalid prefix");
  }
  let _contractAddress = sc_0.loadAddress();
  let _transaction_by = sc_0.loadAddress();
  return {
    $$type: "OnGameContractDeployed" as const,
    contractAddress: _contractAddress,
    transaction_by: _transaction_by,
  };
}

function loadTupleOnGameContractDeployed(source: TupleReader) {
  let _contractAddress = source.readAddress();
  let _transaction_by = source.readAddress();
  return {
    $$type: "OnGameContractDeployed" as const,
    contractAddress: _contractAddress,
    transaction_by: _transaction_by,
  };
}

function storeTupleOnGameContractDeployed(source: OnGameContractDeployed) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.contractAddress);
  builder.writeAddress(source.transaction_by);
  return builder.build();
}

function dictValueParserOnGameContractDeployed(): DictionaryValue<OnGameContractDeployed> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeOnGameContractDeployed(src)).endCell()
      );
    },
    parse: (src) => {
      return loadOnGameContractDeployed(src.loadRef().beginParse());
    },
  };
}

export type OnGameCreated = {
  $$type: "OnGameCreated";
  gameId: bigint;
  createdAt: bigint;
  transaction_by: Address;
};

export function storeOnGameCreated(src: OnGameCreated) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(484395488, 32);
    b_0.storeUint(src.gameId, 256);
    b_0.storeUint(src.createdAt, 256);
    b_0.storeAddress(src.transaction_by);
  };
}

export function loadOnGameCreated(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 484395488) {
    throw Error("Invalid prefix");
  }
  let _gameId = sc_0.loadUintBig(256);
  let _createdAt = sc_0.loadUintBig(256);
  let _transaction_by = sc_0.loadAddress();
  return {
    $$type: "OnGameCreated" as const,
    gameId: _gameId,
    createdAt: _createdAt,
    transaction_by: _transaction_by,
  };
}

function loadTupleOnGameCreated(source: TupleReader) {
  let _gameId = source.readBigNumber();
  let _createdAt = source.readBigNumber();
  let _transaction_by = source.readAddress();
  return {
    $$type: "OnGameCreated" as const,
    gameId: _gameId,
    createdAt: _createdAt,
    transaction_by: _transaction_by,
  };
}

function storeTupleOnGameCreated(source: OnGameCreated) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.gameId);
  builder.writeNumber(source.createdAt);
  builder.writeAddress(source.transaction_by);
  return builder.build();
}

function dictValueParserOnGameCreated(): DictionaryValue<OnGameCreated> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOnGameCreated(src)).endCell());
    },
    parse: (src) => {
      return loadOnGameCreated(src.loadRef().beginParse());
    },
  };
}

export type OnGameStarted = {
  $$type: "OnGameStarted";
  gameId: bigint;
  startedAt: bigint;
  transaction_by: Address;
};

export function storeOnGameStarted(src: OnGameStarted) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4034210111, 32);
    b_0.storeUint(src.gameId, 256);
    b_0.storeUint(src.startedAt, 256);
    b_0.storeAddress(src.transaction_by);
  };
}

export function loadOnGameStarted(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4034210111) {
    throw Error("Invalid prefix");
  }
  let _gameId = sc_0.loadUintBig(256);
  let _startedAt = sc_0.loadUintBig(256);
  let _transaction_by = sc_0.loadAddress();
  return {
    $$type: "OnGameStarted" as const,
    gameId: _gameId,
    startedAt: _startedAt,
    transaction_by: _transaction_by,
  };
}

function loadTupleOnGameStarted(source: TupleReader) {
  let _gameId = source.readBigNumber();
  let _startedAt = source.readBigNumber();
  let _transaction_by = source.readAddress();
  return {
    $$type: "OnGameStarted" as const,
    gameId: _gameId,
    startedAt: _startedAt,
    transaction_by: _transaction_by,
  };
}

function storeTupleOnGameStarted(source: OnGameStarted) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.gameId);
  builder.writeNumber(source.startedAt);
  builder.writeAddress(source.transaction_by);
  return builder.build();
}

function dictValueParserOnGameStarted(): DictionaryValue<OnGameStarted> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOnGameStarted(src)).endCell());
    },
    parse: (src) => {
      return loadOnGameStarted(src.loadRef().beginParse());
    },
  };
}

export type OnGameEnded = {
  $$type: "OnGameEnded";
  gameId: bigint;
  completedAt: bigint;
  transaction_by: Address;
};

export function storeOnGameEnded(src: OnGameEnded) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1958268821, 32);
    b_0.storeUint(src.gameId, 256);
    b_0.storeUint(src.completedAt, 256);
    b_0.storeAddress(src.transaction_by);
  };
}

export function loadOnGameEnded(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1958268821) {
    throw Error("Invalid prefix");
  }
  let _gameId = sc_0.loadUintBig(256);
  let _completedAt = sc_0.loadUintBig(256);
  let _transaction_by = sc_0.loadAddress();
  return {
    $$type: "OnGameEnded" as const,
    gameId: _gameId,
    completedAt: _completedAt,
    transaction_by: _transaction_by,
  };
}

function loadTupleOnGameEnded(source: TupleReader) {
  let _gameId = source.readBigNumber();
  let _completedAt = source.readBigNumber();
  let _transaction_by = source.readAddress();
  return {
    $$type: "OnGameEnded" as const,
    gameId: _gameId,
    completedAt: _completedAt,
    transaction_by: _transaction_by,
  };
}

function storeTupleOnGameEnded(source: OnGameEnded) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.gameId);
  builder.writeNumber(source.completedAt);
  builder.writeAddress(source.transaction_by);
  return builder.build();
}

function dictValueParserOnGameEnded(): DictionaryValue<OnGameEnded> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOnGameEnded(src)).endCell());
    },
    parse: (src) => {
      return loadOnGameEnded(src.loadRef().beginParse());
    },
  };
}

export type OnGameCancelled = {
  $$type: "OnGameCancelled";
  gameId: bigint;
  transaction_by: Address;
};

export function storeOnGameCancelled(src: OnGameCancelled) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(332182483, 32);
    b_0.storeUint(src.gameId, 256);
    b_0.storeAddress(src.transaction_by);
  };
}

export function loadOnGameCancelled(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 332182483) {
    throw Error("Invalid prefix");
  }
  let _gameId = sc_0.loadUintBig(256);
  let _transaction_by = sc_0.loadAddress();
  return {
    $$type: "OnGameCancelled" as const,
    gameId: _gameId,
    transaction_by: _transaction_by,
  };
}

function loadTupleOnGameCancelled(source: TupleReader) {
  let _gameId = source.readBigNumber();
  let _transaction_by = source.readAddress();
  return {
    $$type: "OnGameCancelled" as const,
    gameId: _gameId,
    transaction_by: _transaction_by,
  };
}

function storeTupleOnGameCancelled(source: OnGameCancelled) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.gameId);
  builder.writeAddress(source.transaction_by);
  return builder.build();
}

function dictValueParserOnGameCancelled(): DictionaryValue<OnGameCancelled> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOnGameCancelled(src)).endCell());
    },
    parse: (src) => {
      return loadOnGameCancelled(src.loadRef().beginParse());
    },
  };
}

export type OnUserJoinedGame = {
  $$type: "OnUserJoinedGame";
  gameId: bigint;
  userAddress: Address;
  joinedAt: bigint;
  transaction_by: Address;
};

export function storeOnUserJoinedGame(src: OnUserJoinedGame) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(866621050, 32);
    b_0.storeUint(src.gameId, 256);
    b_0.storeAddress(src.userAddress);
    b_0.storeUint(src.joinedAt, 256);
    let b_1 = new Builder();
    b_1.storeAddress(src.transaction_by);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadOnUserJoinedGame(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 866621050) {
    throw Error("Invalid prefix");
  }
  let _gameId = sc_0.loadUintBig(256);
  let _userAddress = sc_0.loadAddress();
  let _joinedAt = sc_0.loadUintBig(256);
  let sc_1 = sc_0.loadRef().beginParse();
  let _transaction_by = sc_1.loadAddress();
  return {
    $$type: "OnUserJoinedGame" as const,
    gameId: _gameId,
    userAddress: _userAddress,
    joinedAt: _joinedAt,
    transaction_by: _transaction_by,
  };
}

function loadTupleOnUserJoinedGame(source: TupleReader) {
  let _gameId = source.readBigNumber();
  let _userAddress = source.readAddress();
  let _joinedAt = source.readBigNumber();
  let _transaction_by = source.readAddress();
  return {
    $$type: "OnUserJoinedGame" as const,
    gameId: _gameId,
    userAddress: _userAddress,
    joinedAt: _joinedAt,
    transaction_by: _transaction_by,
  };
}

function storeTupleOnUserJoinedGame(source: OnUserJoinedGame) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.gameId);
  builder.writeAddress(source.userAddress);
  builder.writeNumber(source.joinedAt);
  builder.writeAddress(source.transaction_by);
  return builder.build();
}

function dictValueParserOnUserJoinedGame(): DictionaryValue<OnUserJoinedGame> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOnUserJoinedGame(src)).endCell());
    },
    parse: (src) => {
      return loadOnUserJoinedGame(src.loadRef().beginParse());
    },
  };
}

type CfGameContract_init_args = {
  $$type: "CfGameContract_init_args";
};

function initCfGameContract_init_args(src: CfGameContract_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
  };
}

async function CfGameContract_init() {
  const __code = Cell.fromBase64(
    "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"
  );
  const __system = Cell.fromBase64(
    "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"
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initCfGameContract_init_args({ $$type: "CfGameContract_init_args" })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const CfGameContract_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  4877: { message: `The game is not listed for joining` },
  10162: { message: `The player Already Joined!` },
  20681: { message: `No Players Present In Game` },
  32094: { message: `Invalid Game Id` },
  35697: { message: `Invalid Status` },
  44141: { message: `The player count reached!` },
};

const CfGameContract_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ChangeOwner",
    header: 2174598809,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ChangeOwnerOk",
    header: 846932810,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "GameData",
    header: null,
    fields: [
      {
        name: "gameOwnerAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "activePlayerCount",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
      {
        name: "totalSpots",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
      {
        name: "totalRewardPool",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "entryFee",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
      {
        name: "gameStatus",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
      {
        name: "gameDurationSeconds",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "activePlayers",
        type: { kind: "dict", key: "address", value: "uint", valueFormat: 256 },
      },
      {
        name: "createdAt",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "startedAt",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "completedAt",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "CreateGameRequest",
    header: null,
    fields: [
      {
        name: "gameId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "totalSpots",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
      {
        name: "totalRewardPool",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "entryFee",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
      {
        name: "gameDurationSeconds",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "CreateGameList",
    header: 2859698415,
    fields: [
      {
        name: "gameListData",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 32,
          value: "CreateGameRequest",
          valueFormat: "ref",
        },
      },
      {
        name: "gameCount",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
    ],
  },
  {
    name: "StartGameList",
    header: 4279441815,
    fields: [
      {
        name: "gameIds",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 32,
          value: "uint",
          valueFormat: 32,
        },
      },
      {
        name: "gameCount",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
    ],
  },
  {
    name: "EndGameList",
    header: 1772819452,
    fields: [
      {
        name: "gameIds",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 32,
          value: "uint",
          valueFormat: 32,
        },
      },
      {
        name: "gameCount",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
    ],
  },
  {
    name: "CancelGameList",
    header: 3158055813,
    fields: [
      {
        name: "gameIds",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 32,
          value: "uint",
          valueFormat: 32,
        },
      },
      {
        name: "gameCount",
        type: { kind: "simple", type: "uint", optional: false, format: 32 },
      },
    ],
  },
  {
    name: "JoinGame",
    header: 631384654,
    fields: [
      {
        name: "gameId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "OnGameContractDeployed",
    header: 1304490334,
    fields: [
      {
        name: "contractAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "transaction_by",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "OnGameCreated",
    header: 484395488,
    fields: [
      {
        name: "gameId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "createdAt",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "transaction_by",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "OnGameStarted",
    header: 4034210111,
    fields: [
      {
        name: "gameId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "startedAt",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "transaction_by",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "OnGameEnded",
    header: 1958268821,
    fields: [
      {
        name: "gameId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "completedAt",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "transaction_by",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "OnGameCancelled",
    header: 332182483,
    fields: [
      {
        name: "gameId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "transaction_by",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "OnUserJoinedGame",
    header: 866621050,
    fields: [
      {
        name: "gameId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "userAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "joinedAt",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "transaction_by",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
];

const CfGameContract_getters: ABIGetter[] = [
  {
    name: "getOwner",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "getGameStatus",
    arguments: [
      {
        name: "gameId",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: {
      kind: "dict",
      key: "uint",
      keyFormat: 256,
      value: "GameData",
      valueFormat: "ref",
    },
  },
  {
    name: "owner",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
];

const CfGameContract_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "CreateGameList" } },
  { receiver: "internal", message: { kind: "typed", type: "StartGameList" } },
  { receiver: "internal", message: { kind: "typed", type: "EndGameList" } },
  { receiver: "internal", message: { kind: "typed", type: "CancelGameList" } },
  { receiver: "internal", message: { kind: "typed", type: "JoinGame" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class CfGameContract implements Contract {
  static async init() {
    return await CfGameContract_init();
  }

  static async fromInit() {
    const init = await CfGameContract_init();
    const address = contractAddress(0, init);
    return new CfGameContract(address, init);
  }

  static fromAddress(address: Address) {
    return new CfGameContract(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: CfGameContract_types,
    getters: CfGameContract_getters,
    receivers: CfGameContract_receivers,
    errors: CfGameContract_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | CreateGameList
      | StartGameList
      | EndGameList
      | CancelGameList
      | JoinGame
      | Deploy
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CreateGameList"
    ) {
      body = beginCell().store(storeCreateGameList(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "StartGameList"
    ) {
      body = beginCell().store(storeStartGameList(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "EndGameList"
    ) {
      body = beginCell().store(storeEndGameList(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CancelGameList"
    ) {
      body = beginCell().store(storeCancelGameList(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "JoinGame"
    ) {
      body = beginCell().store(storeJoinGame(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getGetOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("getOwner", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getGetGameStatus(provider: ContractProvider, gameId: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(gameId);
    let source = (await provider.get("getGameStatus", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigUint(256),
      dictValueParserGameData(),
      source.readCellOpt()
    );
    return result;
  }

  async getOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("owner", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }
}
