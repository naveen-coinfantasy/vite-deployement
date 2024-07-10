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

export type TestStructure = {
  $$type: "TestStructure";
  data1: bigint;
  data2: bigint;
};

export function storeTestStructure(src: TestStructure) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.data1, 256);
    b_0.storeUint(src.data2, 256);
  };
}

export function loadTestStructure(slice: Slice) {
  let sc_0 = slice;
  let _data1 = sc_0.loadUintBig(256);
  let _data2 = sc_0.loadUintBig(256);
  return { $$type: "TestStructure" as const, data1: _data1, data2: _data2 };
}

function loadTupleTestStructure(source: TupleReader) {
  let _data1 = source.readBigNumber();
  let _data2 = source.readBigNumber();
  return { $$type: "TestStructure" as const, data1: _data1, data2: _data2 };
}

function storeTupleTestStructure(source: TestStructure) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.data1);
  builder.writeNumber(source.data2);
  return builder.build();
}

function dictValueParserTestStructure(): DictionaryValue<TestStructure> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTestStructure(src)).endCell());
    },
    parse: (src) => {
      return loadTestStructure(src.loadRef().beginParse());
    },
  };
}

export type CreateStruct = {
  $$type: "CreateStruct";
  value1: bigint;
  value2: bigint;
  value3: Address;
  time: bigint;
};

export function storeCreateStruct(src: CreateStruct) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.value1, 256);
    b_0.storeUint(src.value2, 256);
    b_0.storeAddress(src.value3);
    let b_1 = new Builder();
    b_1.storeUint(src.time, 256);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadCreateStruct(slice: Slice) {
  let sc_0 = slice;
  let _value1 = sc_0.loadUintBig(256);
  let _value2 = sc_0.loadUintBig(256);
  let _value3 = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _time = sc_1.loadUintBig(256);
  return {
    $$type: "CreateStruct" as const,
    value1: _value1,
    value2: _value2,
    value3: _value3,
    time: _time,
  };
}

function loadTupleCreateStruct(source: TupleReader) {
  let _value1 = source.readBigNumber();
  let _value2 = source.readBigNumber();
  let _value3 = source.readAddress();
  let _time = source.readBigNumber();
  return {
    $$type: "CreateStruct" as const,
    value1: _value1,
    value2: _value2,
    value3: _value3,
    time: _time,
  };
}

function storeTupleCreateStruct(source: CreateStruct) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.value1);
  builder.writeNumber(source.value2);
  builder.writeAddress(source.value3);
  builder.writeNumber(source.time);
  return builder.build();
}

function dictValueParserCreateStruct(): DictionaryValue<CreateStruct> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCreateStruct(src)).endCell());
    },
    parse: (src) => {
      return loadCreateStruct(src.loadRef().beginParse());
    },
  };
}

export type Test = {
  $$type: "Test";
  address: Address;
  time: bigint;
  recievedData: bigint;
};

export function storeTest(src: Test) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.address);
    b_0.storeUint(src.time, 256);
    b_0.storeUint(src.recievedData, 256);
  };
}

export function loadTest(slice: Slice) {
  let sc_0 = slice;
  let _address = sc_0.loadAddress();
  let _time = sc_0.loadUintBig(256);
  let _recievedData = sc_0.loadUintBig(256);
  return {
    $$type: "Test" as const,
    address: _address,
    time: _time,
    recievedData: _recievedData,
  };
}

function loadTupleTest(source: TupleReader) {
  let _address = source.readAddress();
  let _time = source.readBigNumber();
  let _recievedData = source.readBigNumber();
  return {
    $$type: "Test" as const,
    address: _address,
    time: _time,
    recievedData: _recievedData,
  };
}

function storeTupleTest(source: Test) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  builder.writeNumber(source.time);
  builder.writeNumber(source.recievedData);
  return builder.build();
}

function dictValueParserTest(): DictionaryValue<Test> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTest(src)).endCell());
    },
    parse: (src) => {
      return loadTest(src.loadRef().beginParse());
    },
  };
}

export type CreateGameRequestMessage = {
  $$type: "CreateGameRequestMessage";
  gameId: bigint;
  totalSpots: bigint;
  totalRewardPool: bigint;
  entryFee: bigint;
  gameDurationSeconds: bigint;
};

export function storeCreateGameRequestMessage(src: CreateGameRequestMessage) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2435906006, 32);
    b_0.storeUint(src.gameId, 256);
    b_0.storeUint(src.totalSpots, 32);
    b_0.storeUint(src.totalRewardPool, 256);
    b_0.storeUint(src.entryFee, 32);
    b_0.storeUint(src.gameDurationSeconds, 256);
  };
}

export function loadCreateGameRequestMessage(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2435906006) {
    throw Error("Invalid prefix");
  }
  let _gameId = sc_0.loadUintBig(256);
  let _totalSpots = sc_0.loadUintBig(32);
  let _totalRewardPool = sc_0.loadUintBig(256);
  let _entryFee = sc_0.loadUintBig(32);
  let _gameDurationSeconds = sc_0.loadUintBig(256);
  return {
    $$type: "CreateGameRequestMessage" as const,
    gameId: _gameId,
    totalSpots: _totalSpots,
    totalRewardPool: _totalRewardPool,
    entryFee: _entryFee,
    gameDurationSeconds: _gameDurationSeconds,
  };
}

function loadTupleCreateGameRequestMessage(source: TupleReader) {
  let _gameId = source.readBigNumber();
  let _totalSpots = source.readBigNumber();
  let _totalRewardPool = source.readBigNumber();
  let _entryFee = source.readBigNumber();
  let _gameDurationSeconds = source.readBigNumber();
  return {
    $$type: "CreateGameRequestMessage" as const,
    gameId: _gameId,
    totalSpots: _totalSpots,
    totalRewardPool: _totalRewardPool,
    entryFee: _entryFee,
    gameDurationSeconds: _gameDurationSeconds,
  };
}

