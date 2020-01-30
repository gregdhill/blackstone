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
export module DOUG {
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        deploy(_id: string, _address: string) {
            const data = Encode(this.client).deploy(_id, _address);
            return Call<Tx, {
                success: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).deploy();
            });
        }
        deployVersion(_id: string, _address: string, _version: [number, number, number]) {
            const data = Encode(this.client).deployVersion(_id, _address, _version);
            return Call<Tx, {
                success: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).deployVersion();
            });
        }
        lookup(_id: string) {
            const data = Encode(this.client).lookup(_id);
            return Call<Tx, {
                contractAddress: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).lookup();
            });
        }
        lookupVersion(_id: string, _version: [number, number, number]) {
            const data = Encode(this.client).lookupVersion(_id, _version);
            return Call<Tx, {
                contractAddress: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).lookupVersion();
            });
        }
        register(_id: string, _address: string) {
            const data = Encode(this.client).register(_id, _address);
            return Call<Tx, {
                version: [number, number, number];
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).register();
            });
        }
        registerVersion(_id: string, _address: string, _version: [number, number, number]) {
            const data = Encode(this.client).registerVersion(_id, _address, _version);
            return Call<Tx, {
                version: [number, number, number];
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).registerVersion();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        deploy: (_id: string, _address: string) => { return client.encode("58CD1DFA", ["string", "address"], _id, _address); },
        deployVersion: (_id: string, _address: string, _version: [number, number, number]) => { return client.encode("A428E214", ["string", "address", "uint8[3]"], _id, _address, _version); },
        lookup: (_id: string) => { return client.encode("F67187AC", ["string"], _id); },
        lookupVersion: (_id: string, _version: [number, number, number]) => { return client.encode("3E012C90", ["string", "uint8[3]"], _id, _version); },
        register: (_id: string, _address: string) => { return client.encode("1E59C529", ["string", "address"], _id, _address); },
        registerVersion: (_id: string, _address: string, _version: [number, number, number]) => { return client.encode("ECB9AEE5", ["string", "address", "uint8[3]"], _id, _address, _version); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        deploy: (): {
            success: boolean;
        } => {
            const [success] = client.decode(data, ["bool"]);
            return { success: success };
        },
        deployVersion: (): {
            success: boolean;
        } => {
            const [success] = client.decode(data, ["bool"]);
            return { success: success };
        },
        lookup: (): {
            contractAddress: string;
        } => {
            const [contractAddress] = client.decode(data, ["address"]);
            return { contractAddress: contractAddress };
        },
        lookupVersion: (): {
            contractAddress: string;
        } => {
            const [contractAddress] = client.decode(data, ["address"]);
            return { contractAddress: contractAddress };
        },
        register: (): {
            version: [number, number, number];
        } => {
            const [version] = client.decode(data, ["uint8[3]"]);
            return { version: version };
        },
        registerVersion: (): {
            version: [number, number, number];
        } => {
            const [version] = client.decode(data, ["uint8[3]"]);
            return { version: version };
        }
    }; };
}