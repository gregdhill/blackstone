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
export module ParticipantsManagerDb {
    export function Deploy<Tx>(client: Provider<Tx>, commons_base_ErrorsLib_sol_ErrorsLib: string, commons_collections_MappingsLib_sol_MappingsLib: string): Promise<string> {
        let bytecode = "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506111cf806100606000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80637f692a2a116100715780637f692a2a14610282578063bd3a694e146102cc578063d462a018146102ea578063d68287df14610308578063e7abd5ea14610360578063fb47e016146103bc576100a9565b806302f53264146100ae578063031e8eaf1461010a5780630a452ad61461017857806333793731146101bc57806364a6a2871461022a575b600080fd5b6100f0600480360360208110156100c457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610418565b604051808215151515815260200191505060405180910390f35b6101366004803603602081101561012057600080fd5b81019080803590602001909291905050506104e2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101ba6004803603602081101561018e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061058f565b005b6101e8600480360360208110156101d257600080fd5b810190808035906020019092919050505061098c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61026c6004803603602081101561024057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a39565b6040518082815260200191505060405180910390f35b61028a610c77565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102d4610ca0565b6040518082815260200191505060405180910390f35b6102f2610cb0565b6040518082815260200191505060405180910390f35b61034a6004803603602081101561031e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610cbf565b6040518082815260200191505060405180910390f35b6103a26004803603602081101561037657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610efd565b604051808215151515815260200191505060405180910390f35b6103fe600480360360208110156103d257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610fc7565b604051808215151515815260200191505060405180910390f35b6000600173__$5e3d4bda46c81e962f48c99e99f980d175$__63f755018d9091846040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b1580156104a057600080fd5b505af41580156104b4573d6000803e3d6000fd5b505050506040513d60208110156104ca57600080fd5b81019080805190602001909291905050509050919050565b600080600373__$5e3d4bda46c81e962f48c99e99f980d175$__6380ed56bd9091856040518363ffffffff1660e01b81526004018083815260200182815260200192505050604080518083038186803b15801561053e57600080fd5b505af4158015610552573d6000803e3d6000fd5b505050506040513d604081101561056857600080fd5b81019080805190602001909291908051906020019092919050505091505080915050919050565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610602611091565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610663578082015181840152602081019050610648565b50505050905090810190601f1680156106905780820380516001836020036101000a031916815260200191505b508481038352602181526020018061117a602191396040018481038252602681526020018061112f602691396040019550505050505060006040518083038186803b1580156106de57600080fd5b505af41580156106f2573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146107486110ce565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156107a957808201518184015260208101905061078e565b50505050905090810190601f1680156107d65780820380516001836020036101000a031916815260200191505b508481038352602381526020018061110c6023913960400184810382526025815260200180611155602591396040019550505050505060006040518083038186803b15801561082457600080fd5b505af4158015610838573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610989577f0814a6975d95b7ef86d699e601b879308be10e8f2c4c77a940021f3d61b09eaf6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b600080600173__$5e3d4bda46c81e962f48c99e99f980d175$__6380ed56bd9091856040518363ffffffff1660e01b81526004018083815260200182815260200192505050604080518083038186803b1580156109e857600080fd5b505af41580156109fc573d6000803e3d6000fd5b505050506040513d6040811015610a1257600080fd5b81019080805190602001909291908051906020019092919050505091505080915050919050565b600073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610aae611091565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610b0f578082015181840152602081019050610af4565b50505050905090810190601f168015610b3c5780820380516001836020036101000a031916815260200191505b508481038352602181526020018061117a602191396040018481038252602681526020018061112f602691396040019550505050505060006040518083038186803b158015610b8a57600080fd5b505af4158015610b9e573d6000803e3d6000fd5b50505050600173__$5e3d4bda46c81e962f48c99e99f980d175$__633d4f1a2a90918460016040518463ffffffff1660e01b8152600401808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182151515158152602001935050505060206040518083038186803b158015610c3557600080fd5b505af4158015610c49573d6000803e3d6000fd5b505050506040513d6020811015610c5f57600080fd5b81019080805190602001909291905050509050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600360010180549050905090565b60006001800180549050905090565b600073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610d34611091565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610d95578082015181840152602081019050610d7a565b50505050905090810190601f168015610dc25780820380516001836020036101000a031916815260200191505b508481038352602181526020018061117a602191396040018481038252602681526020018061112f602691396040019550505050505060006040518083038186803b158015610e1057600080fd5b505af4158015610e24573d6000803e3d6000fd5b50505050600373__$5e3d4bda46c81e962f48c99e99f980d175$__633d4f1a2a90918460016040518463ffffffff1660e01b8152600401808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182151515158152602001935050505060206040518083038186803b158015610ebb57600080fd5b505af4158015610ecf573d6000803e3d6000fd5b505050506040513d6020811015610ee557600080fd5b81019080805190602001909291905050509050919050565b6000600373__$5e3d4bda46c81e962f48c99e99f980d175$__63f755018d9091846040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b158015610f8557600080fd5b505af4158015610f99573d6000803e3d6000fd5b505050506040513d6020811015610faf57600080fd5b81019080805190602001909291905050509050919050565b6000600173__$5e3d4bda46c81e962f48c99e99f980d175$__6356775fda9091846040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b15801561104f57600080fd5b505af4158015611063573d6000803e3d6000fd5b505050506040513d602081101561107957600080fd5b81019080805190602001909291905050509050919050565b60606040518060400160405280600681526020017f4552523430330000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f455252363131000000000000000000000000000000000000000000000000000081525090509056fe53797374656d4f776e65642e7472616e7366657253797374656d4f776e657273686970546865206d73672e73656e646572206973206e6f74207468652073797374656d206f776e6572546865206e65772073797374656d206f776e6572206d757374206e6f74206265204e554c4c53797374656d4f776e65642e7072655f6f6e6c79427953797374656d4f776e6572a265627a7a7231582089c8b195331066b3d4eb767e4cb918a7b8600eb1a80989d1fbc97bc580c82c9864736f6c634300050c0032";
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
        addOrganization(_address: string) {
            const data = Encode(this.client).addOrganization(_address);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addOrganization();
            });
        }
        addUserAccount(_account: string) {
            const data = Encode(this.client).addUserAccount(_account);
            return Call<Tx, {
                error: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addUserAccount();
            });
        }
        getNumberOfOrganizations() {
            const data = Encode(this.client).getNumberOfOrganizations();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfOrganizations();
            });
        }
        getNumberOfUserAccounts() {
            const data = Encode(this.client).getNumberOfUserAccounts();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfUserAccounts();
            });
        }
        getOrganizationAtIndex(_index: number) {
            const data = Encode(this.client).getOrganizationAtIndex(_index);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOrganizationAtIndex();
            });
        }
        getSystemOwner() {
            const data = Encode(this.client).getSystemOwner();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getSystemOwner();
            });
        }
        getUserAccount(_account: string) {
            const data = Encode(this.client).getUserAccount(_account);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getUserAccount();
            });
        }
        getUserAccountAtIndex(_index: number) {
            const data = Encode(this.client).getUserAccountAtIndex(_index);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getUserAccountAtIndex();
            });
        }
        organizationExists(_address: string) {
            const data = Encode(this.client).organizationExists(_address);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).organizationExists();
            });
        }
        transferSystemOwnership(_newOwner: string) {
            const data = Encode(this.client).transferSystemOwnership(_newOwner);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).transferSystemOwnership();
            });
        }
        userAccountExists(_account: string) {
            const data = Encode(this.client).userAccountExists(_account);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).userAccountExists();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        addOrganization: (_address: string) => { return client.encode("D68287DF", ["address"], _address); },
        addUserAccount: (_account: string) => { return client.encode("64A6A287", ["address"], _account); },
        getNumberOfOrganizations: () => { return client.encode("BD3A694E", []); },
        getNumberOfUserAccounts: () => { return client.encode("D462A018", []); },
        getOrganizationAtIndex: (_index: number) => { return client.encode("031E8EAF", ["uint256"], _index); },
        getSystemOwner: () => { return client.encode("7F692A2A", []); },
        getUserAccount: (_account: string) => { return client.encode("FB47E016", ["address"], _account); },
        getUserAccountAtIndex: (_index: number) => { return client.encode("33793731", ["uint256"], _index); },
        organizationExists: (_address: string) => { return client.encode("E7ABD5EA", ["address"], _address); },
        transferSystemOwnership: (_newOwner: string) => { return client.encode("0A452AD6", ["address"], _newOwner); },
        userAccountExists: (_account: string) => { return client.encode("02F53264", ["address"], _account); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        addOrganization: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        addUserAccount: (): {
            error: number;
        } => {
            const [error] = client.decode(data, ["uint256"]);
            return { error: error };
        },
        getNumberOfOrganizations: (): [number] => { return client.decode(data, ["uint256"]); },
        getNumberOfUserAccounts: (): [number] => { return client.decode(data, ["uint256"]); },
        getOrganizationAtIndex: (): [string] => { return client.decode(data, ["address"]); },
        getSystemOwner: (): [string] => { return client.decode(data, ["address"]); },
        getUserAccount: (): [boolean] => { return client.decode(data, ["bool"]); },
        getUserAccountAtIndex: (): [string] => { return client.decode(data, ["address"]); },
        organizationExists: (): [boolean] => { return client.decode(data, ["bool"]); },
        transferSystemOwnership: (): void => { return; },
        userAccountExists: (): [boolean] => { return client.decode(data, ["bool"]); }
    }; };
}