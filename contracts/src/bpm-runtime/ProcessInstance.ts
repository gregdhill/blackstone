import { Readable } from "stream";
interface Provider<Tx> {
    deploy(msg: Tx, callback: (err: Error, addr: Uint8Array) => void): void;
    call(msg: Tx, callback: (err: Error, exec: Uint8Array) => void): void;
    listen(signature: string, address: string, callback: (err: Error, event: any) => void): Readable;
    payload(data: string, address?: string): Tx;
    encode(name: string, inputs: string[], ...args: any[]): string;
    decode(data: Uint8Array, outputs: string[]): any;
}
function Call<Tx, Output>(client: Provider<Tx>, addr: string, data: string, callback: (exec: Uint8Array) => Output): Promise<Output> {
    const payload = client.payload(data, addr);
    return new Promise((resolve, reject) => {
        client.call(payload, (err, exec) => { err ? reject(err) : resolve(callback(exec)); });
    });
}
function Replace(bytecode: string, name: string, address: string): string {
    address = address + Array(40 - address.length + 1).join("0");
    const truncated = name.slice(0, 36);
    const label = "__" + truncated + Array(37 - truncated.length).join("_") + "__";
    while (bytecode.indexOf(label) >= 0)
        bytecode = bytecode.replace(label, address);
    return bytecode;
}
export module ProcessInstance {
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        LogDataStorageUpdateAddress(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateAddress", this.address, callback); }
        LogDataStorageUpdateAddressArray(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateAddressArray", this.address, callback); }
        LogDataStorageUpdateBool(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateBool", this.address, callback); }
        LogDataStorageUpdateBoolArray(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateBoolArray", this.address, callback); }
        LogDataStorageUpdateBytes32(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateBytes32", this.address, callback); }
        LogDataStorageUpdateBytes32Array(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateBytes32Array", this.address, callback); }
        LogDataStorageUpdateInt(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateInt", this.address, callback); }
        LogDataStorageUpdateIntArray(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateIntArray", this.address, callback); }
        LogDataStorageUpdateString(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateString", this.address, callback); }
        LogDataStorageUpdateUint(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateUint", this.address, callback); }
        LogDataStorageUpdateUintArray(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataStorageUpdateUintArray", this.address, callback); }
        LogEntityAddressScopeUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogEntityAddressScopeUpdate", this.address, callback); }
        LogOwnerChanged(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogOwnerChanged", this.address, callback); }
        LogProcessInstanceCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogProcessInstanceCreation", this.address, callback); }
        LogProcessInstanceStateUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogProcessInstanceStateUpdate", this.address, callback); }
        ERC165_ID_Address_Scopes() {
            const data = Encode(this.client).ERC165_ID_Address_Scopes();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ERC165_ID_Address_Scopes();
            });
        }
        ERC165_ID_VERSIONED_ARTIFACT() {
            const data = Encode(this.client).ERC165_ID_VERSIONED_ARTIFACT();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ERC165_ID_VERSIONED_ARTIFACT();
            });
        }
        EVENT_ID_DATA_STORAGE() {
            const data = Encode(this.client).EVENT_ID_DATA_STORAGE();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_DATA_STORAGE();
            });
        }
        EVENT_ID_ENTITIES_ADDRESS_SCOPES() {
            const data = Encode(this.client).EVENT_ID_ENTITIES_ADDRESS_SCOPES();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ENTITIES_ADDRESS_SCOPES();
            });
        }
        EVENT_ID_PROCESS_INSTANCES() {
            const data = Encode(this.client).EVENT_ID_PROCESS_INSTANCES();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_PROCESS_INSTANCES();
            });
        }
        abort() {
            const data = Encode(this.client).abort();
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).abort();
            });
        }
        addProcessStateChangeListener(_listener: string) {
            const data = Encode(this.client).addProcessStateChangeListener(_listener);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addProcessStateChangeListener();
            });
        }
        compareArtifactVersion(_other: string, _version: [number, number, number]) {
            const data = Encode(this.client).compareArtifactVersion(_other, _version);
            return Call<Tx, {
                result: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).compareArtifactVersion();
            });
        }
        completeActivity(_activityInstanceId: Buffer, _service: string) {
            const data = Encode(this.client).completeActivity(_activityInstanceId, _service);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).completeActivity();
            });
        }
        completeActivityWithAddressData(_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: string) {
            const data = Encode(this.client).completeActivityWithAddressData(_activityInstanceId, _service, _dataMappingId, _value);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).completeActivityWithAddressData();
            });
        }
        completeActivityWithBoolData(_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: boolean) {
            const data = Encode(this.client).completeActivityWithBoolData(_activityInstanceId, _service, _dataMappingId, _value);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).completeActivityWithBoolData();
            });
        }
        completeActivityWithBytes32Data(_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: Buffer) {
            const data = Encode(this.client).completeActivityWithBytes32Data(_activityInstanceId, _service, _dataMappingId, _value);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).completeActivityWithBytes32Data();
            });
        }
        completeActivityWithIntData(_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: number) {
            const data = Encode(this.client).completeActivityWithIntData(_activityInstanceId, _service, _dataMappingId, _value);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).completeActivityWithIntData();
            });
        }
        completeActivityWithStringData(_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: string) {
            const data = Encode(this.client).completeActivityWithStringData(_activityInstanceId, _service, _dataMappingId, _value);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).completeActivityWithStringData();
            });
        }
        completeActivityWithUintData(_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: number) {
            const data = Encode(this.client).completeActivityWithUintData(_activityInstanceId, _service, _dataMappingId, _value);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).completeActivityWithUintData();
            });
        }
        execute(_service: string) {
            const data = Encode(this.client).execute(_service);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).execute();
            });
        }
        getActivityInDataAsAddress(_activityInstanceId: Buffer, _dataMappingId: Buffer) {
            const data = Encode(this.client).getActivityInDataAsAddress(_activityInstanceId, _dataMappingId);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityInDataAsAddress();
            });
        }
        getActivityInDataAsBool(_activityInstanceId: Buffer, _dataMappingId: Buffer) {
            const data = Encode(this.client).getActivityInDataAsBool(_activityInstanceId, _dataMappingId);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityInDataAsBool();
            });
        }
        getActivityInDataAsBytes32(_activityInstanceId: Buffer, _dataMappingId: Buffer) {
            const data = Encode(this.client).getActivityInDataAsBytes32(_activityInstanceId, _dataMappingId);
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityInDataAsBytes32();
            });
        }
        getActivityInDataAsInt(_activityInstanceId: Buffer, _dataMappingId: Buffer) {
            const data = Encode(this.client).getActivityInDataAsInt(_activityInstanceId, _dataMappingId);
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityInDataAsInt();
            });
        }
        getActivityInDataAsString(_activityInstanceId: Buffer, _dataMappingId: Buffer) {
            const data = Encode(this.client).getActivityInDataAsString(_activityInstanceId, _dataMappingId);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityInDataAsString();
            });
        }
        getActivityInDataAsUint(_activityInstanceId: Buffer, _dataMappingId: Buffer) {
            const data = Encode(this.client).getActivityInDataAsUint(_activityInstanceId, _dataMappingId);
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityInDataAsUint();
            });
        }
        getActivityInstanceAtIndex(_idx: number) {
            const data = Encode(this.client).getActivityInstanceAtIndex(_idx);
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityInstanceAtIndex();
            });
        }
        getActivityInstanceData(_id: Buffer) {
            const data = Encode(this.client).getActivityInstanceData(_id);
            return Call<Tx, {
                activityId: Buffer;
                created: number;
                completed: number;
                performer: string;
                completedBy: string;
                state: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityInstanceData();
            });
        }
        getAddressScopeDetails(_address: string, _context: Buffer) {
            const data = Encode(this.client).getAddressScopeDetails(_address, _context);
            return Call<Tx, {
                fixedScope: Buffer;
                dataPath: Buffer;
                dataStorageId: Buffer;
                dataStorage: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAddressScopeDetails();
            });
        }
        getAddressScopeDetailsForKey(_key: Buffer) {
            const data = Encode(this.client).getAddressScopeDetailsForKey(_key);
            return Call<Tx, {
                keyAddress: string;
                keyContext: Buffer;
                fixedScope: Buffer;
                dataPath: Buffer;
                dataStorageId: Buffer;
                dataStorage: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAddressScopeDetailsForKey();
            });
        }
        getAddressScopeKeys() {
            const data = Encode(this.client).getAddressScopeKeys();
            return Call<Tx, [Buffer[]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAddressScopeKeys();
            });
        }
        getArrayLength(_id: Buffer) {
            const data = Encode(this.client).getArrayLength(_id);
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArrayLength();
            });
        }
        getArtifactVersion() {
            const data = Encode(this.client).getArtifactVersion();
            return Call<Tx, [[number, number, number]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArtifactVersion();
            });
        }
        getArtifactVersionMajor() {
            const data = Encode(this.client).getArtifactVersionMajor();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArtifactVersionMajor();
            });
        }
        getArtifactVersionMinor() {
            const data = Encode(this.client).getArtifactVersionMinor();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArtifactVersionMinor();
            });
        }
        getArtifactVersionPatch() {
            const data = Encode(this.client).getArtifactVersionPatch();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArtifactVersionPatch();
            });
        }
        getDataIdAtIndex(_index: number) {
            const data = Encode(this.client).getDataIdAtIndex(_index);
            return Call<Tx, {
                error: number;
                id: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataIdAtIndex();
            });
        }
        getDataType(_id: Buffer) {
            const data = Encode(this.client).getDataType(_id);
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataType();
            });
        }
        getDataValueAsAddress(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsAddress(_id);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsAddress();
            });
        }
        getDataValueAsAddressArray(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsAddressArray(_id);
            return Call<Tx, [string[]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsAddressArray();
            });
        }
        getDataValueAsBool(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsBool(_id);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsBool();
            });
        }
        getDataValueAsBoolArray(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsBoolArray(_id);
            return Call<Tx, [boolean[]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsBoolArray();
            });
        }
        getDataValueAsBytes32(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsBytes32(_id);
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsBytes32();
            });
        }
        getDataValueAsBytes32Array(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsBytes32Array(_id);
            return Call<Tx, [Buffer[]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsBytes32Array();
            });
        }
        getDataValueAsInt(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsInt(_id);
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsInt();
            });
        }
        getDataValueAsIntArray(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsIntArray(_id);
            return Call<Tx, [number[]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsIntArray();
            });
        }
        getDataValueAsString(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsString(_id);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsString();
            });
        }
        getDataValueAsUint(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsUint(_id);
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsUint();
            });
        }
        getDataValueAsUintArray(_id: Buffer) {
            const data = Encode(this.client).getDataValueAsUintArray(_id);
            return Call<Tx, [number[]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDataValueAsUintArray();
            });
        }
        getNumberOfActivityInstances() {
            const data = Encode(this.client).getNumberOfActivityInstances();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfActivityInstances();
            });
        }
        getNumberOfData() {
            const data = Encode(this.client).getNumberOfData();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfData();
            });
        }
        getProcessDefinition() {
            const data = Encode(this.client).getProcessDefinition();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getProcessDefinition();
            });
        }
        getStartedBy() {
            const data = Encode(this.client).getStartedBy();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getStartedBy();
            });
        }
        getState() {
            const data = Encode(this.client).getState();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getState();
            });
        }
        initRuntime() {
            const data = Encode(this.client).initRuntime();
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).initRuntime();
            });
        }
        initialize(_processDefinition: string, _startedBy: string, _activityInstanceId: Buffer) {
            const data = Encode(this.client).initialize(_processDefinition, _startedBy, _activityInstanceId);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).initialize();
            });
        }
        notifyProcessStateChange() {
            const data = Encode(this.client).notifyProcessStateChange();
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).notifyProcessStateChange();
            });
        }
        removeData(_id: Buffer) {
            const data = Encode(this.client).removeData(_id);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).removeData();
            });
        }
        resolveAddressScope(_address: string, _context: Buffer, _dataStorage: string) {
            const data = Encode(this.client).resolveAddressScope(_address, _context, _dataStorage);
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).resolveAddressScope();
            });
        }
        resolveInDataLocation(_activityInstanceId: Buffer, _dataMappingId: Buffer) {
            const data = Encode(this.client).resolveInDataLocation(_activityInstanceId, _dataMappingId);
            return Call<Tx, {
                dataStorage: string;
                dataPath: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).resolveInDataLocation();
            });
        }
        resolveOutDataLocation(_activityInstanceId: Buffer, _dataMappingId: Buffer) {
            const data = Encode(this.client).resolveOutDataLocation(_activityInstanceId, _dataMappingId);
            return Call<Tx, {
                dataStorage: string;
                dataPath: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).resolveOutDataLocation();
            });
        }
        resolveTransitionCondition(_transitionId: Buffer, _targetId: Buffer) {
            const data = Encode(this.client).resolveTransitionCondition(_transitionId, _targetId);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).resolveTransitionCondition();
            });
        }
        setActivityOutDataAsAddress(_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: string) {
            const data = Encode(this.client).setActivityOutDataAsAddress(_activityInstanceId, _dataMappingId, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setActivityOutDataAsAddress();
            });
        }
        setActivityOutDataAsBool(_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: boolean) {
            const data = Encode(this.client).setActivityOutDataAsBool(_activityInstanceId, _dataMappingId, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setActivityOutDataAsBool();
            });
        }
        setActivityOutDataAsBytes32(_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: Buffer) {
            const data = Encode(this.client).setActivityOutDataAsBytes32(_activityInstanceId, _dataMappingId, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setActivityOutDataAsBytes32();
            });
        }
        setActivityOutDataAsInt(_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: number) {
            const data = Encode(this.client).setActivityOutDataAsInt(_activityInstanceId, _dataMappingId, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setActivityOutDataAsInt();
            });
        }
        setActivityOutDataAsString(_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: string) {
            const data = Encode(this.client).setActivityOutDataAsString(_activityInstanceId, _dataMappingId, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setActivityOutDataAsString();
            });
        }
        setActivityOutDataAsUint(_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: number) {
            const data = Encode(this.client).setActivityOutDataAsUint(_activityInstanceId, _dataMappingId, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setActivityOutDataAsUint();
            });
        }
        setAddressScope(_address: string, _context: Buffer, _fixedScope: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string) {
            const data = Encode(this.client).setAddressScope(_address, _context, _fixedScope, _dataPath, _dataStorageId, _dataStorage);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setAddressScope();
            });
        }
        setDataValueAsAddress(_id: Buffer, _value: string) {
            const data = Encode(this.client).setDataValueAsAddress(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsAddress();
            });
        }
        setDataValueAsAddressArray(_id: Buffer, _value: string[]) {
            const data = Encode(this.client).setDataValueAsAddressArray(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsAddressArray();
            });
        }
        setDataValueAsBool(_id: Buffer, _value: boolean) {
            const data = Encode(this.client).setDataValueAsBool(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsBool();
            });
        }
        setDataValueAsBoolArray(_id: Buffer, _value: boolean[]) {
            const data = Encode(this.client).setDataValueAsBoolArray(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsBoolArray();
            });
        }
        setDataValueAsBytes32(_id: Buffer, _value: Buffer) {
            const data = Encode(this.client).setDataValueAsBytes32(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsBytes32();
            });
        }
        setDataValueAsBytes32Array(_id: Buffer, _value: Buffer[]) {
            const data = Encode(this.client).setDataValueAsBytes32Array(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsBytes32Array();
            });
        }
        setDataValueAsInt(_id: Buffer, _value: number) {
            const data = Encode(this.client).setDataValueAsInt(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsInt();
            });
        }
        setDataValueAsIntArray(_id: Buffer, _value: number[]) {
            const data = Encode(this.client).setDataValueAsIntArray(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsIntArray();
            });
        }
        setDataValueAsString(_id: Buffer, _value: string) {
            const data = Encode(this.client).setDataValueAsString(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsString();
            });
        }
        setDataValueAsUint(_id: Buffer, _value: number) {
            const data = Encode(this.client).setDataValueAsUint(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsUint();
            });
        }
        setDataValueAsUintArray(_id: Buffer, _value: number[]) {
            const data = Encode(this.client).setDataValueAsUintArray(_id, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDataValueAsUintArray();
            });
        }
        transferOwnership(_newOwner: string) {
            const data = Encode(this.client).transferOwnership(_newOwner);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).transferOwnership();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        ERC165_ID_Address_Scopes: () => { return client.encode("BD9E0660", []); },
        ERC165_ID_VERSIONED_ARTIFACT: () => { return client.encode("E10533C6", []); },
        EVENT_ID_DATA_STORAGE: () => { return client.encode("D42EA976", []); },
        EVENT_ID_ENTITIES_ADDRESS_SCOPES: () => { return client.encode("B7D64777", []); },
        EVENT_ID_PROCESS_INSTANCES: () => { return client.encode("50396E1C", []); },
        abort: () => { return client.encode("35A063B4", []); },
        addProcessStateChangeListener: (_listener: string) => { return client.encode("3DF4CAF2", ["address"], _listener); },
        compareArtifactVersion: (_other: string, _version: [number, number, number]) => {
            if (typeof _other === "string")
                return client.encode("5C030138", ["address"], _other);
            if (typeof _version === "string")
                return client.encode("78BC0B0D", ["uint8[3]"], _version);
        },
        completeActivity: (_activityInstanceId: Buffer, _service: string) => { return client.encode("68180951", ["bytes32", "address"], _activityInstanceId, _service); },
        completeActivityWithAddressData: (_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: string) => { return client.encode("942F7C5B", ["bytes32", "address", "bytes32", "address"], _activityInstanceId, _service, _dataMappingId, _value); },
        completeActivityWithBoolData: (_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: boolean) => { return client.encode("9BD8E439", ["bytes32", "address", "bytes32", "bool"], _activityInstanceId, _service, _dataMappingId, _value); },
        completeActivityWithBytes32Data: (_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: Buffer) => { return client.encode("70EC993E", ["bytes32", "address", "bytes32", "bytes32"], _activityInstanceId, _service, _dataMappingId, _value); },
        completeActivityWithIntData: (_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: number) => { return client.encode("84096931", ["bytes32", "address", "bytes32", "int256"], _activityInstanceId, _service, _dataMappingId, _value); },
        completeActivityWithStringData: (_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: string) => { return client.encode("8F70172D", ["bytes32", "address", "bytes32", "string"], _activityInstanceId, _service, _dataMappingId, _value); },
        completeActivityWithUintData: (_activityInstanceId: Buffer, _service: string, _dataMappingId: Buffer, _value: number) => { return client.encode("D8389BBA", ["bytes32", "address", "bytes32", "uint256"], _activityInstanceId, _service, _dataMappingId, _value); },
        execute: (_service: string) => { return client.encode("4B64E492", ["address"], _service); },
        getActivityInDataAsAddress: (_activityInstanceId: Buffer, _dataMappingId: Buffer) => { return client.encode("481EA63D", ["bytes32", "bytes32"], _activityInstanceId, _dataMappingId); },
        getActivityInDataAsBool: (_activityInstanceId: Buffer, _dataMappingId: Buffer) => { return client.encode("79594884", ["bytes32", "bytes32"], _activityInstanceId, _dataMappingId); },
        getActivityInDataAsBytes32: (_activityInstanceId: Buffer, _dataMappingId: Buffer) => { return client.encode("A32DD3B2", ["bytes32", "bytes32"], _activityInstanceId, _dataMappingId); },
        getActivityInDataAsInt: (_activityInstanceId: Buffer, _dataMappingId: Buffer) => { return client.encode("37E567A0", ["bytes32", "bytes32"], _activityInstanceId, _dataMappingId); },
        getActivityInDataAsString: (_activityInstanceId: Buffer, _dataMappingId: Buffer) => { return client.encode("26A3BA26", ["bytes32", "bytes32"], _activityInstanceId, _dataMappingId); },
        getActivityInDataAsUint: (_activityInstanceId: Buffer, _dataMappingId: Buffer) => { return client.encode("C2334A5A", ["bytes32", "bytes32"], _activityInstanceId, _dataMappingId); },
        getActivityInstanceAtIndex: (_idx: number) => { return client.encode("21CB9B63", ["uint256"], _idx); },
        getActivityInstanceData: (_id: Buffer) => { return client.encode("DB8168FC", ["bytes32"], _id); },
        getAddressScopeDetails: (_address: string, _context: Buffer) => { return client.encode("9561AA32", ["address", "bytes32"], _address, _context); },
        getAddressScopeDetailsForKey: (_key: Buffer) => { return client.encode("FE3C84B2", ["bytes32"], _key); },
        getAddressScopeKeys: () => { return client.encode("70A9C997", []); },
        getArrayLength: (_id: Buffer) => { return client.encode("AA0AC16F", ["bytes32"], _id); },
        getArtifactVersion: () => { return client.encode("756B2E6C", []); },
        getArtifactVersionMajor: () => { return client.encode("57E0EBCA", []); },
        getArtifactVersionMinor: () => { return client.encode("7589ADB7", []); },
        getArtifactVersionPatch: () => { return client.encode("F085F6DD", []); },
        getDataIdAtIndex: (_index: number) => { return client.encode("374B7D22", ["uint256"], _index); },
        getDataType: (_id: Buffer) => { return client.encode("31502F13", ["bytes32"], _id); },
        getDataValueAsAddress: (_id: Buffer) => { return client.encode("F364E379", ["bytes32"], _id); },
        getDataValueAsAddressArray: (_id: Buffer) => { return client.encode("EEB8B809", ["bytes32"], _id); },
        getDataValueAsBool: (_id: Buffer) => { return client.encode("30C676C9", ["bytes32"], _id); },
        getDataValueAsBoolArray: (_id: Buffer) => { return client.encode("D734C53A", ["bytes32"], _id); },
        getDataValueAsBytes32: (_id: Buffer) => { return client.encode("2512E6F1", ["bytes32"], _id); },
        getDataValueAsBytes32Array: (_id: Buffer) => { return client.encode("FCB4862A", ["bytes32"], _id); },
        getDataValueAsInt: (_id: Buffer) => { return client.encode("E2BE8FE1", ["bytes32"], _id); },
        getDataValueAsIntArray: (_id: Buffer) => { return client.encode("F0A40527", ["bytes32"], _id); },
        getDataValueAsString: (_id: Buffer) => { return client.encode("D2E8A0FA", ["bytes32"], _id); },
        getDataValueAsUint: (_id: Buffer) => { return client.encode("35CE1BD1", ["bytes32"], _id); },
        getDataValueAsUintArray: (_id: Buffer) => { return client.encode("31185182", ["bytes32"], _id); },
        getNumberOfActivityInstances: () => { return client.encode("D8619D80", []); },
        getNumberOfData: () => { return client.encode("5666F9AC", []); },
        getProcessDefinition: () => { return client.encode("FCFB0C58", []); },
        getStartedBy: () => { return client.encode("A0826E06", []); },
        getState: () => { return client.encode("1865C57D", []); },
        initRuntime: () => { return client.encode("6CAD8FBF", []); },
        initialize: (_processDefinition: string, _startedBy: string, _activityInstanceId: Buffer) => { return client.encode("6133F985", ["address", "address", "bytes32"], _processDefinition, _startedBy, _activityInstanceId); },
        notifyProcessStateChange: () => { return client.encode("5BCCC36D", []); },
        removeData: (_id: Buffer) => { return client.encode("47DD48E0", ["bytes32"], _id); },
        resolveAddressScope: (_address: string, _context: Buffer, _dataStorage: string) => { return client.encode("3C0E5245", ["address", "bytes32", "address"], _address, _context, _dataStorage); },
        resolveInDataLocation: (_activityInstanceId: Buffer, _dataMappingId: Buffer) => { return client.encode("2CEB8B18", ["bytes32", "bytes32"], _activityInstanceId, _dataMappingId); },
        resolveOutDataLocation: (_activityInstanceId: Buffer, _dataMappingId: Buffer) => { return client.encode("D6256976", ["bytes32", "bytes32"], _activityInstanceId, _dataMappingId); },
        resolveTransitionCondition: (_transitionId: Buffer, _targetId: Buffer) => { return client.encode("EA45DAED", ["bytes32", "bytes32"], _transitionId, _targetId); },
        setActivityOutDataAsAddress: (_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: string) => { return client.encode("0FE71EBC", ["bytes32", "bytes32", "address"], _activityInstanceId, _dataMappingId, _value); },
        setActivityOutDataAsBool: (_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: boolean) => { return client.encode("9CC222BD", ["bytes32", "bytes32", "bool"], _activityInstanceId, _dataMappingId, _value); },
        setActivityOutDataAsBytes32: (_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: Buffer) => { return client.encode("EE348522", ["bytes32", "bytes32", "bytes32"], _activityInstanceId, _dataMappingId, _value); },
        setActivityOutDataAsInt: (_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: number) => { return client.encode("E93EB8B2", ["bytes32", "bytes32", "int256"], _activityInstanceId, _dataMappingId, _value); },
        setActivityOutDataAsString: (_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: string) => { return client.encode("C6059FB1", ["bytes32", "bytes32", "string"], _activityInstanceId, _dataMappingId, _value); },
        setActivityOutDataAsUint: (_activityInstanceId: Buffer, _dataMappingId: Buffer, _value: number) => { return client.encode("2A819AF7", ["bytes32", "bytes32", "uint256"], _activityInstanceId, _dataMappingId, _value); },
        setAddressScope: (_address: string, _context: Buffer, _fixedScope: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string) => { return client.encode("6D73C8BC", ["address", "bytes32", "bytes32", "bytes32", "bytes32", "address"], _address, _context, _fixedScope, _dataPath, _dataStorageId, _dataStorage); },
        setDataValueAsAddress: (_id: Buffer, _value: string) => { return client.encode("68E78011", ["bytes32", "address"], _id, _value); },
        setDataValueAsAddressArray: (_id: Buffer, _value: string[]) => { return client.encode("641375AD", ["bytes32", "address[]"], _id, _value); },
        setDataValueAsBool: (_id: Buffer, _value: boolean) => { return client.encode("1CB35540", ["bytes32", "bool"], _id, _value); },
        setDataValueAsBoolArray: (_id: Buffer, _value: boolean[]) => { return client.encode("F5081E9F", ["bytes32", "bool[]"], _id, _value); },
        setDataValueAsBytes32: (_id: Buffer, _value: Buffer) => { return client.encode("8AA137F5", ["bytes32", "bytes32"], _id, _value); },
        setDataValueAsBytes32Array: (_id: Buffer, _value: Buffer[]) => { return client.encode("EDEC4C4F", ["bytes32", "bytes32[]"], _id, _value); },
        setDataValueAsInt: (_id: Buffer, _value: number) => { return client.encode("720E72E9", ["bytes32", "int256"], _id, _value); },
        setDataValueAsIntArray: (_id: Buffer, _value: number[]) => { return client.encode("6D6A7E8F", ["bytes32", "int256[]"], _id, _value); },
        setDataValueAsString: (_id: Buffer, _value: string) => { return client.encode("1C5422D2", ["bytes32", "string"], _id, _value); },
        setDataValueAsUint: (_id: Buffer, _value: number) => { return client.encode("F3420D1A", ["bytes32", "uint256"], _id, _value); },
        setDataValueAsUintArray: (_id: Buffer, _value: number[]) => { return client.encode("94E38624", ["bytes32", "uint256[]"], _id, _value); },
        transferOwnership: (_newOwner: string) => { return client.encode("F2FDE38B", ["address"], _newOwner); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        ERC165_ID_Address_Scopes: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        EVENT_ID_DATA_STORAGE: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ENTITIES_ADDRESS_SCOPES: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_PROCESS_INSTANCES: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        abort: (): void => { return; },
        addProcessStateChangeListener: (): void => { return; },
        compareArtifactVersion: (): {
            result: number;
        } => {
            const [result] = client.decode(data, ["int256"]);
            return { result: result };
        },
        completeActivity: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        completeActivityWithAddressData: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        completeActivityWithBoolData: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        completeActivityWithBytes32Data: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        completeActivityWithIntData: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        completeActivityWithStringData: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        completeActivityWithUintData: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        execute: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        getActivityInDataAsAddress: (): [string] => { return client.decode(data, ["address"]); },
        getActivityInDataAsBool: (): [boolean] => { return client.decode(data, ["bool"]); },
        getActivityInDataAsBytes32: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getActivityInDataAsInt: (): [number] => { return client.decode(data, ["int256"]); },
        getActivityInDataAsString: (): [string] => { return client.decode(data, ["string"]); },
        getActivityInDataAsUint: (): [number] => { return client.decode(data, ["uint256"]); },
        getActivityInstanceAtIndex: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getActivityInstanceData: (): {
            activityId: Buffer;
            created: number;
            completed: number;
            performer: string;
            completedBy: string;
            state: number;
        } => {
            const [activityId, created, completed, performer, completedBy, state] = client.decode(data, ["bytes32", "uint256", "uint256", "address", "address", "uint8"]);
            return { activityId: activityId, created: created, completed: completed, performer: performer, completedBy: completedBy, state: state };
        },
        getAddressScopeDetails: (): {
            fixedScope: Buffer;
            dataPath: Buffer;
            dataStorageId: Buffer;
            dataStorage: string;
        } => {
            const [fixedScope, dataPath, dataStorageId, dataStorage] = client.decode(data, ["bytes32", "bytes32", "bytes32", "address"]);
            return { fixedScope: fixedScope, dataPath: dataPath, dataStorageId: dataStorageId, dataStorage: dataStorage };
        },
        getAddressScopeDetailsForKey: (): {
            keyAddress: string;
            keyContext: Buffer;
            fixedScope: Buffer;
            dataPath: Buffer;
            dataStorageId: Buffer;
            dataStorage: string;
        } => {
            const [keyAddress, keyContext, fixedScope, dataPath, dataStorageId, dataStorage] = client.decode(data, ["address", "bytes32", "bytes32", "bytes32", "bytes32", "address"]);
            return { keyAddress: keyAddress, keyContext: keyContext, fixedScope: fixedScope, dataPath: dataPath, dataStorageId: dataStorageId, dataStorage: dataStorage };
        },
        getAddressScopeKeys: (): [Buffer[]] => { return client.decode(data, ["bytes32[]"]); },
        getArrayLength: (): [number] => { return client.decode(data, ["uint256"]); },
        getArtifactVersion: (): [[number, number, number]] => { return client.decode(data, ["uint8[3]"]); },
        getArtifactVersionMajor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionMinor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionPatch: (): [number] => { return client.decode(data, ["uint8"]); },
        getDataIdAtIndex: (): {
            error: number;
            id: Buffer;
        } => {
            const [error, id] = client.decode(data, ["uint256", "bytes32"]);
            return { error: error, id: id };
        },
        getDataType: (): [number] => { return client.decode(data, ["uint8"]); },
        getDataValueAsAddress: (): [string] => { return client.decode(data, ["address"]); },
        getDataValueAsAddressArray: (): [string[]] => { return client.decode(data, ["address[]"]); },
        getDataValueAsBool: (): [boolean] => { return client.decode(data, ["bool"]); },
        getDataValueAsBoolArray: (): [boolean[]] => { return client.decode(data, ["bool[]"]); },
        getDataValueAsBytes32: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getDataValueAsBytes32Array: (): [Buffer[]] => { return client.decode(data, ["bytes32[]"]); },
        getDataValueAsInt: (): [number] => { return client.decode(data, ["int256"]); },
        getDataValueAsIntArray: (): [number[]] => { return client.decode(data, ["int256[]"]); },
        getDataValueAsString: (): [string] => { return client.decode(data, ["string"]); },
        getDataValueAsUint: (): [number] => { return client.decode(data, ["uint256"]); },
        getDataValueAsUintArray: (): [number[]] => { return client.decode(data, ["uint256[]"]); },
        getNumberOfActivityInstances: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfData: (): [number] => { return client.decode(data, ["uint256"]); },
        getProcessDefinition: (): [string] => { return client.decode(data, ["address"]); },
        getStartedBy: (): [string] => { return client.decode(data, ["address"]); },
        getState: (): [number] => { return client.decode(data, ["uint8"]); },
        initRuntime: (): void => { return; },
        initialize: (): void => { return; },
        notifyProcessStateChange: (): void => { return; },
        removeData: (): void => { return; },
        resolveAddressScope: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        resolveInDataLocation: (): {
            dataStorage: string;
            dataPath: Buffer;
        } => {
            const [dataStorage, dataPath] = client.decode(data, ["address", "bytes32"]);
            return { dataStorage: dataStorage, dataPath: dataPath };
        },
        resolveOutDataLocation: (): {
            dataStorage: string;
            dataPath: Buffer;
        } => {
            const [dataStorage, dataPath] = client.decode(data, ["address", "bytes32"]);
            return { dataStorage: dataStorage, dataPath: dataPath };
        },
        resolveTransitionCondition: (): [boolean] => { return client.decode(data, ["bool"]); },
        setActivityOutDataAsAddress: (): void => { return; },
        setActivityOutDataAsBool: (): void => { return; },
        setActivityOutDataAsBytes32: (): void => { return; },
        setActivityOutDataAsInt: (): void => { return; },
        setActivityOutDataAsString: (): void => { return; },
        setActivityOutDataAsUint: (): void => { return; },
        setAddressScope: (): void => { return; },
        setDataValueAsAddress: (): void => { return; },
        setDataValueAsAddressArray: (): void => { return; },
        setDataValueAsBool: (): void => { return; },
        setDataValueAsBoolArray: (): void => { return; },
        setDataValueAsBytes32: (): void => { return; },
        setDataValueAsBytes32Array: (): void => { return; },
        setDataValueAsInt: (): void => { return; },
        setDataValueAsIntArray: (): void => { return; },
        setDataValueAsString: (): void => { return; },
        setDataValueAsUint: (): void => { return; },
        setDataValueAsUintArray: (): void => { return; },
        transferOwnership: (): void => { return; }
    }; };
}