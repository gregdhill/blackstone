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
export module EcosystemRegistryDb {
    export function Deploy<Tx>(client: Provider<Tx>, commons_base_ErrorsLib_sol_ErrorsLib: string, commons_collections_MappingsLib_sol_MappingsLib: string): Promise<string> {
        let bytecode = "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506110cb806100606000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063473c00301161005b578063473c0030146101f957806363293ffd146102b25780637f692a2a1461034b57806395e5b3d51461039557610088565b80630a452ad61461008d578063307b0a4f146100d15780634147a676146100ef578063437474c214610168575b600080fd5b6100cf600480360360208110156100a357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061043c565b005b6100d9610839565b6040518082815260200191505060405180910390f35b6101666004803603602081101561010557600080fd5b810190808035906020019064010000000081111561012257600080fd5b82018360208201111561013457600080fd5b8035906020019184600183028401116401000000008311171561015657600080fd5b9091929391929390505050610848565b005b6101df6004803603602081101561017e57600080fd5b810190808035906020019064010000000081111561019b57600080fd5b8201836020820111156101ad57600080fd5b803590602001918460018302840111640100000000831117156101cf57600080fd5b9091929391929390505050610a75565b604051808215151515815260200191505060405180910390f35b6102706004803603602081101561020f57600080fd5b810190808035906020019064010000000081111561022c57600080fd5b82018360208201111561023e57600080fd5b8035906020019184600183028401116401000000008311171561026057600080fd5b9091929391929390505050610b40565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610349600480360360408110156102c857600080fd5b81019080803590602001906401000000008111156102e557600080fd5b8201836020820111156102f757600080fd5b8035906020019184600183028401116401000000008311171561031957600080fd5b9091929391929390803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b98565b005b610353610dfa565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103c1600480360360208110156103ab57600080fd5b8101908080359060200190929190505050610e23565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104015780820151818401526020810190506103e6565b50505050905090810190601f16801561042e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156104af610f8d565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156105105780820151818401526020810190506104f5565b50505050905090810190601f16801561053d5780820380516001836020036101000a031916815260200191505b5084810383526021815260200180611076602191396040018481038252602681526020018061102b602691396040019550505050505060006040518083038186803b15801561058b57600080fd5b505af415801561059f573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146105f5610fca565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561065657808201518184015260208101905061063b565b50505050905090810190601f1680156106835780820380516001836020036101000a031916815260200191505b50848103835260238152602001806110086023913960400184810382526025815260200180611051602591396040019550505050505060006040518083038186803b1580156106d157600080fd5b505af41580156106e5573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610836577f0814a6975d95b7ef86d699e601b879308be10e8f2c4c77a940021f3d61b09eaf6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b60006001800180549050905090565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156108bb610f8d565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561091c578082015181840152602081019050610901565b50505050905090810190601f1680156109495780820380516001836020036101000a031916815260200191505b5084810383526021815260200180611076602191396040018481038252602681526020018061102b602691396040019550505050505060006040518083038186803b15801561099757600080fd5b505af41580156109ab573d6000803e3d6000fd5b50505050600173__$5e3d4bda46c81e962f48c99e99f980d175$__634d6c2672909184846040518463ffffffff1660e01b815260040180848152602001806020018281038252848482818152602001925080828437600081840152601f19601f82011690508083019250505094505050505060206040518083038186803b158015610a3557600080fd5b505af4158015610a49573d6000803e3d6000fd5b505050506040513d6020811015610a5f57600080fd5b8101908080519060200190929190505050505050565b6000600173__$5e3d4bda46c81e962f48c99e99f980d175$__63b950ac88909185856040518463ffffffff1660e01b815260040180848152602001806020018281038252848482818152602001925080828437600081840152601f19601f82011690508083019250505094505050505060206040518083038186803b158015610afd57600080fd5b505af4158015610b11573d6000803e3d6000fd5b505050506040513d6020811015610b2757600080fd5b8101908080519060200190929190505050905092915050565b600060016000018383604051808383808284378083019250505092505050908152602001604051809103902060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905092915050565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610c0b610f8d565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610c6c578082015181840152602081019050610c51565b50505050905090810190601f168015610c995780820380516001836020036101000a031916815260200191505b5084810383526021815260200180611076602191396040018481038252602681526020018061102b602691396040019550505050505060006040518083038186803b158015610ce757600080fd5b505af4158015610cfb573d6000803e3d6000fd5b50505050600173__$5e3d4bda46c81e962f48c99e99f980d175$__63c9de9e8690918585856040518563ffffffff1660e01b815260040180858152602001806020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281038252858582818152602001925080828437600081840152601f19601f8201169050808301925050509550505050505060206040518083038186803b158015610db957600080fd5b505af4158015610dcd573d6000803e3d6000fd5b505050506040513d6020811015610de357600080fd5b810190808051906020019092919050505050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600173__$5e3d4bda46c81e962f48c99e99f980d175$__6391a497b69091846040518363ffffffff1660e01b8152600401808381526020018281526020019250505060006040518083038186803b158015610e7f57600080fd5b505af4158015610e93573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052506040811015610ebd57600080fd5b810190808051906020019092919080516040519392919084640100000000821115610ee757600080fd5b83820191506020820185811115610efd57600080fd5b8251866001820283011164010000000082111715610f1a57600080fd5b8083526020830192505050908051906020019080838360005b83811015610f4e578082015181840152602081019050610f33565b50505050905090810190601f168015610f7b5780820380516001836020036101000a031916815260200191505b50604052505050905080915050919050565b60606040518060400160405280600681526020017f4552523430330000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f455252363131000000000000000000000000000000000000000000000000000081525090509056fe53797374656d4f776e65642e7472616e7366657253797374656d4f776e657273686970546865206d73672e73656e646572206973206e6f74207468652073797374656d206f776e6572546865206e65772073797374656d206f776e6572206d757374206e6f74206265204e554c4c53797374656d4f776e65642e7072655f6f6e6c79427953797374656d4f776e6572a265627a7a72315820632a8bbcd524b8a486d7799902c79bd9cda55b80cb5b9654a4acaeb14a77c50664736f6c634300050c0032";
        bytecode = Replace(bytecode, "$ecfb6c4d3c3ceff197e19e585a0a53728c$", commons_base_ErrorsLib_sol_ErrorsLib);
        bytecode = Replace(bytecode, "$5e3d4bda46c81e962f48c99e99f980d175$", commons_collections_MappingsLib_sol_MappingsLib);
        const data = bytecode + client.encode("", []);
        const payload = client.payload(data);
        return new Promise((resolve, reject) => {
            client.deploy(payload, (err, addr) => {
                if (err)
                    reject(err);
                else {
                    const address = Buffer.from(addr).toString("hex").toUpperCase();
                    resolve(address);
                }
            });
        });
    }
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        LogSystemOwnerChanged(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogSystemOwnerChanged", this.address, callback); }
        addEcosystem(_name: string, _address: string) {
            const data = Encode(this.client).addEcosystem(_name, _address);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addEcosystem();
            });
        }
        ecosystemExists(_name: string) {
            const data = Encode(this.client).ecosystemExists(_name);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ecosystemExists();
            });
        }
        getEcosystemDetails(_name: string) {
            const data = Encode(this.client).getEcosystemDetails(_name);
            return Call<Tx, {
                ecosystemAddress: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getEcosystemDetails();
            });
        }
        getEcosystemKeyAtIndex(_index: number) {
            const data = Encode(this.client).getEcosystemKeyAtIndex(_index);
            return Call<Tx, {
                key: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getEcosystemKeyAtIndex();
            });
        }
        getNumberOfEcosystems() {
            const data = Encode(this.client).getNumberOfEcosystems();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfEcosystems();
            });
        }
        getSystemOwner() {
            const data = Encode(this.client).getSystemOwner();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getSystemOwner();
            });
        }
        removeEcosystem(_name: string) {
            const data = Encode(this.client).removeEcosystem(_name);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).removeEcosystem();
            });
        }
        transferSystemOwnership(_newOwner: string) {
            const data = Encode(this.client).transferSystemOwnership(_newOwner);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).transferSystemOwnership();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        addEcosystem: (_name: string, _address: string) => { return client.encode("63293FFD", ["string", "address"], _name, _address); },
        ecosystemExists: (_name: string) => { return client.encode("437474C2", ["string"], _name); },
        getEcosystemDetails: (_name: string) => { return client.encode("473C0030", ["string"], _name); },
        getEcosystemKeyAtIndex: (_index: number) => { return client.encode("95E5B3D5", ["uint256"], _index); },
        getNumberOfEcosystems: () => { return client.encode("307B0A4F", []); },
        getSystemOwner: () => { return client.encode("7F692A2A", []); },
        removeEcosystem: (_name: string) => { return client.encode("4147A676", ["string"], _name); },
        transferSystemOwnership: (_newOwner: string) => { return client.encode("0A452AD6", ["address"], _newOwner); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        addEcosystem: (): void => { return; },
        ecosystemExists: (): [boolean] => { return client.decode(data, ["bool"]); },
        getEcosystemDetails: (): {
            ecosystemAddress: string;
        } => {
            const [ecosystemAddress] = client.decode(data, ["address"]);
            return { ecosystemAddress: ecosystemAddress };
        },
        getEcosystemKeyAtIndex: (): {
            key: string;
        } => {
            const [key] = client.decode(data, ["string"]);
            return { key: key };
        },
        getNumberOfEcosystems: (): [number] => { return client.decode(data, ["uint256"]); },
        getSystemOwner: (): [string] => { return client.decode(data, ["address"]); },
        removeEcosystem: (): void => { return; },
        transferSystemOwnership: (): void => { return; }
    }; };
}