function storeTupleCreateGameRequestMessage(source: CreateGameRequestMessage) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.gameId);
  builder.writeNumber(source.totalSpots);
  builder.writeNumber(source.totalRewardPool);
  builder.writeNumber(source.entryFee);
  builder.writeNumber(source.gameDurationSeconds);
  return builder.build();
}

function dictValueParserCreateGameRequestMessage(): DictionaryValue<CreateGameRequestMessage> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeCreateGameRequestMessage(src)).endCell()
      );
    },
    parse: (src) => {
      return loadCreateGameRequestMessage(src.loadRef().beginParse());
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

export type SetStructureToMap = {
  $$type: "SetStructureToMap";
  set1: TestStructure;
};

export function storeSetStructureToMap(src: SetStructureToMap) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(800691476, 32);
    b_0.store(storeTestStructure(src.set1));
  };
}

export function loadSetStructureToMap(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 800691476) {
    throw Error("Invalid prefix");
  }
  let _set1 = loadTestStructure(sc_0);
  return { $$type: "SetStructureToMap" as const, set1: _set1 };
}

function loadTupleSetStructureToMap(source: TupleReader) {
  const _set1 = loadTupleTestStructure(source.readTuple());
  return { $$type: "SetStructureToMap" as const, set1: _set1 };
}

function storeTupleSetStructureToMap(source: SetStructureToMap) {
  let builder = new TupleBuilder();
  builder.writeTuple(storeTupleTestStructure(source.set1));
  return builder.build();
}

function dictValueParserSetStructureToMap(): DictionaryValue<SetStructureToMap> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeSetStructureToMap(src)).endCell()
      );
    },
    parse: (src) => {
      return loadSetStructureToMap(src.loadRef().beginParse());
    },
  };
}

export type SetTestToMap = {
  $$type: "SetTestToMap";
  key: bigint;
  value: bigint;
};

export function storeSetTestToMap(src: SetTestToMap) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1300029301, 32);
    b_0.storeUint(src.key, 256);
    b_0.storeUint(src.value, 256);
  };
}

export function loadSetTestToMap(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1300029301) {
    throw Error("Invalid prefix");
  }
  let _key = sc_0.loadUintBig(256);
  let _value = sc_0.loadUintBig(256);
  return { $$type: "SetTestToMap" as const, key: _key, value: _value };
}

function loadTupleSetTestToMap(source: TupleReader) {
  let _key = source.readBigNumber();
  let _value = source.readBigNumber();
  return { $$type: "SetTestToMap" as const, key: _key, value: _value };
}

function storeTupleSetTestToMap(source: SetTestToMap) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.key);
  builder.writeNumber(source.value);
  return builder.build();
}

function dictValueParserSetTestToMap(): DictionaryValue<SetTestToMap> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetTestToMap(src)).endCell());
    },
    parse: (src) => {
      return loadSetTestToMap(src.loadRef().beginParse());
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
    "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"
  );
  const __system = Cell.fromBase64(
    "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"
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
    name: "TestStructure",
    header: null,
    fields: [
      {
        name: "data1",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "data2",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "CreateStruct",
    header: null,
    fields: [
      {
        name: "value1",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "value2",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "value3",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "time",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "Test",
    header: null,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "time",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "recievedData",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "CreateGameRequestMessage",
    header: 2435906006,
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
    name: "SetStructureToMap",
    header: 800691476,
    fields: [
      {
        name: "set1",
        type: { kind: "simple", type: "TestStructure", optional: false },
      },
    ],
  },
  {
    name: "SetTestToMap",
    header: 1300029301,
    fields: [
      {
        name: "key",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "value",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
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
    name: "Game",
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
    name: "TestStructureFn",
    arguments: [
      {
        name: "key",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: {
      kind: "dict",
      key: "uint",
      keyFormat: 256,
      value: "CreateStruct",
      valueFormat: "ref",
    },
  },
  {
    name: "TestingMap",
    arguments: [
      {
        name: "key",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: {
      kind: "dict",
      key: "uint",
      keyFormat: 256,
      value: "Test",
      valueFormat: "ref",
    },
  },
  {
    name: "owner",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
];

const CreateGameContact_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "SetTestData" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "SetStructureToMap" },
  },
  { receiver: "internal", message: { kind: "typed", type: "SetTestToMap" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "CreateGameRequestMessage" },
  },
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
    message:
      | SetTestData
      | SetStructureToMap
      | SetTestToMap
      | CreateGameRequestMessage
      | SetMap
      | Deploy
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
      message.$$type === "SetStructureToMap"
    ) {
      body = beginCell().store(storeSetStructureToMap(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "SetTestToMap"
    ) {
      body = beginCell().store(storeSetTestToMap(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CreateGameRequestMessage"
    ) {
      body = beginCell()
        .store(storeCreateGameRequestMessage(message))
        .endCell();
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

  async getGame(provider: ContractProvider, gameId: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(gameId);
    let source = (await provider.get("Game", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigUint(256),
      dictValueParserGameData(),
      source.readCellOpt()
    );
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

  async getTestStructureFn(provider: ContractProvider, key: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(key);
    let source = (await provider.get("TestStructureFn", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigUint(256),
      dictValueParserCreateStruct(),
      source.readCellOpt()
    );
    return result;
  }

  async getTestingMap(provider: ContractProvider, key: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(key);
    let source = (await provider.get("TestingMap", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigUint(256),
      dictValueParserTest(),
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
