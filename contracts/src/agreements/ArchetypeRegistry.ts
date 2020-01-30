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
export module ArchetypeRegistry {
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        LogArchetypePackageActivation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypePackageActivation", this.address, callback); }
        LogArchetypePackageCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypePackageCreation", this.address, callback); }
        LogArchetypeToPackageUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogArchetypeToPackageUpdate", this.address, callback); }
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
        EVENT_ID_ARCHETYPES() {
            const data = Encode(this.client).EVENT_ID_ARCHETYPES();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ARCHETYPES();
            });
        }
        EVENT_ID_ARCHETYPE_PACKAGES() {
            const data = Encode(this.client).EVENT_ID_ARCHETYPE_PACKAGES();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ARCHETYPE_PACKAGES();
            });
        }
        EVENT_ID_ARCHETYPE_PACKAGE_MAP() {
            const data = Encode(this.client).EVENT_ID_ARCHETYPE_PACKAGE_MAP();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ARCHETYPE_PACKAGE_MAP();
            });
        }
        OBJECT_CLASS_ARCHETYPE() {
            const data = Encode(this.client).OBJECT_CLASS_ARCHETYPE();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).OBJECT_CLASS_ARCHETYPE();
            });
        }
        activatePackage(_id: Buffer, _author: string) {
            const data = Encode(this.client).activatePackage(_id, _author);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).activatePackage();
            });
        }
        addArchetypeToPackage(_packageId: Buffer, _archetype: string) {
            const data = Encode(this.client).addArchetypeToPackage(_packageId, _archetype);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addArchetypeToPackage();
            });
        }
        addDocument(_archetype: string, _fileReference: string) {
            const data = Encode(this.client).addDocument(_archetype, _fileReference);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addDocument();
            });
        }
        addJurisdiction(_archetype: string, _country: Buffer, _region: Buffer) {
            const data = Encode(this.client).addJurisdiction(_archetype, _country, _region);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addJurisdiction();
            });
        }
        addJurisdictions(_archetype: string, _countries: Buffer[], _regions: Buffer[]) {
            const data = Encode(this.client).addJurisdictions(_archetype, _countries, _regions);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addJurisdictions();
            });
        }
        addParameter(_archetype: string, _parameterType: number, _parameterName: Buffer) {
            const data = Encode(this.client).addParameter(_archetype, _parameterType, _parameterName);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addParameter();
            });
        }
        addParameters(_archetype: string, _parameterTypes: number[], _parameterNames: Buffer[]) {
            const data = Encode(this.client).addParameters(_archetype, _parameterTypes, _parameterNames);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addParameters();
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
        createArchetype(_price: number, _isPrivate: boolean, _active: boolean, _author: string, _owner: string, _formationProcess: string, _executionProcess: string, _packageId: Buffer, _governingArchetypes: string[]) {
            const data = Encode(this.client).createArchetype(_price, _isPrivate, _active, _author, _owner, _formationProcess, _executionProcess, _packageId, _governingArchetypes);
            return Call<Tx, {
                archetype: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createArchetype();
            });
        }
        createArchetypePackage(_author: string, _isPrivate: boolean, _active: boolean) {
            const data = Encode(this.client).createArchetypePackage(_author, _isPrivate, _active);
            return Call<Tx, {
                error: number;
                id: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createArchetypePackage();
            });
        }
        deactivatePackage(_id: Buffer, _author: string) {
            const data = Encode(this.client).deactivatePackage(_id, _author);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).deactivatePackage();
            });
        }
        getArchetypeAtIndex(_index: number) {
            const data = Encode(this.client).getArchetypeAtIndex(_index);
            return Call<Tx, {
                archetype: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArchetypeAtIndex();
            });
        }
        getArchetypeAtIndexInPackage(_id: Buffer, _index: number) {
            const data = Encode(this.client).getArchetypeAtIndexInPackage(_id, _index);
            return Call<Tx, {
                archetype: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArchetypeAtIndexInPackage();
            });
        }
        getArchetypeData(_archetype: string) {
            const data = Encode(this.client).getArchetypeData(_archetype);
            return Call<Tx, {
                price: number;
                author: string;
                owner: string;
                active: boolean;
                isPrivate: boolean;
                successor: string;
                formationProcessDefinition: string;
                executionProcessDefinition: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArchetypeData();
            });
        }
        getArchetypePackageAtIndex(_index: number) {
            const data = Encode(this.client).getArchetypePackageAtIndex(_index);
            return Call<Tx, {
                id: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArchetypePackageAtIndex();
            });
        }
        getArchetypePackageData(_id: Buffer) {
            const data = Encode(this.client).getArchetypePackageData(_id);
            return Call<Tx, {
                author: string;
                isPrivate: boolean;
                active: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArchetypePackageData();
            });
        }
        getArchetypeSuccessor(_archetype: string) {
            const data = Encode(this.client).getArchetypeSuccessor(_archetype);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArchetypeSuccessor();
            });
        }
        getArchetypesSize() {
            const data = Encode(this.client).getArchetypesSize();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getArchetypesSize();
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
        getGoverningArchetypeAtIndex(_archetype: string, _index: number) {
            const data = Encode(this.client).getGoverningArchetypeAtIndex(_archetype, _index);
            return Call<Tx, {
                archetype: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getGoverningArchetypeAtIndex();
            });
        }
        getJurisdictionAtIndexForArchetype(_archetype: string, _index: number) {
            const data = Encode(this.client).getJurisdictionAtIndexForArchetype(_archetype, _index);
            return Call<Tx, {
                key: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getJurisdictionAtIndexForArchetype();
            });
        }
        getJurisdictionDataForArchetype(_archetype: string, _key: Buffer) {
            const data = Encode(this.client).getJurisdictionDataForArchetype(_archetype, _key);
            return Call<Tx, {
                country: Buffer;
                region: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getJurisdictionDataForArchetype();
            });
        }
        getNumberOfArchetypePackages() {
            const data = Encode(this.client).getNumberOfArchetypePackages();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfArchetypePackages();
            });
        }
        getNumberOfArchetypesInPackage(_id: Buffer) {
            const data = Encode(this.client).getNumberOfArchetypesInPackage(_id);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfArchetypesInPackage();
            });
        }
        getNumberOfGoverningArchetypes(_archetype: string) {
            const data = Encode(this.client).getNumberOfGoverningArchetypes(_archetype);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfGoverningArchetypes();
            });
        }
        getNumberOfJurisdictionsForArchetype(_archetype: string) {
            const data = Encode(this.client).getNumberOfJurisdictionsForArchetype(_archetype);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfJurisdictionsForArchetype();
            });
        }
        getParameterByArchetypeAtIndex(_archetype: string, _index: number) {
            const data = Encode(this.client).getParameterByArchetypeAtIndex(_archetype, _index);
            return Call<Tx, {
                name: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getParameterByArchetypeAtIndex();
            });
        }
        getParameterByArchetypeData(_archetype: string, _name: Buffer) {
            const data = Encode(this.client).getParameterByArchetypeData(_archetype, _name);
            return Call<Tx, {
                position: number;
                parameterType: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getParameterByArchetypeData();
            });
        }
        getParametersByArchetypeSize(_archetype: string) {
            const data = Encode(this.client).getParametersByArchetypeSize(_archetype);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getParametersByArchetypeSize();
            });
        }
        packageHasArchetype(_packageId: Buffer, _archetype: string) {
            const data = Encode(this.client).packageHasArchetype(_packageId, _archetype);
            return Call<Tx, {
                hasArchetype: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).packageHasArchetype();
            });
        }
        setArchetypePrice(_archetype: string, _price: number) {
            const data = Encode(this.client).setArchetypePrice(_archetype, _price);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).setArchetypePrice();
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
        EVENT_ID_ARCHETYPES: () => { return client.encode("378AFC8C", []); },
        EVENT_ID_ARCHETYPE_PACKAGES: () => { return client.encode("3921F39F", []); },
        EVENT_ID_ARCHETYPE_PACKAGE_MAP: () => { return client.encode("A84C8382", []); },
        OBJECT_CLASS_ARCHETYPE: () => { return client.encode("F34D4D6F", []); },
        activatePackage: (_id: Buffer, _author: string) => { return client.encode("E8AA4459", ["bytes32", "address"], _id, _author); },
        addArchetypeToPackage: (_packageId: Buffer, _archetype: string) => { return client.encode("B8019B68", ["bytes32", "address"], _packageId, _archetype); },
        addDocument: (_archetype: string, _fileReference: string) => { return client.encode("65668764", ["address", "string"], _archetype, _fileReference); },
        addJurisdiction: (_archetype: string, _country: Buffer, _region: Buffer) => { return client.encode("F0B5C5A2", ["address", "bytes2", "bytes32"], _archetype, _country, _region); },
        addJurisdictions: (_archetype: string, _countries: Buffer[], _regions: Buffer[]) => { return client.encode("C22AF3A4", ["address", "bytes2[]", "bytes32[]"], _archetype, _countries, _regions); },
        addParameter: (_archetype: string, _parameterType: number, _parameterName: Buffer) => { return client.encode("846AF908", ["address", "uint8", "bytes32"], _archetype, _parameterType, _parameterName); },
        addParameters: (_archetype: string, _parameterTypes: number[], _parameterNames: Buffer[]) => { return client.encode("8F9AB49A", ["address", "uint8[]", "bytes32[]"], _archetype, _parameterTypes, _parameterNames); },
        compareArtifactVersion: (_other: string, _version: [number, number, number]) => {
            if (typeof _other === "string")
                return client.encode("5C030138", ["address"], _other);
            if (typeof _version === "string")
                return client.encode("78BC0B0D", ["uint8[3]"], _version);
        },
        createArchetype: (_price: number, _isPrivate: boolean, _active: boolean, _author: string, _owner: string, _formationProcess: string, _executionProcess: string, _packageId: Buffer, _governingArchetypes: string[]) => { return client.encode("4DBCD737", ["uint256", "bool", "bool", "address", "address", "address", "address", "bytes32", "address[]"], _price, _isPrivate, _active, _author, _owner, _formationProcess, _executionProcess, _packageId, _governingArchetypes); },
        createArchetypePackage: (_author: string, _isPrivate: boolean, _active: boolean) => { return client.encode("80557F01", ["address", "bool", "bool"], _author, _isPrivate, _active); },
        deactivatePackage: (_id: Buffer, _author: string) => { return client.encode("86F89290", ["bytes32", "address"], _id, _author); },
        getArchetypeAtIndex: (_index: number) => { return client.encode("D119D31E", ["uint256"], _index); },
        getArchetypeAtIndexInPackage: (_id: Buffer, _index: number) => { return client.encode("861F6214", ["bytes32", "uint256"], _id, _index); },
        getArchetypeData: (_archetype: string) => { return client.encode("72A61096", ["address"], _archetype); },
        getArchetypePackageAtIndex: (_index: number) => { return client.encode("FF93E8FB", ["uint256"], _index); },
        getArchetypePackageData: (_id: Buffer) => { return client.encode("1BA8F89C", ["bytes32"], _id); },
        getArchetypeSuccessor: (_archetype: string) => { return client.encode("6C3AD00E", ["address"], _archetype); },
        getArchetypesSize: () => { return client.encode("077738D8", []); },
        getArtifactVersion: () => { return client.encode("756B2E6C", []); },
        getArtifactVersionMajor: () => { return client.encode("57E0EBCA", []); },
        getArtifactVersionMinor: () => { return client.encode("7589ADB7", []); },
        getArtifactVersionPatch: () => { return client.encode("F085F6DD", []); },
        getGoverningArchetypeAtIndex: (_archetype: string, _index: number) => { return client.encode("0662931D", ["address", "uint256"], _archetype, _index); },
        getJurisdictionAtIndexForArchetype: (_archetype: string, _index: number) => { return client.encode("1095479D", ["address", "uint256"], _archetype, _index); },
        getJurisdictionDataForArchetype: (_archetype: string, _key: Buffer) => { return client.encode("587BCFDA", ["address", "bytes32"], _archetype, _key); },
        getNumberOfArchetypePackages: () => { return client.encode("11D751E1", []); },
        getNumberOfArchetypesInPackage: (_id: Buffer) => { return client.encode("A2960207", ["bytes32"], _id); },
        getNumberOfGoverningArchetypes: (_archetype: string) => { return client.encode("A60A0666", ["address"], _archetype); },
        getNumberOfJurisdictionsForArchetype: (_archetype: string) => { return client.encode("F0EAA7AC", ["address"], _archetype); },
        getParameterByArchetypeAtIndex: (_archetype: string, _index: number) => { return client.encode("7E712DCB", ["address", "uint256"], _archetype, _index); },
        getParameterByArchetypeData: (_archetype: string, _name: Buffer) => { return client.encode("9E4A88CF", ["address", "bytes32"], _archetype, _name); },
        getParametersByArchetypeSize: (_archetype: string) => { return client.encode("E7C541FE", ["address"], _archetype); },
        packageHasArchetype: (_packageId: Buffer, _archetype: string) => { return client.encode("5BADA39A", ["bytes32", "address"], _packageId, _archetype); },
        setArchetypePrice: (_archetype: string, _price: number) => { return client.encode("0ECFF8A1", ["address", "uint256"], _archetype, _price); },
        upgrade: (_successor: string) => { return client.encode("0900F010", ["address"], _successor); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        ERC165_ID_ObjectFactory: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_Upgradeable: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        EVENT_ID_ARCHETYPES: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ARCHETYPE_PACKAGES: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ARCHETYPE_PACKAGE_MAP: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        OBJECT_CLASS_ARCHETYPE: (): [string] => { return client.decode(data, ["string"]); },
        activatePackage: (): void => { return; },
        addArchetypeToPackage: (): void => { return; },
        addDocument: (): void => { return; },
        addJurisdiction: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        addJurisdictions: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        addParameter: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        addParameters: (): {
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
        createArchetype: (): {
            archetype: string;
        } => {
            const [archetype] = client.decode(data, ["address"]);
            return { archetype: archetype };
        },
        createArchetypePackage: (): {
            error: number;
            id: Buffer;
        } => {
            const [error, id] = client.decode(data, ["uint256", "bytes32"]);
            return { error: error, id: id };
        },
        deactivatePackage: (): void => { return; },
        getArchetypeAtIndex: (): {
            archetype: string;
        } => {
            const [archetype] = client.decode(data, ["address"]);
            return { archetype: archetype };
        },
        getArchetypeAtIndexInPackage: (): {
            archetype: string;
        } => {
            const [archetype] = client.decode(data, ["address"]);
            return { archetype: archetype };
        },
        getArchetypeData: (): {
            price: number;
            author: string;
            owner: string;
            active: boolean;
            isPrivate: boolean;
            successor: string;
            formationProcessDefinition: string;
            executionProcessDefinition: string;
        } => {
            const [price, author, owner, active, isPrivate, successor, formationProcessDefinition, executionProcessDefinition] = client.decode(data, ["uint256", "address", "address", "bool", "bool", "address", "address", "address"]);
            return { price: price, author: author, owner: owner, active: active, isPrivate: isPrivate, successor: successor, formationProcessDefinition: formationProcessDefinition, executionProcessDefinition: executionProcessDefinition };
        },
        getArchetypePackageAtIndex: (): {
            id: Buffer;
        } => {
            const [id] = client.decode(data, ["bytes32"]);
            return { id: id };
        },
        getArchetypePackageData: (): {
            author: string;
            isPrivate: boolean;
            active: boolean;
        } => {
            const [author, isPrivate, active] = client.decode(data, ["address", "bool", "bool"]);
            return { author: author, isPrivate: isPrivate, active: active };
        },
        getArchetypeSuccessor: (): [string] => { return client.decode(data, ["address"]); },
        getArchetypesSize: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getArtifactVersion: (): [[number, number, number]] => { return client.decode(data, ["uint8[3]"]); },
        getArtifactVersionMajor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionMinor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionPatch: (): [number] => { return client.decode(data, ["uint8"]); },
        getGoverningArchetypeAtIndex: (): {
            archetype: string;
        } => {
            const [archetype] = client.decode(data, ["address"]);
            return { archetype: archetype };
        },
        getJurisdictionAtIndexForArchetype: (): {
            key: Buffer;
        } => {
            const [key] = client.decode(data, ["bytes32"]);
            return { key: key };
        },
        getJurisdictionDataForArchetype: (): {
            country: Buffer;
            region: Buffer;
        } => {
            const [country, region] = client.decode(data, ["bytes2", "bytes32"]);
            return { country: country, region: region };
        },
        getNumberOfArchetypePackages: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfArchetypesInPackage: (): {
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
        getNumberOfJurisdictionsForArchetype: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getParameterByArchetypeAtIndex: (): {
            name: Buffer;
        } => {
            const [name] = client.decode(data, ["bytes32"]);
            return { name: name };
        },
        getParameterByArchetypeData: (): {
            position: number;
            parameterType: number;
        } => {
            const [position, parameterType] = client.decode(data, ["uint256", "uint8"]);
            return { position: position, parameterType: parameterType };
        },
        getParametersByArchetypeSize: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        packageHasArchetype: (): {
            hasArchetype: boolean;
        } => {
            const [hasArchetype] = client.decode(data, ["bool"]);
            return { hasArchetype: hasArchetype };
        },
        setArchetypePrice: (): void => { return; },
        upgrade: (): {
            success: boolean;
        } => {
            const [success] = client.decode(data, ["bool"]);
            return { success: success };
        }
    }; };
}