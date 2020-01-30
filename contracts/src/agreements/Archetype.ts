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
export module Archetype {
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        LogArchetypeActivation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypeActivation", this.address, callback); }
        LogArchetypeCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypeCreation", this.address, callback); }
        LogArchetypeCreation_v1_1_0(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypeCreation_v1_1_0", this.address, callback); }
        LogArchetypeDocumentUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypeDocumentUpdate", this.address, callback); }
        LogArchetypeJurisdictionUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypeJurisdictionUpdate", this.address, callback); }
        LogArchetypeOwnerUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypeOwnerUpdate", this.address, callback); }
        LogArchetypeParameterUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypeParameterUpdate", this.address, callback); }
        LogArchetypePriceUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypePriceUpdate", this.address, callback); }
        LogArchetypeSuccessorUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypeSuccessorUpdate", this.address, callback); }
        LogGoverningArchetypeUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogGoverningArchetypeUpdate", this.address, callback); }
        ERC165_ID_VERSIONED_ARTIFACT() {
            const data = Encode(this.client).ERC165_ID_VERSIONED_ARTIFACT();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ERC165_ID_VERSIONED_ARTIFACT();
            });
        }
        EVENT_ID_ARCHETYPES() {
            const data = Encode(this.client).EVENT_ID_ARCHETYPES();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ARCHETYPES();
            });
        }
        EVENT_ID_ARCHETYPE_DOCUMENTS() {
            const data = Encode(this.client).EVENT_ID_ARCHETYPE_DOCUMENTS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ARCHETYPE_DOCUMENTS();
            });
        }
        EVENT_ID_ARCHETYPE_JURISDICTIONS() {
            const data = Encode(this.client).EVENT_ID_ARCHETYPE_JURISDICTIONS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ARCHETYPE_JURISDICTIONS();
            });
        }
        EVENT_ID_ARCHETYPE_PARAMETERS() {
            const data = Encode(this.client).EVENT_ID_ARCHETYPE_PARAMETERS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ARCHETYPE_PARAMETERS();
            });
        }
        EVENT_ID_GOVERNING_ARCHETYPES() {
            const data = Encode(this.client).EVENT_ID_GOVERNING_ARCHETYPES();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_GOVERNING_ARCHETYPES();
            });
        }
        ROLE_ID_OBJECT_ADMIN() {
            const data = Encode(this.client).ROLE_ID_OBJECT_ADMIN();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ROLE_ID_OBJECT_ADMIN();
            });
        }
        ROLE_ID_OWNER() {
            const data = Encode(this.client).ROLE_ID_OWNER();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ROLE_ID_OWNER();
            });
        }
        activate() {
            const data = Encode(this.client).activate();
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).activate();
            });
        }
        addDocument(_fileReference: string) {
            const data = Encode(this.client).addDocument(_fileReference);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addDocument();
            });
        }
        addJurisdiction(_country: Buffer, _region: Buffer) {
            const data = Encode(this.client).addJurisdiction(_country, _region);
            return Call<Tx, {
                error: number;
                key: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addJurisdiction();
            });
        }
        addParameter(_parameterType: number, _parameterName: Buffer) {
            const data = Encode(this.client).addParameter(_parameterType, _parameterName);
            return Call<Tx, {
                error: number;
                position: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addParameter();
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
        createPermission(_permission: Buffer, _multiHolder: boolean, _revocable: boolean, _transferable: boolean) {
            const data = Encode(this.client).createPermission(_permission, _multiHolder, _revocable, _transferable);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createPermission();
            });
        }
        deactivate() {
            const data = Encode(this.client).deactivate();
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).deactivate();
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
        getAuthor() {
            const data = Encode(this.client).getAuthor();
            return Call<Tx, {
                author: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAuthor();
            });
        }
        getDocument(_key: Buffer) {
            const data = Encode(this.client).getDocument(_key);
            return Call<Tx, {
                fileReference: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDocument();
            });
        }
        getDocumentKeyAtIndex(_index: number) {
            const data = Encode(this.client).getDocumentKeyAtIndex(_index);
            return Call<Tx, {
                key: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDocumentKeyAtIndex();
            });
        }
        getExecutionProcessDefinition() {
            const data = Encode(this.client).getExecutionProcessDefinition();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getExecutionProcessDefinition();
            });
        }
        getFormationProcessDefinition() {
            const data = Encode(this.client).getFormationProcessDefinition();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getFormationProcessDefinition();
            });
        }
        getGoverningArchetypeAtIndex(_index: number) {
            const data = Encode(this.client).getGoverningArchetypeAtIndex(_index);
            return Call<Tx, {
                archetypeAddress: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getGoverningArchetypeAtIndex();
            });
        }
        getGoverningArchetypes() {
            const data = Encode(this.client).getGoverningArchetypes();
            return Call<Tx, [string[]]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getGoverningArchetypes();
            });
        }
        getHolder(_permission: Buffer, _index: number) {
            const data = Encode(this.client).getHolder(_permission, _index);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getHolder();
            });
        }
        getJurisdictionAtIndex(_index: number) {
            const data = Encode(this.client).getJurisdictionAtIndex(_index);
            return Call<Tx, {
                error: number;
                key: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getJurisdictionAtIndex();
            });
        }
        getJurisdictionData(_key: Buffer) {
            const data = Encode(this.client).getJurisdictionData(_key);
            return Call<Tx, {
                country: Buffer;
                region: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getJurisdictionData();
            });
        }
        getNumberOfDocuments() {
            const data = Encode(this.client).getNumberOfDocuments();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfDocuments();
            });
        }
        getNumberOfGoverningArchetypes() {
            const data = Encode(this.client).getNumberOfGoverningArchetypes();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfGoverningArchetypes();
            });
        }
        getNumberOfJurisdictions() {
            const data = Encode(this.client).getNumberOfJurisdictions();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfJurisdictions();
            });
        }
        getNumberOfParameters() {
            const data = Encode(this.client).getNumberOfParameters();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfParameters();
            });
        }
        getOwner() {
            const data = Encode(this.client).getOwner();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOwner();
            });
        }
        getParameterAtIndex(_index: number) {
            const data = Encode(this.client).getParameterAtIndex(_index);
            return Call<Tx, {
                parameter: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getParameterAtIndex();
            });
        }
        getParameterDetails(_parameter: Buffer) {
            const data = Encode(this.client).getParameterDetails(_parameter);
            return Call<Tx, {
                position: number;
                parameterType: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getParameterDetails();
            });
        }
        getPermissionDetails(_permission: Buffer) {
            const data = Encode(this.client).getPermissionDetails(_permission);
            return Call<Tx, {
                exists: boolean;
                multiHolder: boolean;
                revocable: boolean;
                transferable: boolean;
                holderSize: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getPermissionDetails();
            });
        }
        getPrice() {
            const data = Encode(this.client).getPrice();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getPrice();
            });
        }
        getSuccessor() {
            const data = Encode(this.client).getSuccessor();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getSuccessor();
            });
        }
        grantPermission(_permission: Buffer, _newHolder: string) {
            const data = Encode(this.client).grantPermission(_permission, _newHolder);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).grantPermission();
            });
        }
        hasPermission(_permission: Buffer, _holder: string) {
            const data = Encode(this.client).hasPermission(_permission, _holder);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).hasPermission();
            });
        }
        initialize(_price: number | number, _isPrivate: boolean | boolean, _active: boolean | boolean, _author: string | string, _owner: string, _formationProcess: string | string, _executionProcess: string | string, _governingArchetypes: string[] | string[]) {
            const data = Encode(this.client).initialize(_price, _isPrivate, _active, _author, _owner, _formationProcess, _executionProcess, _governingArchetypes);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).initialize();
            });
        }
        initializeObjectAdministrator(_admin: string) {
            const data = Encode(this.client).initializeObjectAdministrator(_admin);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).initializeObjectAdministrator();
            });
        }
        isActive() {
            const data = Encode(this.client).isActive();
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).isActive();
            });
        }
        isPrivate() {
            const data = Encode(this.client).isPrivate();
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).isPrivate();
            });
        }
        revokePermission(_permission: Buffer, _holder: string) {
            const data = Encode(this.client).revokePermission(_permission, _holder);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).revokePermission();
            });
        }
        setPrice(_price: number) {
            const data = Encode(this.client).setPrice(_price);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setPrice();
            });
        }
        setSuccessor(_successor: string) {
            const data = Encode(this.client).setSuccessor(_successor);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setSuccessor();
            });
        }
        transferPermission(_permission: Buffer, _newHolder: string) {
            const data = Encode(this.client).transferPermission(_permission, _newHolder);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).transferPermission();
            });
        }
        upgradeOwnerPermission(_owner: string) {
            const data = Encode(this.client).upgradeOwnerPermission(_owner);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).upgradeOwnerPermission();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        ERC165_ID_VERSIONED_ARTIFACT: () => { return client.encode("E10533C6", []); },
        EVENT_ID_ARCHETYPES: () => { return client.encode("378AFC8C", []); },
        EVENT_ID_ARCHETYPE_DOCUMENTS: () => { return client.encode("E437393D", []); },
        EVENT_ID_ARCHETYPE_JURISDICTIONS: () => { return client.encode("E5B18101", []); },
        EVENT_ID_ARCHETYPE_PARAMETERS: () => { return client.encode("CDAF8190", []); },
        EVENT_ID_GOVERNING_ARCHETYPES: () => { return client.encode("B00B8A1A", []); },
        ROLE_ID_OBJECT_ADMIN: () => { return client.encode("E6F936F9", []); },
        ROLE_ID_OWNER: () => { return client.encode("9090FD85", []); },
        activate: () => { return client.encode("0F15F4C0", []); },
        addDocument: (_fileReference: string) => { return client.encode("F740E045", ["string"], _fileReference); },
        addJurisdiction: (_country: Buffer, _region: Buffer) => { return client.encode("083D0918", ["bytes2", "bytes32"], _country, _region); },
        addParameter: (_parameterType: number, _parameterName: Buffer) => { return client.encode("6F903388", ["uint8", "bytes32"], _parameterType, _parameterName); },
        compareArtifactVersion: (_other: string, _version: [number, number, number]) => {
            if (typeof _other === "string")
                return client.encode("5C030138", ["address"], _other);
            if (typeof _version === "string")
                return client.encode("78BC0B0D", ["uint8[3]"], _version);
        },
        createPermission: (_permission: Buffer, _multiHolder: boolean, _revocable: boolean, _transferable: boolean) => { return client.encode("94FEB152", ["bytes32", "bool", "bool", "bool"], _permission, _multiHolder, _revocable, _transferable); },
        deactivate: () => { return client.encode("51B42B00", []); },
        getArtifactVersion: () => { return client.encode("756B2E6C", []); },
        getArtifactVersionMajor: () => { return client.encode("57E0EBCA", []); },
        getArtifactVersionMinor: () => { return client.encode("7589ADB7", []); },
        getArtifactVersionPatch: () => { return client.encode("F085F6DD", []); },
        getAuthor: () => { return client.encode("A5FAA125", []); },
        getDocument: (_key: Buffer) => { return client.encode("B10D6B41", ["bytes32"], _key); },
        getDocumentKeyAtIndex: (_index: number) => { return client.encode("54B3B33E", ["uint256"], _index); },
        getExecutionProcessDefinition: () => { return client.encode("AA26F68B", []); },
        getFormationProcessDefinition: () => { return client.encode("1EA7A8D3", []); },
        getGoverningArchetypeAtIndex: (_index: number) => { return client.encode("B23115FC", ["uint256"], _index); },
        getGoverningArchetypes: () => { return client.encode("A1DA76D9", []); },
        getHolder: (_permission: Buffer, _index: number) => { return client.encode("141B422A", ["bytes32", "uint256"], _permission, _index); },
        getJurisdictionAtIndex: (_index: number) => { return client.encode("D9B860D6", ["uint256"], _index); },
        getJurisdictionData: (_key: Buffer) => { return client.encode("714BC1FF", ["bytes32"], _key); },
        getNumberOfDocuments: () => { return client.encode("B7B82495", []); },
        getNumberOfGoverningArchetypes: () => { return client.encode("B428F075", []); },
        getNumberOfJurisdictions: () => { return client.encode("20C225CE", []); },
        getNumberOfParameters: () => { return client.encode("9B70202E", []); },
        getOwner: () => { return client.encode("893D20E8", []); },
        getParameterAtIndex: (_index: number) => { return client.encode("EB246075", ["uint256"], _index); },
        getParameterDetails: (_parameter: Buffer) => { return client.encode("37CC95B5", ["bytes32"], _parameter); },
        getPermissionDetails: (_permission: Buffer) => { return client.encode("63A84C04", ["bytes32"], _permission); },
        getPrice: () => { return client.encode("98D5FDCA", []); },
        getSuccessor: () => { return client.encode("D9BCCBF7", []); },
        grantPermission: (_permission: Buffer, _newHolder: string) => { return client.encode("BC586456", ["bytes32", "address"], _permission, _newHolder); },
        hasPermission: (_permission: Buffer, _holder: string) => { return client.encode("28545C0D", ["bytes32", "address"], _permission, _holder); },
        initialize: (_price: number | number, _isPrivate: boolean | boolean, _active: boolean | boolean, _author: string | string, _owner: string, _formationProcess: string | string, _executionProcess: string | string, _governingArchetypes: string[] | string[]) => {
            if (typeof _price === "string" && typeof _isPrivate === "string" && typeof _active === "string" && typeof _author === "string" && typeof _owner === "string" && typeof _formationProcess === "string" && typeof _executionProcess === "string" && typeof _governingArchetypes === "string")
                return client.encode("36D4BFCA", ["uint256", "bool", "bool", "address", "address", "address", "address", "address[]"], _price, _isPrivate, _active, _author, _owner, _formationProcess, _executionProcess, _governingArchetypes);
            if (typeof _price === "string" && typeof _isPrivate === "string" && typeof _active === "string" && typeof _author === "string" && typeof _formationProcess === "string" && typeof _executionProcess === "string" && typeof _governingArchetypes === "string")
                return client.encode("CB8B5420", ["uint256", "bool", "bool", "address", "address", "address", "address[]"], _price, _isPrivate, _active, _author, _formationProcess, _executionProcess, _governingArchetypes);
        },
        initializeObjectAdministrator: (_admin: string) => { return client.encode("859360F5", ["address"], _admin); },
        isActive: () => { return client.encode("22F3E2D4", []); },
        isPrivate: () => { return client.encode("FAFF660E", []); },
        revokePermission: (_permission: Buffer, _holder: string) => { return client.encode("A6A8F17B", ["bytes32", "address"], _permission, _holder); },
        setPrice: (_price: number) => { return client.encode("91B7F5ED", ["uint256"], _price); },
        setSuccessor: (_successor: string) => { return client.encode("10E5BFF8", ["address"], _successor); },
        transferPermission: (_permission: Buffer, _newHolder: string) => { return client.encode("EC9CB2CE", ["bytes32", "address"], _permission, _newHolder); },
        upgradeOwnerPermission: (_owner: string) => { return client.encode("C1664C8D", ["address"], _owner); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        EVENT_ID_ARCHETYPES: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ARCHETYPE_DOCUMENTS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ARCHETYPE_JURISDICTIONS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ARCHETYPE_PARAMETERS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_GOVERNING_ARCHETYPES: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        ROLE_ID_OBJECT_ADMIN: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        ROLE_ID_OWNER: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        activate: (): void => { return; },
        addDocument: (): void => { return; },
        addJurisdiction: (): {
            error: number;
            key: Buffer;
        } => {
            const [error, key] = client.decode(data, ["uint256", "bytes32"]);
            return { error: error, key: key };
        },
        addParameter: (): {
            error: number;
            position: number;
        } => {
            const [error, position] = client.decode(data, ["uint256", "uint256"]);
            return { error: error, position: position };
        },
        compareArtifactVersion: (): {
            result: number;
        } => {
            const [result] = client.decode(data, ["int256"]);
            return { result: result };
        },
        createPermission: (): void => { return; },
        deactivate: (): void => { return; },
        getArtifactVersion: (): [[number, number, number]] => { return client.decode(data, ["uint8[3]"]); },
        getArtifactVersionMajor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionMinor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionPatch: (): [number] => { return client.decode(data, ["uint8"]); },
        getAuthor: (): {
            author: string;
        } => {
            const [author] = client.decode(data, ["address"]);
            return { author: author };
        },
        getDocument: (): {
            fileReference: string;
        } => {
            const [fileReference] = client.decode(data, ["string"]);
            return { fileReference: fileReference };
        },
        getDocumentKeyAtIndex: (): {
            key: Buffer;
        } => {
            const [key] = client.decode(data, ["bytes32"]);
            return { key: key };
        },
        getExecutionProcessDefinition: (): [string] => { return client.decode(data, ["address"]); },
        getFormationProcessDefinition: (): [string] => { return client.decode(data, ["address"]); },
        getGoverningArchetypeAtIndex: (): {
            archetypeAddress: string;
        } => {
            const [archetypeAddress] = client.decode(data, ["address"]);
            return { archetypeAddress: archetypeAddress };
        },
        getGoverningArchetypes: (): [string[]] => { return client.decode(data, ["address[]"]); },
        getHolder: (): [string] => { return client.decode(data, ["address"]); },
        getJurisdictionAtIndex: (): {
            error: number;
            key: Buffer;
        } => {
            const [error, key] = client.decode(data, ["uint256", "bytes32"]);
            return { error: error, key: key };
        },
        getJurisdictionData: (): {
            country: Buffer;
            region: Buffer;
        } => {
            const [country, region] = client.decode(data, ["bytes2", "bytes32"]);
            return { country: country, region: region };
        },
        getNumberOfDocuments: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfGoverningArchetypes: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfJurisdictions: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfParameters: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getOwner: (): [string] => { return client.decode(data, ["address"]); },
        getParameterAtIndex: (): {
            parameter: Buffer;
        } => {
            const [parameter] = client.decode(data, ["bytes32"]);
            return { parameter: parameter };
        },
        getParameterDetails: (): {
            position: number;
            parameterType: number;
        } => {
            const [position, parameterType] = client.decode(data, ["uint256", "uint8"]);
            return { position: position, parameterType: parameterType };
        },
        getPermissionDetails: (): {
            exists: boolean;
            multiHolder: boolean;
            revocable: boolean;
            transferable: boolean;
            holderSize: number;
        } => {
            const [exists, multiHolder, revocable, transferable, holderSize] = client.decode(data, ["bool", "bool", "bool", "bool", "uint256"]);
            return { exists: exists, multiHolder: multiHolder, revocable: revocable, transferable: transferable, holderSize: holderSize };
        },
        getPrice: (): [number] => { return client.decode(data, ["uint256"]); },
        getSuccessor: (): [string] => { return client.decode(data, ["address"]); },
        grantPermission: (): void => { return; },
        hasPermission: (): [boolean] => { return client.decode(data, ["bool"]); },
        initialize: (): void => { return; },
        initializeObjectAdministrator: (): void => { return; },
        isActive: (): [boolean] => { return client.decode(data, ["bool"]); },
        isPrivate: (): [boolean] => { return client.decode(data, ["bool"]); },
        revokePermission: (): void => { return; },
        setPrice: (): void => { return; },
        setSuccessor: (): void => { return; },
        transferPermission: (): void => { return; },
        upgradeOwnerPermission: (): void => { return; }
    }; };
}