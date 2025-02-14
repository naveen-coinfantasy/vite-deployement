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
  gameId: bigint;
  totalSpots: bigint;
  totalRewardPool: bigint;
  entryFee: bigint;
  gameDurationSeconds: bigint;
};

export function storeCreateGameList(src: CreateGameList) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3225005017, 32);
    b_0.storeUint(src.gameId, 256);
    b_0.storeUint(src.totalSpots, 32);
    b_0.storeUint(src.totalRewardPool, 256);
    b_0.storeUint(src.entryFee, 32);
    b_0.storeUint(src.gameDurationSeconds, 256);
  };
}

export function loadCreateGameList(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3225005017) {
    throw Error("Invalid prefix");
  }
  let _gameId = sc_0.loadUintBig(256);
  let _totalSpots = sc_0.loadUintBig(32);
  let _totalRewardPool = sc_0.loadUintBig(256);
  let _entryFee = sc_0.loadUintBig(32);
  let _gameDurationSeconds = sc_0.loadUintBig(256);
  return {
    $$type: "CreateGameList" as const,
    gameId: _gameId,
    totalSpots: _totalSpots,
    totalRewardPool: _totalRewardPool,
    entryFee: _entryFee,
    gameDurationSeconds: _gameDurationSeconds,
  };
}

function loadTupleCreateGameList(source: TupleReader) {
  let _gameId = source.readBigNumber();
  let _totalSpots = source.readBigNumber();
  let _totalRewardPool = source.readBigNumber();
  let _entryFee = source.readBigNumber();
  let _gameDurationSeconds = source.readBigNumber();
  return {
    $$type: "CreateGameList" as const,
    gameId: _gameId,
    totalSpots: _totalSpots,
    totalRewardPool: _totalRewardPool,
    entryFee: _entryFee,
    gameDurationSeconds: _gameDurationSeconds,
  };
}

function storeTupleCreateGameList(source: CreateGameList) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.gameId);
  builder.writeNumber(source.totalSpots);
  builder.writeNumber(source.totalRewardPool);
  builder.writeNumber(source.entryFee);
  builder.writeNumber(source.gameDurationSeconds);
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

export type SetTestData = {
  $$type: "SetTestData";
  value1: bigint;
  value2: bigint;
};

export function storeSetTestData(src: SetTestData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1686839036, 32);
    b_0.storeUint(src.value1, 256);
    b_0.storeUint(src.value2, 256);
  };
}

export function loadSetTestData(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1686839036) {
    throw Error("Invalid prefix");
  }
  let _value1 = sc_0.loadUintBig(256);
  let _value2 = sc_0.loadUintBig(256);
  return { $$type: "SetTestData" as const, value1: _value1, value2: _value2 };
}

function loadTupleSetTestData(source: TupleReader) {
  let _value1 = source.readBigNumber();
  let _value2 = source.readBigNumber();
  return { $$type: "SetTestData" as const, value1: _value1, value2: _value2 };
}

function storeTupleSetTestData(source: SetTestData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.value1);
  builder.writeNumber(source.value2);
  return builder.build();
}

function dictValueParserSetTestData(): DictionaryValue<SetTestData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetTestData(src)).endCell());
    },
    parse: (src) => {
      return loadSetTestData(src.loadRef().beginParse());
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

export type SetMap = {
  $$type: "SetMap";
  gameId: bigint;
};

export function storeSetMap(src: SetMap) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2570311250, 32);
    b_0.storeUint(src.gameId, 256);
  };
}

export function loadSetMap(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2570311250) {
    throw Error("Invalid prefix");
  }
  let _gameId = sc_0.loadUintBig(256);
  return { $$type: "SetMap" as const, gameId: _gameId };
}

function loadTupleSetMap(source: TupleReader) {
  let _gameId = source.readBigNumber();
  return { $$type: "SetMap" as const, gameId: _gameId };
}

function storeTupleSetMap(source: SetMap) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.gameId);
  return builder.build();
}

function dictValueParserSetMap(): DictionaryValue<SetMap> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetMap(src)).endCell());
    },
    parse: (src) => {
      return loadSetMap(src.loadRef().beginParse());
    },
  };
}

type CreateGameContact_init_args = {
  $$type: "CreateGameContact_init_args";
};

