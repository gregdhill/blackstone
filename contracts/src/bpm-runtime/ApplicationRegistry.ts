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
export module ApplicationRegistry {
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        LogApplicationAccessPointCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogApplicationAccessPointCreation", this.address, callback); }
        LogApplicationCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogApplicationCreation", this.address, callback); }
        DEFAULT_COMPLETION_FUNCTION() {
            const data = Encode(this.client).DEFAULT_COMPLETION_FUNCTION();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).DEFAULT_COMPLETION_FUNCTION();
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
        EVENT_ID_APPLICATIONS() {
            const data = Encode(this.client).EVENT_ID_APPLICATIONS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_APPLICATIONS();
            });
        }
        EVENT_ID_APPLICATION_ACCESS_POINTS() {
            const data = Encode(this.client).EVENT_ID_APPLICATION_ACCESS_POINTS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_APPLICATION_ACCESS_POINTS();
            });
        }
        addAccessPoint(_id: Buffer, _accessPointId: Buffer, _dataType: number, _direction: number) {
            const data = Encode(this.client).addAccessPoint(_id, _accessPointId, _dataType, _direction);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addAccessPoint();
            });
        }
        addApplication(_id: Buffer, _type: number, _location: string, _function: Buffer, _webForm: Buffer) {
            const data = Encode(this.client).addApplication(_id, _type, _location, _function, _webForm);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addApplication();
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
        getAccessPointAtIndex(_id: Buffer, _index: number) {
            const data = Encode(this.client).getAccessPointAtIndex(_id, _index);
            return Call<Tx, {
                accessPointId: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAccessPointAtIndex();
            });
        }
        getAccessPointData(_id: Buffer, _accessPointId: Buffer) {
            const data = Encode(this.client).getAccessPointData(_id, _accessPointId);
            return Call<Tx, {
                dataType: number;
                direction: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getAccessPointData();
            });
        }
        getApplicationAtIndex(_idx: number) {
            const data = Encode(this.client).getApplicationAtIndex(_idx);
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getApplicationAtIndex();
            });
        }
        getApplicationData(_id: Buffer) {
            const data = Encode(this.client).getApplicationData(_id);
            return Call<Tx, {
                applicationType: number;
                location: string;
                method: Buffer;
                webForm: Buffer;
                accessPointCount: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getApplicationData();
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
        getNumberOfAccessPoints(_id: Buffer) {
            const data = Encode(this.client).getNumberOfAccessPoints(_id);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfAccessPoints();
            });
        }
        getNumberOfApplications() {
            const data = Encode(this.client).getNumberOfApplications();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfApplications();
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
        DEFAULT_COMPLETION_FUNCTION: () => { return client.encode("E72C6737", []); },
        ERC165_ID_Upgradeable: () => { return client.encode("B21C815F", []); },
        ERC165_ID_VERSIONED_ARTIFACT: () => { return client.encode("E10533C6", []); },
        EVENT_ID_APPLICATIONS: () => { return client.encode("00C4EFA4", []); },
        EVENT_ID_APPLICATION_ACCESS_POINTS: () => { return client.encode("5C646A05", []); },
        addAccessPoint: (_id: Buffer, _accessPointId: Buffer, _dataType: number, _direction: number) => { return client.encode("EFED99B4", ["bytes32", "bytes32", "uint8", "uint8"], _id, _accessPointId, _dataType, _direction); },
        addApplication: (_id: Buffer, _type: number, _location: string, _function: Buffer, _webForm: Buffer) => { return client.encode("8166B73D", ["bytes32", "uint8", "address", "bytes4", "bytes32"], _id, _type, _location, _function, _webForm); },
        compareArtifactVersion: (_other: string, _version: [number, number, number]) => {
            if (typeof _other === "string")
                return client.encode("5C030138", ["address"], _other);
            if (typeof _version === "string")
                return client.encode("78BC0B0D", ["uint8[3]"], _version);
        },
        getAccessPointAtIndex: (_id: Buffer, _index: number) => { return client.encode("E51D0634", ["bytes32", "uint256"], _id, _index); },
        getAccessPointData: (_id: Buffer, _accessPointId: Buffer) => { return client.encode("E60CED2C", ["bytes32", "bytes32"], _id, _accessPointId); },
        getApplicationAtIndex: (_idx: number) => { return client.encode("903E7A15", ["uint256"], _idx); },
        getApplicationData: (_id: Buffer) => { return client.encode("C46DF94E", ["bytes32"], _id); },
        getArtifactVersion: () => { return client.encode("756B2E6C", []); },
        getArtifactVersionMajor: () => { return client.encode("57E0EBCA", []); },
        getArtifactVersionMinor: () => { return client.encode("7589ADB7", []); },
        getArtifactVersionPatch: () => { return client.encode("F085F6DD", []); },
        getNumberOfAccessPoints: (_id: Buffer) => { return client.encode("CBD8558E", ["bytes32"], _id); },
        getNumberOfApplications: () => { return client.encode("A86DA9B4", []); },
        upgrade: (_successor: string) => { return client.encode("0900F010", ["address"], _successor); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        DEFAULT_COMPLETION_FUNCTION: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_Upgradeable: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        EVENT_ID_APPLICATIONS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_APPLICATION_ACCESS_POINTS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        addAccessPoint: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        addApplication: (): {
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
        getAccessPointAtIndex: (): {
            accessPointId: Buffer;
        } => {
            const [accessPointId] = client.decode(data, ["bytes32"]);
            return { accessPointId: accessPointId };
        },
        getAccessPointData: (): {
            dataType: number;
            direction: number;
        } => {
            const [dataType, direction] = client.decode(data, ["uint8", "uint8"]);
            return { dataType: dataType, direction: direction };
        },
        getApplicationAtIndex: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getApplicationData: (): {
            applicationType: number;
            location: string;
            method: Buffer;
            webForm: Buffer;
            accessPointCount: number;
        } => {
            const [applicationType, location, method, webForm, accessPointCount] = client.decode(data, ["uint8", "address", "bytes4", "bytes32", "uint256"]);
            return { applicationType: applicationType, location: location, method: method, webForm: webForm, accessPointCount: accessPointCount };
        },
        getArtifactVersion: (): [[number, number, number]] => { return client.decode(data, ["uint8[3]"]); },
        getArtifactVersionMajor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionMinor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionPatch: (): [number] => { return client.decode(data, ["uint8"]); },
        getNumberOfAccessPoints: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfApplications: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        upgrade: (): {
            success: boolean;
        } => {
            const [success] = client.decode(data, ["bool"]);
            return { success: success };
        }
    }; };
}