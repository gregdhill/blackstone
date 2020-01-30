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
export module BpmService {
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        ERC165_ID_ObjectFactory() {
            const data = Encode(this.client).ERC165_ID_ObjectFactory();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ERC165_ID_ObjectFactory();
            });
        }
        ERC165_ID_Upgradeable() {
            const data = Encode(this.client).ERC165_ID_Upgradeable();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ERC165_ID_Upgradeable();
            });
        }
        ERC165_ID_VERSIONED_ARTIFACT() {
            const data = Encode(this.client).ERC165_ID_VERSIONED_ARTIFACT();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ERC165_ID_VERSIONED_ARTIFACT();
            });
        }
        OBJECT_CLASS_PROCESS_INSTANCE() {
            const data = Encode(this.client).OBJECT_CLASS_PROCESS_INSTANCE();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).OBJECT_CLASS_PROCESS_INSTANCE();
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
        createDefaultProcessInstance(_processDefinition: string, _startedBy: string, _activityInstanceId: Buffer) {
            const data = Encode(this.client).createDefaultProcessInstance(_processDefinition, _startedBy, _activityInstanceId);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createDefaultProcessInstance();
            });
        }
        getActivityInstanceAtIndex(_address: string, _pos: number) {
            const data = Encode(this.client).getActivityInstanceAtIndex(_address, _pos);
            return Call<Tx, {
                activityId: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getActivityInstanceAtIndex();
            });
        }
        getActivityInstanceData(_processInstance: string, _id: Buffer) {
            const data = Encode(this.client).getActivityInstanceData(_processInstance, _id);
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
        getAddressScopeDetails(_processInstance: string, _key: Buffer) {
            const data = Encode(this.client).getAddressScopeDetails(_processInstance, _key);
            return Call<Tx, {
                keyAddress: string;
                keyContext: Buffer;
                fixedScope: Buffer;
                dataPath: Buffer;
                dataStorageId: Buffer;
                dataStorage: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAddressScopeDetails();
            });
        }
        getAddressScopeKeyAtIndex(_processInstance: string, _index: number) {
            const data = Encode(this.client).getAddressScopeKeyAtIndex(_processInstance, _index);
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAddressScopeKeyAtIndex();
            });
        }
        getApplicationRegistry() {
            const data = Encode(this.client).getApplicationRegistry();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getApplicationRegistry();
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
        getBpmServiceDb() {
            const data = Encode(this.client).getBpmServiceDb();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getBpmServiceDb();
            });
        }
        getNumberOfActivityInstances(_address: string) {
            const data = Encode(this.client).getNumberOfActivityInstances(_address);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfActivityInstances();
            });
        }
        getNumberOfAddressScopes(_processInstance: string) {
            const data = Encode(this.client).getNumberOfAddressScopes(_processInstance);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfAddressScopes();
            });
        }
        getNumberOfProcessData(_address: string) {
            const data = Encode(this.client).getNumberOfProcessData(_address);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfProcessData();
            });
        }
        getNumberOfProcessInstances() {
            const data = Encode(this.client).getNumberOfProcessInstances();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfProcessInstances();
            });
        }
        getProcessDataAtIndex(_address: string, _pos: number) {
            const data = Encode(this.client).getProcessDataAtIndex(_address, _pos);
            return Call<Tx, {
                dataId: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getProcessDataAtIndex();
            });
        }
        getProcessDataDetails(_address: string, _dataId: Buffer) {
            const data = Encode(this.client).getProcessDataDetails(_address, _dataId);
            return Call<Tx, {
                uintValue: number;
                intValue: number;
                bytes32Value: Buffer;
                addressValue: string;
                boolValue: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getProcessDataDetails();
            });
        }
        getProcessInstanceAtIndex(_pos: number) {
            const data = Encode(this.client).getProcessInstanceAtIndex(_pos);
            return Call<Tx, {
                processInstanceAddress: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getProcessInstanceAtIndex();
            });
        }
        getProcessInstanceData(_address: string) {
            const data = Encode(this.client).getProcessInstanceData(_address);
            return Call<Tx, {
                processDefinition: string;
                state: number;
                startedBy: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getProcessInstanceData();
            });
        }
        getProcessInstanceForActivity(_aiId: Buffer) {
            const data = Encode(this.client).getProcessInstanceForActivity(_aiId);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getProcessInstanceForActivity();
            });
        }
        getProcessModelRepository() {
            const data = Encode(this.client).getProcessModelRepository();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getProcessModelRepository();
            });
        }
        startProcess(_processDefinition: string, _activityInstanceId: Buffer) {
            const data = Encode(this.client).startProcess(_processDefinition, _activityInstanceId);
            return Call<Tx, [number, string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).startProcess();
            });
        }
        startProcessFromRepository(_modelId: Buffer, _processDefinitionId: Buffer, _activityInstanceId: Buffer) {
            const data = Encode(this.client).startProcessFromRepository(_modelId, _processDefinitionId, _activityInstanceId);
            return Call<Tx, [number, string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).startProcessFromRepository();
            });
        }
        startProcessInstance(_pi: string) {
            const data = Encode(this.client).startProcessInstance(_pi);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).startProcessInstance();
            });
        }
        upgrade(_successor: string) {
            const data = Encode(this.client).upgrade(_successor);
            return Call<Tx, {
                success: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).upgrade();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        ERC165_ID_ObjectFactory: () => { return client.encode("54AF67B7", []); },
        ERC165_ID_Upgradeable: () => { return client.encode("B21C815F", []); },
        ERC165_ID_VERSIONED_ARTIFACT: () => { return client.encode("E10533C6", []); },
        OBJECT_CLASS_PROCESS_INSTANCE: () => { return client.encode("16CE4DBB", []); },
        compareArtifactVersion: (_other: string, _version: [number, number, number]) => {
            if (typeof _other === "string")
                return client.encode("5C030138", ["address"], _other);
            if (typeof _version === "string")
                return client.encode("78BC0B0D", ["uint8[3]"], _version);
        },
        createDefaultProcessInstance: (_processDefinition: string, _startedBy: string, _activityInstanceId: Buffer) => { return client.encode("1958AA55", ["address", "address", "bytes32"], _processDefinition, _startedBy, _activityInstanceId); },
        getActivityInstanceAtIndex: (_address: string, _pos: number) => { return client.encode("8C57C3CC", ["address", "uint256"], _address, _pos); },
        getActivityInstanceData: (_processInstance: string, _id: Buffer) => { return client.encode("3E0560AE", ["address", "bytes32"], _processInstance, _id); },
        getAddressScopeDetails: (_processInstance: string, _key: Buffer) => { return client.encode("9561AA32", ["address", "bytes32"], _processInstance, _key); },
        getAddressScopeKeyAtIndex: (_processInstance: string, _index: number) => { return client.encode("D10ECE59", ["address", "uint256"], _processInstance, _index); },
        getApplicationRegistry: () => { return client.encode("BF172029", []); },
        getArtifactVersion: () => { return client.encode("756B2E6C", []); },
        getArtifactVersionMajor: () => { return client.encode("57E0EBCA", []); },
        getArtifactVersionMinor: () => { return client.encode("7589ADB7", []); },
        getArtifactVersionPatch: () => { return client.encode("F085F6DD", []); },
        getBpmServiceDb: () => { return client.encode("879B4748", []); },
        getNumberOfActivityInstances: (_address: string) => { return client.encode("1B645F63", ["address"], _address); },
        getNumberOfAddressScopes: (_processInstance: string) => { return client.encode("8CBD319A", ["address"], _processInstance); },
        getNumberOfProcessData: (_address: string) => { return client.encode("1FF4729E", ["address"], _address); },
        getNumberOfProcessInstances: () => { return client.encode("57F31A6C", []); },
        getProcessDataAtIndex: (_address: string, _pos: number) => { return client.encode("2BAA38C3", ["address", "uint256"], _address, _pos); },
        getProcessDataDetails: (_address: string, _dataId: Buffer) => { return client.encode("E18FD821", ["address", "bytes32"], _address, _dataId); },
        getProcessInstanceAtIndex: (_pos: number) => { return client.encode("20CC0184", ["uint256"], _pos); },
        getProcessInstanceData: (_address: string) => { return client.encode("E3234C71", ["address"], _address); },
        getProcessInstanceForActivity: (_aiId: Buffer) => { return client.encode("9CA651F8", ["bytes32"], _aiId); },
        getProcessModelRepository: () => { return client.encode("F97AD99E", []); },
        startProcess: (_processDefinition: string, _activityInstanceId: Buffer) => { return client.encode("1CF5A4C9", ["address", "bytes32"], _processDefinition, _activityInstanceId); },
        startProcessFromRepository: (_modelId: Buffer, _processDefinitionId: Buffer, _activityInstanceId: Buffer) => { return client.encode("B82A6E38", ["bytes32", "bytes32", "bytes32"], _modelId, _processDefinitionId, _activityInstanceId); },
        startProcessInstance: (_pi: string) => { return client.encode("45D31DA9", ["address"], _pi); },
        upgrade: (_successor: string) => { return client.encode("0900F010", ["address"], _successor); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        ERC165_ID_ObjectFactory: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_Upgradeable: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        OBJECT_CLASS_PROCESS_INSTANCE: (): [string] => { return client.decode(data, ["string"]); },
        compareArtifactVersion: (): {
            result: number;
        } => {
            const [result] = client.decode(data, ["int256"]);
            return { result: result };
        },
        createDefaultProcessInstance: (): [string] => { return client.decode(data, ["address"]); },
        getActivityInstanceAtIndex: (): {
            activityId: Buffer;
        } => {
            const [activityId] = client.decode(data, ["bytes32"]);
            return { activityId: activityId };
        },
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
        getAddressScopeKeyAtIndex: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getApplicationRegistry: (): [string] => { return client.decode(data, ["address"]); },
        getArtifactVersion: (): [[number, number, number]] => { return client.decode(data, ["uint8[3]"]); },
        getArtifactVersionMajor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionMinor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionPatch: (): [number] => { return client.decode(data, ["uint8"]); },
        getBpmServiceDb: (): [string] => { return client.decode(data, ["address"]); },
        getNumberOfActivityInstances: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfAddressScopes: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfProcessData: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfProcessInstances: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getProcessDataAtIndex: (): {
            dataId: Buffer;
        } => {
            const [dataId] = client.decode(data, ["bytes32"]);
            return { dataId: dataId };
        },
        getProcessDataDetails: (): {
            uintValue: number;
            intValue: number;
            bytes32Value: Buffer;
            addressValue: string;
            boolValue: boolean;
        } => {
            const [uintValue, intValue, bytes32Value, addressValue, boolValue] = client.decode(data, ["uint256", "int256", "bytes32", "address", "bool"]);
            return { uintValue: uintValue, intValue: intValue, bytes32Value: bytes32Value, addressValue: addressValue, boolValue: boolValue };
        },
        getProcessInstanceAtIndex: (): {
            processInstanceAddress: string;
        } => {
            const [processInstanceAddress] = client.decode(data, ["address"]);
            return { processInstanceAddress: processInstanceAddress };
        },
        getProcessInstanceData: (): {
            processDefinition: string;
            state: number;
            startedBy: string;
        } => {
            const [processDefinition, state, startedBy] = client.decode(data, ["address", "uint8", "address"]);
            return { processDefinition: processDefinition, state: state, startedBy: startedBy };
        },
        getProcessInstanceForActivity: (): [string] => { return client.decode(data, ["address"]); },
        getProcessModelRepository: (): [string] => { return client.decode(data, ["address"]); },
        startProcess: (): [number, string] => { return client.decode(data, ["uint256", "address"]); },
        startProcessFromRepository: (): [number, string] => { return client.decode(data, ["uint256", "address"]); },
        startProcessInstance: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        upgrade: (): {
            success: boolean;
        } => {
            const [success] = client.decode(data, ["bool"]);
            return { success: success };
        }
    }; };
}