function initCreateGameContact_init_args(src: CreateGameContact_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
  };
}

async function CreateGameContact_init() {
  const __code = Cell.fromBase64(
    "te6ccgECIwEABbMAART/APSkE/S88sgLAQIBYgIDAu7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCyPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFvQAEvQAAcj0AMkBzMntVB8EAgEgDg8C8AGSMH/gcCHXScIflTAg1wsf3iCCEGSLHvy6jjAw0x8BghBkix78uvLggdP/0/9ZbBKDByAQRUMwIW6VW1n0WzCYyAHPAUEz9EPiAX/gIIIQwDmr2bqOnzDTHwGCEMA5q9m68uCB0//TH9P/0x/T/1VAbBXbPH/gIAUGBHIQOEdl2zz4QnAgbVRxERBqEFkQjxB+EG0QRRBMVZCDBwvIVaDbPMkSIG6VMFn0WzCUQTP0F+KIRDAHCggJAvaCEJkz1lK6jr4w0x8BghCZM9ZSuvLggdP/ATH4QnCAFIAegCgjgQJYbVRyIlWQgwcLyFWg2zzJEiBulTBZ9FswlEEz9Bfif+CCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAKCwAS+EJSQMcF8uCEACIAAAAAQ3JlYXRpbmcgR2FtZQEO+EIBf23bPAsAfFC6INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WGMsfFssfFMv/Essfyx/L//QAAcjL/xPL/8v/yQHMATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAwByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIBARAgEgExQCFbqG/bPFUD2zxsQYHxICEbhR3bPNs8bEGB8XACqDB1MDUDNBM/QOb6GUAdcBMJJbbeICASAVFgIBSBscAhG10Ttnm2eNiDAfFwIBIBgZAAIjAkGx27bPFUD2zxsQSBukjBtmSBu8tCAbytvC+IgbpIwbd6AfGgDdsvRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgnBAznVp5xX50lCwHWFuJkeygATiDByICWfQPb6GSMG3fIG6SMG2Oh9DbPGwbbwviIgARsK+7UTQ0gABgAgEgHR4CQa5C7Z4qge2eNiCQN0kYNsyQN3loQDeVt4XxEDdJGDbvQB8gAHWs3caGrS4MzmdF5eotquxorugsSOnGbC4MRystTsgsispKiw0ODO5KTonMre0KKkmmSujMK0yM5u5wQAGU7UTQ1AH4Y9IAAY4v+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPQE1AHQ9AQwFEMwbBTgMPgo1wsKgwm68uCJ2zwhATiDByQCWfQPb6GSMG3fIG6SMG2Oh9DbPGwbbwviIgDcbW1t+EL4KPhCyFmCEE3A8V5QA8sfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAVSAAkPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0x/TH9P/0x/TH9P/9ATUAdDT/9P/0/8wEDsQOhA5EDgQNxA2EDUQNA=="
  );
  const __system = Cell.fromBase64(
    "te6cckECJQEABb0AAQHAAQEFoKKDAgEU/wD0pBP0vPLICwMCAWIEDwLu0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLggsj4QwHMfwHKAFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxb0ABL0AAHI9ADJAczJ7VQgBQLwAZIwf+BwIddJwh+VMCDXCx/eIIIQZIse/LqOMDDTHwGCEGSLHvy68uCB0//T/1lsEoMHIBBFQzAhbpVbWfRbMJjIAc8BQTP0Q+IBf+AgghDAOavZuo6fMNMfAYIQwDmr2bry4IHT/9Mf0//TH9P/VUBsFds8f+AgBgoEchA4R2XbPPhCcCBtVHEREGoQWRCPEH4QbRBFEExVkIMHC8hVoNs8yRIgbpUwWfRbMJRBM/QX4ohEMAcLCAkAEvhCUkDHBfLghAAiAAAAAENyZWF0aW5nIEdhbWUBDvhCAX9t2zwMAvaCEJkz1lK6jr4w0x8BghCZM9ZSuvLggdP/ATH4QnCAFIAegCgjgQJYbVRyIlWQgwcLyFWg2zzJEiBulTBZ9FswlEEz9Bfif+CCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHALDAB8ULog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYYyx8Wyx8Uy/8Syx/LH8v/9AAByMv/E8v/y//JAcwBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8DQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAOAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgEgEBQCASAREwIVuob9s8VQPbPGxBggEgAqgwdTA1AzQTP0Dm+hlAHXATCSW23iAhG4Ud2zzbPGxBggFwIBIBUcAgEgFhgCEbXRO2ebZ42IMCAXAAIjAgEgGRsCQbHbts8VQPbPGxBIG6SMG2ZIG7y0IBvK28L4iBukjBt3oCAaATiDByICWfQPb6GSMG3fIG6SMG2Oh9DbPGwbbwviIwDdsvRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgnBAznVp5xX50lCwHWFuJkeygAgFIHR4AEbCvu1E0NIAAYAIBIB8kAkGuQu2eKoHtnjYgkDdJGDbMkDd5aEA3lbeF8RA3SRg270AgIgGU7UTQ1AH4Y9IAAY4v+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPQE1AHQ9AQwFEMwbBTgMPgo1wsKgwm68uCJ2zwhANxtbW34Qvgo+ELIWYIQTcDxXlADyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsnIgljAAAAAAAAAAAAAAAABActnzMlw+wBVIAE4gwckAln0D2+hkjBt3yBukjBtjofQ2zxsG28L4iMAkPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0x/TH9P/0x/TH9P/9ATUAdDT/9P/0/8wEDsQOhA5EDgQNxA2EDUQNAB1rN3Ghq0uDM5nReXqLarsaK7oLEjpxmwuDEcrLU7ILIrKSosNDgzuSk6JzK3tCipJpkrozCtMjObucEDMT9A9"
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initCreateGameContact_init_args({ $$type: "CreateGameContact_init_args" })(
    builder
  );
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const CreateGameContact_errors: { [key: number]: { message: string } } = {
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
};

const CreateGameContact_types: ABIType[] = [
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
    header: 3225005017,
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
    name: "SetTestData",
    header: 1686839036,
    fields: [
      {
        name: "value1",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "value2",
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
    name: "SetMap",
    header: 2570311250,
    fields: [
      {
        name: "gameId",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
];

const CreateGameContact_getters: ABIGetter[] = [
  {
    name: "getOwner",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "GameStatus",
    arguments: [
      {
        name: "gameId",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: { kind: "simple", type: "GameData", optional: true },
  },
  {
    name: "TestDataFn",
    arguments: [
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: { kind: "simple", type: "int", optional: true, format: 257 },
  },
  {
    name: "TestMapFn",
    arguments: [
      {
        name: "gameId",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: { kind: "simple", type: "GameData", optional: true },
  },
  {
    name: "owner",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
];

const CreateGameContact_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "SetTestData" } },
  { receiver: "internal", message: { kind: "typed", type: "CreateGameList" } },
  { receiver: "internal", message: { kind: "typed", type: "SetMap" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class CreateGameContact implements Contract {
  static async init() {
    return await CreateGameContact_init();
  }

  static async fromInit() {
    const init = await CreateGameContact_init();
    const address = contractAddress(0, init);
    return new CreateGameContact(address, init);
  }

  static fromAddress(address: Address) {
    return new CreateGameContact(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: CreateGameContact_types,
    getters: CreateGameContact_getters,
    receivers: CreateGameContact_receivers,
    errors: CreateGameContact_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: SetTestData | CreateGameList | SetMap | Deploy
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "SetTestData"
    ) {
      body = beginCell().store(storeSetTestData(message)).endCell();
    }
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
      message.$$type === "SetMap"
    ) {
      body = beginCell().store(storeSetMap(message)).endCell();
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

  async getGameStatus(provider: ContractProvider, gameId: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(gameId);
    let source = (await provider.get("GameStatus", builder.build())).stack;
    const result_p = source.readTupleOpt();
    const result = result_p ? loadTupleGameData(result_p) : null;
    return result;
  }

  async getTestDataFn(provider: ContractProvider, value: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(value);
    let source = (await provider.get("TestDataFn", builder.build())).stack;
    let result = source.readBigNumberOpt();
    return result;
  }

  async getTestMapFn(provider: ContractProvider, gameId: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(gameId);
    let source = (await provider.get("TestMapFn", builder.build())).stack;
    const result_p = source.readTupleOpt();
    const result = result_p ? loadTupleGameData(result_p) : null;
    return result;
  }

  async getOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("owner", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }
}
