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
export module ActiveAgreement {
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        LogActiveAgreementToPartyCancelationsUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogActiveAgreementToPartyCancelationsUpdate", this.address, callback); }
        LogActiveAgreementToPartySignaturesUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogActiveAgreementToPartySignaturesUpdate", this.address, callback); }
        LogAgreementCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogAgreementCreation", this.address, callback); }
        LogAgreementCreation_v1_1_0(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogAgreementCreation_v1_1_0", this.address, callback); }
        LogAgreementEventLogReference(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogAgreementEventLogReference", this.address, callback); }
        LogAgreementLegalStateUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogAgreementLegalStateUpdate", this.address, callback); }
        LogAgreementMaxEventCountUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogAgreementMaxEventCountUpdate", this.address, callback); }
        LogAgreementOwnerUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogAgreementOwnerUpdate", this.address, callback); }
        LogAgreementPrivateParametersReference(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogAgreementPrivateParametersReference", this.address, callback); }
        LogAgreementRedaction(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogAgreementRedaction", this.address, callback); }
        LogAgreementSignatureLogReference(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogAgreementSignatureLogReference", this.address, callback); }
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
        LogGoverningAgreementUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogGoverningAgreementUpdate", this.address, callback); }
        DATA_FIELD_AGREEMENT_PARTIES() {
            const data = Encode(this.client).DATA_FIELD_AGREEMENT_PARTIES();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).DATA_FIELD_AGREEMENT_PARTIES();
            });
        }
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
        EVENT_CREATED() {
            const data = Encode(this.client).EVENT_CREATED();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_CREATED();
            });
        }
        EVENT_DELETED() {
            const data = Encode(this.client).EVENT_DELETED();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_DELETED();
            });
        }
        EVENT_ID_AGREEMENTS() {
            const data = Encode(this.client).EVENT_ID_AGREEMENTS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_AGREEMENTS();
            });
        }
        EVENT_ID_AGREEMENT_PARTY_MAP() {
            const data = Encode(this.client).EVENT_ID_AGREEMENT_PARTY_MAP();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_AGREEMENT_PARTY_MAP();
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
        EVENT_ID_GOVERNING_AGREEMENT() {
            const data = Encode(this.client).EVENT_ID_GOVERNING_AGREEMENT();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_GOVERNING_AGREEMENT();
            });
        }
        EVENT_ID_STATE_CHANGED() {
            const data = Encode(this.client).EVENT_ID_STATE_CHANGED();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_STATE_CHANGED();
            });
        }
        EVENT_UPDATED() {
            const data = Encode(this.client).EVENT_UPDATED();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_UPDATED();
            });
        }
        ROLE_ID_LEGAL_STATE_CONTROLLER() {
            const data = Encode(this.client).ROLE_ID_LEGAL_STATE_CONTROLLER();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ROLE_ID_LEGAL_STATE_CONTROLLER();
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
        addEventListener(_event: Buffer | Buffer, _listener: string) {
            const data = Encode(this.client).addEventListener(_event, _listener);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addEventListener();
            });
        }
        cancel() {
            const data = Encode(this.client).cancel();
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).cancel();
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
        getArchetype() {
            const data = Encode(this.client).getArchetype();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArchetype();
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
        getCreator() {
            const data = Encode(this.client).getCreator();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getCreator();
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
        getEventLogReference() {
            const data = Encode(this.client).getEventLogReference();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getEventLogReference();
            });
        }
        getGoverningAgreementAtIndex(_index: number) {
            const data = Encode(this.client).getGoverningAgreementAtIndex(_index);
            return Call<Tx, {
                agreementAddress: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getGoverningAgreementAtIndex();
            });
        }
        getHolder(_permission: Buffer, _index: number) {
            const data = Encode(this.client).getHolder(_permission, _index);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getHolder();
            });
        }
        getLegalState() {
            const data = Encode(this.client).getLegalState();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getLegalState();
            });
        }
        getMaxNumberOfEvents() {
            const data = Encode(this.client).getMaxNumberOfEvents();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getMaxNumberOfEvents();
            });
        }
        getNumberOfData() {
            const data = Encode(this.client).getNumberOfData();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfData();
            });
        }
        getNumberOfGoverningAgreements() {
            const data = Encode(this.client).getNumberOfGoverningAgreements();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfGoverningAgreements();
            });
        }
        getNumberOfParties() {
            const data = Encode(this.client).getNumberOfParties();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfParties();
            });
        }
        getOwner() {
            const data = Encode(this.client).getOwner();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOwner();
            });
        }
        getPartyAtIndex(_index: number) {
            const data = Encode(this.client).getPartyAtIndex(_index);
            return Call<Tx, {
                party: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getPartyAtIndex();
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
        getPrivateParametersReference() {
            const data = Encode(this.client).getPrivateParametersReference();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getPrivateParametersReference();
            });
        }
        getSignatureDetails(_party: string) {
            const data = Encode(this.client).getSignatureDetails(_party);
            return Call<Tx, [string, number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getSignatureDetails();
            });
        }
        getSignatureLogReference() {
            const data = Encode(this.client).getSignatureLogReference();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getSignatureLogReference();
            });
        }
        getSignatureTimestamp(_party: string) {
            const data = Encode(this.client).getSignatureTimestamp(_party);
            return Call<Tx, {
                signatureTimestamp: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getSignatureTimestamp();
            });
        }
        getSignee(_party: string) {
            const data = Encode(this.client).getSignee(_party);
            return Call<Tx, {
                signee: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getSignee();
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
        initialize(_archetype: string | string, _creator: string | string, _owner: string, _privateParametersFileReference: string | string, _isPrivate: boolean | boolean, _parties: string[] | string[], _governingAgreements: string[] | string[]) {
            const data = Encode(this.client).initialize(_archetype, _creator, _owner, _privateParametersFileReference, _isPrivate, _parties, _governingAgreements);
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
        isPrivate() {
            const data = Encode(this.client).isPrivate();
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).isPrivate();
            });
        }
        isSignedBy(_signee: string) {
            const data = Encode(this.client).isSignedBy(_signee);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).isSignedBy();
            });
        }
        redact() {
            const data = Encode(this.client).redact();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).redact();
            });
        }
        removeData(_id: Buffer) {
            const data = Encode(this.client).removeData(_id);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).removeData();
            });
        }
        removeEventListener(_event: Buffer | Buffer, _listener: string) {
            const data = Encode(this.client).removeEventListener(_event, _listener);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).removeEventListener();
            });
        }
        resolveAddressScope(_address: string, _context: Buffer, _dataStorage: string) {
            const data = Encode(this.client).resolveAddressScope(_address, _context, _dataStorage);
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).resolveAddressScope();
            });
        }
        revokePermission(_permission: Buffer, _holder: string) {
            const data = Encode(this.client).revokePermission(_permission, _holder);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).revokePermission();
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
        setEventLogReference(_eventLogFileReference: string) {
            const data = Encode(this.client).setEventLogReference(_eventLogFileReference);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setEventLogReference();
            });
        }
        setFulfilled() {
            const data = Encode(this.client).setFulfilled();
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setFulfilled();
            });
        }
        setLegalState(_legalState: number) {
            const data = Encode(this.client).setLegalState(_legalState);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setLegalState();
            });
        }
        setMaxNumberOfEvents(_maxNumberOfEvents: number) {
            const data = Encode(this.client).setMaxNumberOfEvents(_maxNumberOfEvents);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setMaxNumberOfEvents();
            });
        }
        setPrivateParametersReference(_privateParametersFileReference: string) {
            const data = Encode(this.client).setPrivateParametersReference(_privateParametersFileReference);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setPrivateParametersReference();
            });
        }
        setSignatureLogReference(_signatureLogFileReference: string) {
            const data = Encode(this.client).setSignatureLogReference(_signatureLogFileReference);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setSignatureLogReference();
            });
        }
        sign() {
            const data = Encode(this.client).sign();
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).sign();
            });
        }
        transferPermission(_permission: Buffer, _newHolder: string) {
            const data = Encode(this.client).transferPermission(_permission, _newHolder);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).transferPermission();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        DATA_FIELD_AGREEMENT_PARTIES: () => { return client.encode("80C86BA7", []); },
        ERC165_ID_Address_Scopes: () => { return client.encode("BD9E0660", []); },
        ERC165_ID_VERSIONED_ARTIFACT: () => { return client.encode("E10533C6", []); },
        EVENT_CREATED: () => { return client.encode("F0897DB7", []); },
        EVENT_DELETED: () => { return client.encode("6F78733B", []); },
        EVENT_ID_AGREEMENTS: () => { return client.encode("4828C43B", []); },
        EVENT_ID_AGREEMENT_PARTY_MAP: () => { return client.encode("6DBBC67B", []); },
        EVENT_ID_DATA_STORAGE: () => { return client.encode("D42EA976", []); },
        EVENT_ID_ENTITIES_ADDRESS_SCOPES: () => { return client.encode("B7D64777", []); },
        EVENT_ID_GOVERNING_AGREEMENT: () => { return client.encode("FC344A73", []); },
        EVENT_ID_STATE_CHANGED: () => { return client.encode("11CE5844", []); },
        EVENT_UPDATED: () => { return client.encode("7207B07F", []); },
        ROLE_ID_LEGAL_STATE_CONTROLLER: () => { return client.encode("F76829C9", []); },
        ROLE_ID_OBJECT_ADMIN: () => { return client.encode("E6F936F9", []); },
        ROLE_ID_OWNER: () => { return client.encode("9090FD85", []); },
        addEventListener: (_event: Buffer | Buffer, _listener: string) => {
            if (typeof _event === "string" && typeof _listener === "string")
                return client.encode("2A7CBFDE", ["bytes32", "address"], _event, _listener);
            if (typeof _event === "string")
                return client.encode("6EA1944B", ["bytes32"], _event);
        },
        cancel: () => { return client.encode("EA8A1AF0", []); },
        compareArtifactVersion: (_other: string, _version: [number, number, number]) => {
            if (typeof _other === "string")
                return client.encode("5C030138", ["address"], _other);
            if (typeof _version === "string")
                return client.encode("78BC0B0D", ["uint8[3]"], _version);
        },
        createPermission: (_permission: Buffer, _multiHolder: boolean, _revocable: boolean, _transferable: boolean) => { return client.encode("94FEB152", ["bytes32", "bool", "bool", "bool"], _permission, _multiHolder, _revocable, _transferable); },
        getAddressScopeDetails: (_address: string, _context: Buffer) => { return client.encode("9561AA32", ["address", "bytes32"], _address, _context); },
        getAddressScopeDetailsForKey: (_key: Buffer) => { return client.encode("FE3C84B2", ["bytes32"], _key); },
        getAddressScopeKeys: () => { return client.encode("70A9C997", []); },
        getArchetype: () => { return client.encode("FB1A1493", []); },
        getArrayLength: (_id: Buffer) => { return client.encode("AA0AC16F", ["bytes32"], _id); },
        getArtifactVersion: () => { return client.encode("756B2E6C", []); },
        getArtifactVersionMajor: () => { return client.encode("57E0EBCA", []); },
        getArtifactVersionMinor: () => { return client.encode("7589ADB7", []); },
        getArtifactVersionPatch: () => { return client.encode("F085F6DD", []); },
        getCreator: () => { return client.encode("0EE2CB10", []); },
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
        getEventLogReference: () => { return client.encode("F9F3F283", []); },
        getGoverningAgreementAtIndex: (_index: number) => { return client.encode("C4521FFB", ["uint256"], _index); },
        getHolder: (_permission: Buffer, _index: number) => { return client.encode("141B422A", ["bytes32", "uint256"], _permission, _index); },
        getLegalState: () => { return client.encode("59D585EE", []); },
        getMaxNumberOfEvents: () => { return client.encode("5ABF3202", []); },
        getNumberOfData: () => { return client.encode("5666F9AC", []); },
        getNumberOfGoverningAgreements: () => { return client.encode("0D9BFA80", []); },
        getNumberOfParties: () => { return client.encode("7F809381", []); },
        getOwner: () => { return client.encode("893D20E8", []); },
        getPartyAtIndex: (_index: number) => { return client.encode("79CE3CB2", ["uint256"], _index); },
        getPermissionDetails: (_permission: Buffer) => { return client.encode("63A84C04", ["bytes32"], _permission); },
        getPrivateParametersReference: () => { return client.encode("9F75DFD9", []); },
        getSignatureDetails: (_party: string) => { return client.encode("F4B9D96E", ["address"], _party); },
        getSignatureLogReference: () => { return client.encode("0CB61B34", []); },
        getSignatureTimestamp: (_party: string) => { return client.encode("D39C4FAA", ["address"], _party); },
        getSignee: (_party: string) => { return client.encode("51E213FC", ["address"], _party); },
        grantPermission: (_permission: Buffer, _newHolder: string) => { return client.encode("BC586456", ["bytes32", "address"], _permission, _newHolder); },
        hasPermission: (_permission: Buffer, _holder: string) => { return client.encode("28545C0D", ["bytes32", "address"], _permission, _holder); },
        initialize: (_archetype: string | string, _creator: string | string, _owner: string, _privateParametersFileReference: string | string, _isPrivate: boolean | boolean, _parties: string[] | string[], _governingAgreements: string[] | string[]) => {
            if (typeof _archetype === "string" && typeof _creator === "string" && typeof _owner === "string" && typeof _privateParametersFileReference === "string" && typeof _isPrivate === "string" && typeof _parties === "string" && typeof _governingAgreements === "string")
                return client.encode("BE60FC0C", ["address", "address", "address", "string", "bool", "address[]", "address[]"], _archetype, _creator, _owner, _privateParametersFileReference, _isPrivate, _parties, _governingAgreements);
            if (typeof _archetype === "string" && typeof _creator === "string" && typeof _privateParametersFileReference === "string" && typeof _isPrivate === "string" && typeof _parties === "string" && typeof _governingAgreements === "string")
                return client.encode("E703A9E4", ["address", "address", "string", "bool", "address[]", "address[]"], _archetype, _creator, _privateParametersFileReference, _isPrivate, _parties, _governingAgreements);
        },
        initializeObjectAdministrator: (_admin: string) => { return client.encode("859360F5", ["address"], _admin); },
        isPrivate: () => { return client.encode("FAFF660E", []); },
        isSignedBy: (_signee: string) => { return client.encode("7F91FB7D", ["address"], _signee); },
        redact: () => { return client.encode("91BEC712", []); },
        removeData: (_id: Buffer) => { return client.encode("47DD48E0", ["bytes32"], _id); },
        removeEventListener: (_event: Buffer | Buffer, _listener: string) => {
            if (typeof _event === "string" && typeof _listener === "string")
                return client.encode("0775CB00", ["bytes32", "address"], _event, _listener);
            if (typeof _event === "string")
                return client.encode("586CA7AB", ["bytes32"], _event);
        },
        resolveAddressScope: (_address: string, _context: Buffer, _dataStorage: string) => { return client.encode("3C0E5245", ["address", "bytes32", "address"], _address, _context, _dataStorage); },
        revokePermission: (_permission: Buffer, _holder: string) => { return client.encode("A6A8F17B", ["bytes32", "address"], _permission, _holder); },
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
        setEventLogReference: (_eventLogFileReference: string) => { return client.encode("4F7E37BB", ["string"], _eventLogFileReference); },
        setFulfilled: () => { return client.encode("C3F0A895", []); },
        setLegalState: (_legalState: number) => { return client.encode("58892B86", ["uint8"], _legalState); },
        setMaxNumberOfEvents: (_maxNumberOfEvents: number) => { return client.encode("130C5985", ["uint32"], _maxNumberOfEvents); },
        setPrivateParametersReference: (_privateParametersFileReference: string) => { return client.encode("4773F6FC", ["string"], _privateParametersFileReference); },
        setSignatureLogReference: (_signatureLogFileReference: string) => { return client.encode("F8D660D3", ["string"], _signatureLogFileReference); },
        sign: () => { return client.encode("2CA15122", []); },
        transferPermission: (_permission: Buffer, _newHolder: string) => { return client.encode("EC9CB2CE", ["bytes32", "address"], _permission, _newHolder); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        DATA_FIELD_AGREEMENT_PARTIES: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        ERC165_ID_Address_Scopes: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        EVENT_CREATED: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_DELETED: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_AGREEMENTS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_AGREEMENT_PARTY_MAP: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_DATA_STORAGE: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ENTITIES_ADDRESS_SCOPES: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_GOVERNING_AGREEMENT: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_STATE_CHANGED: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_UPDATED: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        ROLE_ID_LEGAL_STATE_CONTROLLER: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        ROLE_ID_OBJECT_ADMIN: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        ROLE_ID_OWNER: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        addEventListener: (): void => { return; },
        cancel: (): void => { return; },
        compareArtifactVersion: (): {
            result: number;
        } => {
            const [result] = client.decode(data, ["int256"]);
            return { result: result };
        },
        createPermission: (): void => { return; },
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
        getArchetype: (): [string] => { return client.decode(data, ["address"]); },
        getArrayLength: (): [number] => { return client.decode(data, ["uint256"]); },
        getArtifactVersion: (): [[number, number, number]] => { return client.decode(data, ["uint8[3]"]); },
        getArtifactVersionMajor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionMinor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionPatch: (): [number] => { return client.decode(data, ["uint8"]); },
        getCreator: (): [string] => { return client.decode(data, ["address"]); },
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
        getEventLogReference: (): [string] => { return client.decode(data, ["string"]); },
        getGoverningAgreementAtIndex: (): {
            agreementAddress: string;
        } => {
            const [agreementAddress] = client.decode(data, ["address"]);
            return { agreementAddress: agreementAddress };
        },
        getHolder: (): [string] => { return client.decode(data, ["address"]); },
        getLegalState: (): [number] => { return client.decode(data, ["uint8"]); },
        getMaxNumberOfEvents: (): [number] => { return client.decode(data, ["uint32"]); },
        getNumberOfData: (): [number] => { return client.decode(data, ["uint256"]); },
        getNumberOfGoverningAgreements: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfParties: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getOwner: (): [string] => { return client.decode(data, ["address"]); },
        getPartyAtIndex: (): {
            party: string;
        } => {
            const [party] = client.decode(data, ["address"]);
            return { party: party };
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
        getPrivateParametersReference: (): [string] => { return client.decode(data, ["string"]); },
        getSignatureDetails: (): [string, number] => { return client.decode(data, ["address", "uint256"]); },
        getSignatureLogReference: (): [string] => { return client.decode(data, ["string"]); },
        getSignatureTimestamp: (): {
            signatureTimestamp: number;
        } => {
            const [signatureTimestamp] = client.decode(data, ["uint256"]);
            return { signatureTimestamp: signatureTimestamp };
        },
        getSignee: (): {
            signee: string;
        } => {
            const [signee] = client.decode(data, ["address"]);
            return { signee: signee };
        },
        grantPermission: (): void => { return; },
        hasPermission: (): [boolean] => { return client.decode(data, ["bool"]); },
        initialize: (): void => { return; },
        initializeObjectAdministrator: (): void => { return; },
        isPrivate: (): [boolean] => { return client.decode(data, ["bool"]); },
        isSignedBy: (): [boolean] => { return client.decode(data, ["bool"]); },
        redact: (): [number] => { return client.decode(data, ["uint8"]); },
        removeData: (): void => { return; },
        removeEventListener: (): void => { return; },
        resolveAddressScope: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        revokePermission: (): void => { return; },
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
        setEventLogReference: (): void => { return; },
        setFulfilled: (): void => { return; },
        setLegalState: (): void => { return; },
        setMaxNumberOfEvents: (): void => { return; },
        setPrivateParametersReference: (): void => { return; },
        setSignatureLogReference: (): void => { return; },
        sign: (): void => { return; },
        transferPermission: (): void => { return; }
    }; };
}