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
export module BpmServiceDb {
    export function Deploy<Tx>(client: Provider<Tx>, commons_base_ErrorsLib_sol_ErrorsLib: string, commons_collections_MappingsLib_sol_MappingsLib: string): Promise<string> {
        let bytecode = "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610d6d806100606000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80637f692a2a1161005b5780637f692a2a146101a15780639ca651f8146101eb578063ba6dd3e514610259578063d8619d801461028757610088565b80630a452ad61461008d57806320cc0184146100d157806357f31a6c1461013f5780636cf5c9e51461015d575b600080fd5b6100cf600480360360208110156100a357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506102a5565b005b6100fd600480360360208110156100e757600080fd5b81019080803590602001909291905050506106a2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610147610751565b6040518082815260200191505060405180910390f35b61019f6004803603602081101561017357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610760565b005b6101a96109c0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102176004803603602081101561020157600080fd5b81019080803590602001909291905050506109e9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102856004803603602081101561026f57600080fd5b8101908080359060200190929190505050610a87565b005b61028f610c1f565b6040518082815260200191505060405180910390f35b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610318610c2f565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561037957808201518184015260208101905061035e565b50505050905090810190601f1680156103a65780820380516001836020036101000a031916815260200191505b5084810383526021815260200180610d186021913960400184810382526026815260200180610ccd602691396040019550505050505060006040518083038186803b1580156103f457600080fd5b505af4158015610408573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461045e610c6c565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156104bf5780820151818401526020810190506104a4565b50505050905090810190601f1680156104ec5780820380516001836020036101000a031916815260200191505b5084810383526023815260200180610caa6023913960400184810382526025815260200180610cf3602591396040019550505050505060006040518083038186803b15801561053a57600080fd5b505af415801561054e573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461069f577f0814a6975d95b7ef86d699e601b879308be10e8f2c4c77a940021f3d61b09eaf6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600080600173__$5e3d4bda46c81e962f48c99e99f980d175$__63d91bd6de9091856040518363ffffffff1660e01b81526004018083815260200182815260200192505050604080518083038186803b1580156106fe57600080fd5b505af4158015610712573d6000803e3d6000fd5b505050506040513d604081101561072857600080fd5b810190808051906020019092919080519060200190929190505050809350819250505050919050565b60006001800180549050905090565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156107d3610c2f565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610834578082015181840152602081019050610819565b50505050905090810190601f1680156108615780820380516001836020036101000a031916815260200191505b5084810383526021815260200180610d186021913960400184810382526026815260200180610ccd602691396040019550505050505060006040518083038186803b1580156108af57600080fd5b505af41580156108c3573d6000803e3d6000fd5b50505050600173__$5e3d4bda46c81e962f48c99e99f980d175$__636fc55275909183846040518463ffffffff1660e01b8152600401808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060206040518083038186803b15801561098157600080fd5b505af4158015610995573d6000803e3d6000fd5b505050506040513d60208110156109ab57600080fd5b81019080805190602001909291905050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600373__$5e3d4bda46c81e962f48c99e99f980d175$__63d93ce3169091846040518363ffffffff1660e01b8152600401808381526020018281526020019250505060206040518083038186803b158015610a4557600080fd5b505af4158015610a59573d6000803e3d6000fd5b505050506040513d6020811015610a6f57600080fd5b81019080805190602001909291905050509050919050565b600173__$5e3d4bda46c81e962f48c99e99f980d175$__63e6ae03819091336040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b158015610b0d57600080fd5b505af4158015610b21573d6000803e3d6000fd5b505050506040513d6020811015610b3757600080fd5b8101908080519060200190929190505050610b5157610c1c565b600373__$5e3d4bda46c81e962f48c99e99f980d175$__63691d2b6c909183336040518463ffffffff1660e01b8152600401808481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001935050505060206040518083038186803b158015610bdf57600080fd5b505af4158015610bf3573d6000803e3d6000fd5b505050506040513d6020811015610c0957600080fd5b8101908080519060200190929190505050505b50565b6000600360010180549050905090565b60606040518060400160405280600681526020017f4552523430330000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f455252363131000000000000000000000000000000000000000000000000000081525090509056fe53797374656d4f776e65642e7472616e7366657253797374656d4f776e657273686970546865206d73672e73656e646572206973206e6f74207468652073797374656d206f776e6572546865206e65772073797374656d206f776e6572206d757374206e6f74206265204e554c4c53797374656d4f776e65642e7072655f6f6e6c79427953797374656d4f776e6572a265627a7a723158200ecb8ccaa49169e4f5f4ea1e3002c98a665154f79340544532f46bb9b32536a264736f6c634300050c0032";
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
        addActivityInstance(_id: Buffer) {
            const data = Encode(this.client).addActivityInstance(_id);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addActivityInstance();
            });
        }
        addProcessInstance(_address: string) {
            const data = Encode(this.client).addProcessInstance(_address);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addProcessInstance();
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
        getNumberOfProcessInstances() {
            const data = Encode(this.client).getNumberOfProcessInstances();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfProcessInstances();
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
        getProcessInstanceForActivity(_aiId: Buffer) {
            const data = Encode(this.client).getProcessInstanceForActivity(_aiId);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getProcessInstanceForActivity();
            });
        }
        getSystemOwner() {
            const data = Encode(this.client).getSystemOwner();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getSystemOwner();
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
        addActivityInstance: (_id: Buffer) => { return client.encode("BA6DD3E5", ["bytes32"], _id); },
        addProcessInstance: (_address: string) => { return client.encode("6CF5C9E5", ["address"], _address); },
        getNumberOfActivityInstances: () => { return client.encode("D8619D80", []); },
        getNumberOfProcessInstances: () => { return client.encode("57F31A6C", []); },
        getProcessInstanceAtIndex: (_pos: number) => { return client.encode("20CC0184", ["uint256"], _pos); },
        getProcessInstanceForActivity: (_aiId: Buffer) => { return client.encode("9CA651F8", ["bytes32"], _aiId); },
        getSystemOwner: () => { return client.encode("7F692A2A", []); },
        transferSystemOwnership: (_newOwner: string) => { return client.encode("0A452AD6", ["address"], _newOwner); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        addActivityInstance: (): void => { return; },
        addProcessInstance: (): void => { return; },
        getNumberOfActivityInstances: (): {
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
        getProcessInstanceAtIndex: (): {
            processInstanceAddress: string;
        } => {
            const [processInstanceAddress] = client.decode(data, ["address"]);
            return { processInstanceAddress: processInstanceAddress };
        },
        getProcessInstanceForActivity: (): [string] => { return client.decode(data, ["address"]); },
        getSystemOwner: (): [string] => { return client.decode(data, ["address"]); },
        transferSystemOwnership: (): void => { return; }
    }; };
}