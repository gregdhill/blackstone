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
export module ProcessDefinition {
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        LogActivityDefinitionCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogActivityDefinitionCreation", this.address, callback); }
        LogDataMappingCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDataMappingCreation", this.address, callback); }
        LogProcessDefinitionCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogProcessDefinitionCreation", this.address, callback); }
        LogProcessDefinitionInterfaceIdUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogProcessDefinitionInterfaceIdUpdate", this.address, callback); }
        ERC165_ID_VERSIONED_ARTIFACT() {
            const data = Encode(this.client).ERC165_ID_VERSIONED_ARTIFACT();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ERC165_ID_VERSIONED_ARTIFACT();
            });
        }
        EVENT_ID_ACTIVITY_DEFINITIONS() {
            const data = Encode(this.client).EVENT_ID_ACTIVITY_DEFINITIONS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ACTIVITY_DEFINITIONS();
            });
        }
        EVENT_ID_DATA_MAPPINGS() {
            const data = Encode(this.client).EVENT_ID_DATA_MAPPINGS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_DATA_MAPPINGS();
            });
        }
        EVENT_ID_PROCESS_DEFINITIONS() {
            const data = Encode(this.client).EVENT_ID_PROCESS_DEFINITIONS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_PROCESS_DEFINITIONS();
            });
        }
        addProcessInterfaceImplementation(_model: string, _interfaceId: Buffer) {
            const data = Encode(this.client).addProcessInterfaceImplementation(_model, _interfaceId);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addProcessInterfaceImplementation();
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
        createActivityDefinition(_id: Buffer, _activityType: number, _taskType: number, _behavior: number, _assignee: Buffer, _multiInstance: boolean, _application: Buffer, _subProcessModelId: Buffer, _subProcessDefinitionId: Buffer) {
            const data = Encode(this.client).createActivityDefinition(_id, _activityType, _taskType, _behavior, _assignee, _multiInstance, _application, _subProcessModelId, _subProcessDefinitionId);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createActivityDefinition();
            });
        }
        createDataMapping(_activityId: Buffer, _direction: number, _accessPath: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string) {
            const data = Encode(this.client).createDataMapping(_activityId, _direction, _accessPath, _dataPath, _dataStorageId, _dataStorage);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createDataMapping();
            });
        }
        createGateway(_id: Buffer, _type: number) {
            const data = Encode(this.client).createGateway(_id, _type);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createGateway();
            });
        }
        createTransition(_source: Buffer, _target: Buffer) {
            const data = Encode(this.client).createTransition(_source, _target);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createTransition();
            });
        }
        createTransitionConditionForAddress(_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: string) {
            const data = Encode(this.client).createTransitionConditionForAddress(_gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createTransitionConditionForAddress();
            });
        }
        createTransitionConditionForBool(_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: boolean) {
            const data = Encode(this.client).createTransitionConditionForBool(_gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createTransitionConditionForBool();
            });
        }
        createTransitionConditionForBytes32(_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: Buffer) {
            const data = Encode(this.client).createTransitionConditionForBytes32(_gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createTransitionConditionForBytes32();
            });
        }
        createTransitionConditionForDataStorage(_gatewayId: Buffer, _targetElementId: Buffer, _lhDataPath: Buffer, _lhDataStorageId: Buffer, _lhDataStorage: string, _operator: number, _rhDataPath: Buffer, _rhDataStorageId: Buffer, _rhDataStorage: string) {
            const data = Encode(this.client).createTransitionConditionForDataStorage(_gatewayId, _targetElementId, _lhDataPath, _lhDataStorageId, _lhDataStorage, _operator, _rhDataPath, _rhDataStorageId, _rhDataStorage);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createTransitionConditionForDataStorage();
            });
        }
        createTransitionConditionForInt(_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: number) {
            const data = Encode(this.client).createTransitionConditionForInt(_gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createTransitionConditionForInt();
            });
        }
        createTransitionConditionForString(_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: string) {
            const data = Encode(this.client).createTransitionConditionForString(_gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createTransitionConditionForString();
            });
        }
        createTransitionConditionForUint(_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: number) {
            const data = Encode(this.client).createTransitionConditionForUint(_gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createTransitionConditionForUint();
            });
        }
        getActivitiesForParticipant(_participantId: Buffer) {
            const data = Encode(this.client).getActivitiesForParticipant(_participantId);
            return Call<Tx, [Buffer[]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivitiesForParticipant();
            });
        }
        getActivityAtIndex(_index: number) {
            const data = Encode(this.client).getActivityAtIndex(_index);
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityAtIndex();
            });
        }
        getActivityData(_id: Buffer) {
            const data = Encode(this.client).getActivityData(_id);
            return Call<Tx, {
                activityType: number;
                taskType: number;
                taskBehavior: number;
                assignee: Buffer;
                multiInstance: boolean;
                application: Buffer;
                subProcessModelId: Buffer;
                subProcessDefinitionId: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityData();
            });
        }
        getActivityGraphDetails(_id: Buffer) {
            const data = Encode(this.client).getActivityGraphDetails(_id);
            return Call<Tx, {
                predecessor: Buffer;
                successor: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityGraphDetails();
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
        getElementType(_id: Buffer) {
            const data = Encode(this.client).getElementType(_id);
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getElementType();
            });
        }
        getGatewayGraphDetails(_id: Buffer) {
            const data = Encode(this.client).getGatewayGraphDetails(_id);
            return Call<Tx, {
                inputs: Buffer[];
                outputs: Buffer[];
                gatewayType: number;
                defaultOutput: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getGatewayGraphDetails();
            });
        }
        getId() {
            const data = Encode(this.client).getId();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getId();
            });
        }
        getImplementedProcessInterfaceAtIndex(_idx: number) {
            const data = Encode(this.client).getImplementedProcessInterfaceAtIndex(_idx);
            return Call<Tx, {
                modelAddress: string;
                interfaceId: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getImplementedProcessInterfaceAtIndex();
            });
        }
        getInDataMappingDetails(_activityId: Buffer, _id: Buffer) {
            const data = Encode(this.client).getInDataMappingDetails(_activityId, _id);
            return Call<Tx, {
                dataMappingId: Buffer;
                accessPath: Buffer;
                dataPath: Buffer;
                dataStorageId: Buffer;
                dataStorage: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getInDataMappingDetails();
            });
        }
        getInDataMappingIdAtIndex(_activityId: Buffer, _idx: number) {
            const data = Encode(this.client).getInDataMappingIdAtIndex(_activityId, _idx);
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getInDataMappingIdAtIndex();
            });
        }
        getInDataMappingKeys(_activityId: Buffer) {
            const data = Encode(this.client).getInDataMappingKeys(_activityId);
            return Call<Tx, [Buffer[]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getInDataMappingKeys();
            });
        }
        getModel() {
            const data = Encode(this.client).getModel();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getModel();
            });
        }
        getModelId() {
            const data = Encode(this.client).getModelId();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getModelId();
            });
        }
        getNumberOfActivities() {
            const data = Encode(this.client).getNumberOfActivities();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfActivities();
            });
        }
        getNumberOfImplementedProcessInterfaces() {
            const data = Encode(this.client).getNumberOfImplementedProcessInterfaces();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfImplementedProcessInterfaces();
            });
        }
        getNumberOfInDataMappings(_activityId: Buffer) {
            const data = Encode(this.client).getNumberOfInDataMappings(_activityId);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfInDataMappings();
            });
        }
        getNumberOfOutDataMappings(_activityId: Buffer) {
            const data = Encode(this.client).getNumberOfOutDataMappings(_activityId);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfOutDataMappings();
            });
        }
        getOutDataMappingDetails(_activityId: Buffer, _id: Buffer) {
            const data = Encode(this.client).getOutDataMappingDetails(_activityId, _id);
            return Call<Tx, {
                dataMappingId: Buffer;
                accessPath: Buffer;
                dataPath: Buffer;
                dataStorageId: Buffer;
                dataStorage: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOutDataMappingDetails();
            });
        }
        getOutDataMappingIdAtIndex(_activityId: Buffer, _idx: number) {
            const data = Encode(this.client).getOutDataMappingIdAtIndex(_activityId, _idx);
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOutDataMappingIdAtIndex();
            });
        }
        getOutDataMappingKeys(_activityId: Buffer) {
            const data = Encode(this.client).getOutDataMappingKeys(_activityId);
            return Call<Tx, [Buffer[]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOutDataMappingKeys();
            });
        }
        getStartActivity() {
            const data = Encode(this.client).getStartActivity();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getStartActivity();
            });
        }
        implementsProcessInterface(_model: string, _interfaceId: Buffer) {
            const data = Encode(this.client).implementsProcessInterface(_model, _interfaceId);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).implementsProcessInterface();
            });
        }
        initialize(_id: Buffer, _model: string) {
            const data = Encode(this.client).initialize(_id, _model);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).initialize();
            });
        }
        isValid() {
            const data = Encode(this.client).isValid();
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).isValid();
            });
        }
        modelElementExists(_id: Buffer) {
            const data = Encode(this.client).modelElementExists(_id);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).modelElementExists();
            });
        }
        resolveTransitionCondition(_sourceId: Buffer, _targetId: Buffer, _dataStorage: string) {
            const data = Encode(this.client).resolveTransitionCondition(_sourceId, _targetId, _dataStorage);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).resolveTransitionCondition();
            });
        }
        setDefaultTransition(_gatewayId: Buffer, _targetElementId: Buffer) {
            const data = Encode(this.client).setDefaultTransition(_gatewayId, _targetElementId);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setDefaultTransition();
            });
        }
        validate() {
            const data = Encode(this.client).validate();
            return Call<Tx, {
                result: boolean;
                errorMessage: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).validate();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        ERC165_ID_VERSIONED_ARTIFACT: () => { return client.encode("E10533C6", []); },
        EVENT_ID_ACTIVITY_DEFINITIONS: () => { return client.encode("AF201B90", []); },
        EVENT_ID_DATA_MAPPINGS: () => { return client.encode("6983067E", []); },
        EVENT_ID_PROCESS_DEFINITIONS: () => { return client.encode("BA840F64", []); },
        addProcessInterfaceImplementation: (_model: string, _interfaceId: Buffer) => { return client.encode("F001897D", ["address", "bytes32"], _model, _interfaceId); },
        compareArtifactVersion: (_other: string, _version: [number, number, number]) => {
            if (typeof _other === "string")
                return client.encode("5C030138", ["address"], _other);
            if (typeof _version === "string")
                return client.encode("78BC0B0D", ["uint8[3]"], _version);
        },
        createActivityDefinition: (_id: Buffer, _activityType: number, _taskType: number, _behavior: number, _assignee: Buffer, _multiInstance: boolean, _application: Buffer, _subProcessModelId: Buffer, _subProcessDefinitionId: Buffer) => { return client.encode("BDE6EF58", ["bytes32", "uint8", "uint8", "uint8", "bytes32", "bool", "bytes32", "bytes32", "bytes32"], _id, _activityType, _taskType, _behavior, _assignee, _multiInstance, _application, _subProcessModelId, _subProcessDefinitionId); },
        createDataMapping: (_activityId: Buffer, _direction: number, _accessPath: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string) => { return client.encode("C5930E29", ["bytes32", "uint8", "bytes32", "bytes32", "bytes32", "address"], _activityId, _direction, _accessPath, _dataPath, _dataStorageId, _dataStorage); },
        createGateway: (_id: Buffer, _type: number) => { return client.encode("32D37781", ["bytes32", "uint8"], _id, _type); },
        createTransition: (_source: Buffer, _target: Buffer) => { return client.encode("6C28E102", ["bytes32", "bytes32"], _source, _target); },
        createTransitionConditionForAddress: (_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: string) => { return client.encode("DD2F3E84", ["bytes32", "bytes32", "bytes32", "bytes32", "address", "uint8", "address"], _gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value); },
        createTransitionConditionForBool: (_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: boolean) => { return client.encode("3D34113E", ["bytes32", "bytes32", "bytes32", "bytes32", "address", "uint8", "bool"], _gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value); },
        createTransitionConditionForBytes32: (_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: Buffer) => { return client.encode("23FF5DD3", ["bytes32", "bytes32", "bytes32", "bytes32", "address", "uint8", "bytes32"], _gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value); },
        createTransitionConditionForDataStorage: (_gatewayId: Buffer, _targetElementId: Buffer, _lhDataPath: Buffer, _lhDataStorageId: Buffer, _lhDataStorage: string, _operator: number, _rhDataPath: Buffer, _rhDataStorageId: Buffer, _rhDataStorage: string) => { return client.encode("B2816749", ["bytes32", "bytes32", "bytes32", "bytes32", "address", "uint8", "bytes32", "bytes32", "address"], _gatewayId, _targetElementId, _lhDataPath, _lhDataStorageId, _lhDataStorage, _operator, _rhDataPath, _rhDataStorageId, _rhDataStorage); },
        createTransitionConditionForInt: (_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: number) => { return client.encode("26417651", ["bytes32", "bytes32", "bytes32", "bytes32", "address", "uint8", "int256"], _gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value); },
        createTransitionConditionForString: (_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: string) => { return client.encode("8EFB695C", ["bytes32", "bytes32", "bytes32", "bytes32", "address", "uint8", "string"], _gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value); },
        createTransitionConditionForUint: (_gatewayId: Buffer, _targetElementId: Buffer, _dataPath: Buffer, _dataStorageId: Buffer, _dataStorage: string, _operator: number, _value: number) => { return client.encode("5316C206", ["bytes32", "bytes32", "bytes32", "bytes32", "address", "uint8", "uint256"], _gatewayId, _targetElementId, _dataPath, _dataStorageId, _dataStorage, _operator, _value); },
        getActivitiesForParticipant: (_participantId: Buffer) => { return client.encode("14E42605", ["bytes32"], _participantId); },
        getActivityAtIndex: (_index: number) => { return client.encode("3BF2C2A0", ["uint256"], _index); },
        getActivityData: (_id: Buffer) => { return client.encode("758CBD2E", ["bytes32"], _id); },
        getActivityGraphDetails: (_id: Buffer) => { return client.encode("5B4025E1", ["bytes32"], _id); },
        getArtifactVersion: () => { return client.encode("756B2E6C", []); },
        getArtifactVersionMajor: () => { return client.encode("57E0EBCA", []); },
        getArtifactVersionMinor: () => { return client.encode("7589ADB7", []); },
        getArtifactVersionPatch: () => { return client.encode("F085F6DD", []); },
        getElementType: (_id: Buffer) => { return client.encode("9C4AA334", ["bytes32"], _id); },
        getGatewayGraphDetails: (_id: Buffer) => { return client.encode("79238A10", ["bytes32"], _id); },
        getId: () => { return client.encode("5D1CA631", []); },
        getImplementedProcessInterfaceAtIndex: (_idx: number) => { return client.encode("4B53BE1D", ["uint256"], _idx); },
        getInDataMappingDetails: (_activityId: Buffer, _id: Buffer) => { return client.encode("E3621D20", ["bytes32", "bytes32"], _activityId, _id); },
        getInDataMappingIdAtIndex: (_activityId: Buffer, _idx: number) => { return client.encode("15064393", ["bytes32", "uint256"], _activityId, _idx); },
        getInDataMappingKeys: (_activityId: Buffer) => { return client.encode("3D9A2352", ["bytes32"], _activityId); },
        getModel: () => { return client.encode("A0BFA1E0", []); },
        getModelId: () => { return client.encode("361A5672", []); },
        getNumberOfActivities: () => { return client.encode("006129D9", []); },
        getNumberOfImplementedProcessInterfaces: () => { return client.encode("B24B4BCC", []); },
        getNumberOfInDataMappings: (_activityId: Buffer) => { return client.encode("2B8C74CE", ["bytes32"], _activityId); },
        getNumberOfOutDataMappings: (_activityId: Buffer) => { return client.encode("AE73D8B3", ["bytes32"], _activityId); },
        getOutDataMappingDetails: (_activityId: Buffer, _id: Buffer) => { return client.encode("3A70DCEF", ["bytes32", "bytes32"], _activityId, _id); },
        getOutDataMappingIdAtIndex: (_activityId: Buffer, _idx: number) => { return client.encode("3796D3A4", ["bytes32", "uint256"], _activityId, _idx); },
        getOutDataMappingKeys: (_activityId: Buffer) => { return client.encode("08A104AA", ["bytes32"], _activityId); },
        getStartActivity: () => { return client.encode("0F9C79E2", []); },
        implementsProcessInterface: (_model: string, _interfaceId: Buffer) => { return client.encode("77198ED4", ["address", "bytes32"], _model, _interfaceId); },
        initialize: (_id: Buffer, _model: string) => { return client.encode("6910E334", ["bytes32", "address"], _id, _model); },
        isValid: () => { return client.encode("BB5D40EB", []); },
        modelElementExists: (_id: Buffer) => { return client.encode("E3C83A16", ["bytes32"], _id); },
        resolveTransitionCondition: (_sourceId: Buffer, _targetId: Buffer, _dataStorage: string) => { return client.encode("5478A0C9", ["bytes32", "bytes32", "address"], _sourceId, _targetId, _dataStorage); },
        setDefaultTransition: (_gatewayId: Buffer, _targetElementId: Buffer) => { return client.encode("21A0C66F", ["bytes32", "bytes32"], _gatewayId, _targetElementId); },
        validate: () => { return client.encode("6901F668", []); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        EVENT_ID_ACTIVITY_DEFINITIONS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_DATA_MAPPINGS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_PROCESS_DEFINITIONS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        addProcessInterfaceImplementation: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        compareArtifactVersion: (): {
            result: number;
        } => {
            const [result] = client.decode(data, ["int256"]);
            return { result: result };
        },
        createActivityDefinition: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        createDataMapping: (): void => { return; },
        createGateway: (): void => { return; },
        createTransition: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        createTransitionConditionForAddress: (): void => { return; },
        createTransitionConditionForBool: (): void => { return; },
        createTransitionConditionForBytes32: (): void => { return; },
        createTransitionConditionForDataStorage: (): void => { return; },
        createTransitionConditionForInt: (): void => { return; },
        createTransitionConditionForString: (): void => { return; },
        createTransitionConditionForUint: (): void => { return; },
        getActivitiesForParticipant: (): [Buffer[]] => { return client.decode(data, ["bytes32[]"]); },
        getActivityAtIndex: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getActivityData: (): {
            activityType: number;
            taskType: number;
            taskBehavior: number;
            assignee: Buffer;
            multiInstance: boolean;
            application: Buffer;
            subProcessModelId: Buffer;
            subProcessDefinitionId: Buffer;
        } => {
            const [activityType, taskType, taskBehavior, assignee, multiInstance, application, subProcessModelId, subProcessDefinitionId] = client.decode(data, ["uint8", "uint8", "uint8", "bytes32", "bool", "bytes32", "bytes32", "bytes32"]);
            return { activityType: activityType, taskType: taskType, taskBehavior: taskBehavior, assignee: assignee, multiInstance: multiInstance, application: application, subProcessModelId: subProcessModelId, subProcessDefinitionId: subProcessDefinitionId };
        },
        getActivityGraphDetails: (): {
            predecessor: Buffer;
            successor: Buffer;
        } => {
            const [predecessor, successor] = client.decode(data, ["bytes32", "bytes32"]);
            return { predecessor: predecessor, successor: successor };
        },
        getArtifactVersion: (): [[number, number, number]] => { return client.decode(data, ["uint8[3]"]); },
        getArtifactVersionMajor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionMinor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionPatch: (): [number] => { return client.decode(data, ["uint8"]); },
        getElementType: (): [number] => { return client.decode(data, ["uint8"]); },
        getGatewayGraphDetails: (): {
            inputs: Buffer[];
            outputs: Buffer[];
            gatewayType: number;
            defaultOutput: Buffer;
        } => {
            const [inputs, outputs, gatewayType, defaultOutput] = client.decode(data, ["bytes32[]", "bytes32[]", "uint8", "bytes32"]);
            return { inputs: inputs, outputs: outputs, gatewayType: gatewayType, defaultOutput: defaultOutput };
        },
        getId: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getImplementedProcessInterfaceAtIndex: (): {
            modelAddress: string;
            interfaceId: Buffer;
        } => {
            const [modelAddress, interfaceId] = client.decode(data, ["address", "bytes32"]);
            return { modelAddress: modelAddress, interfaceId: interfaceId };
        },
        getInDataMappingDetails: (): {
            dataMappingId: Buffer;
            accessPath: Buffer;
            dataPath: Buffer;
            dataStorageId: Buffer;
            dataStorage: string;
        } => {
            const [dataMappingId, accessPath, dataPath, dataStorageId, dataStorage] = client.decode(data, ["bytes32", "bytes32", "bytes32", "bytes32", "address"]);
            return { dataMappingId: dataMappingId, accessPath: accessPath, dataPath: dataPath, dataStorageId: dataStorageId, dataStorage: dataStorage };
        },
        getInDataMappingIdAtIndex: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getInDataMappingKeys: (): [Buffer[]] => { return client.decode(data, ["bytes32[]"]); },
        getModel: (): [string] => { return client.decode(data, ["address"]); },
        getModelId: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getNumberOfActivities: (): [number] => { return client.decode(data, ["uint256"]); },
        getNumberOfImplementedProcessInterfaces: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfInDataMappings: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfOutDataMappings: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getOutDataMappingDetails: (): {
            dataMappingId: Buffer;
            accessPath: Buffer;
            dataPath: Buffer;
            dataStorageId: Buffer;
            dataStorage: string;
        } => {
            const [dataMappingId, accessPath, dataPath, dataStorageId, dataStorage] = client.decode(data, ["bytes32", "bytes32", "bytes32", "bytes32", "address"]);
            return { dataMappingId: dataMappingId, accessPath: accessPath, dataPath: dataPath, dataStorageId: dataStorageId, dataStorage: dataStorage };
        },
        getOutDataMappingIdAtIndex: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getOutDataMappingKeys: (): [Buffer[]] => { return client.decode(data, ["bytes32[]"]); },
        getStartActivity: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        implementsProcessInterface: (): [boolean] => { return client.decode(data, ["bool"]); },
        initialize: (): void => { return; },
        isValid: (): [boolean] => { return client.decode(data, ["bool"]); },
        modelElementExists: (): [boolean] => { return client.decode(data, ["bool"]); },
        resolveTransitionCondition: (): [boolean] => { return client.decode(data, ["bool"]); },
        setDefaultTransition: (): void => { return; },
        validate: (): {
            result: boolean;
            errorMessage: Buffer;
        } => {
            const [result, errorMessage] = client.decode(data, ["bool", "bytes32"]);
            return { result: result, errorMessage: errorMessage };
        }
    }; };
}