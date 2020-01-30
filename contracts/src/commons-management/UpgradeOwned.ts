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
export module UpgradeOwned {
    export function Deploy<Tx>(client: Provider<Tx>, commons_base_ErrorsLib_sol_ErrorsLib: string): Promise<string> {
        let bytecode = "6080604052610633806100136000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063ac83ec7c1461003b578063e72848791461007f575b600080fd5b61007d6004803603602081101561005157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506100c9565b005b6100876104c6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561013c6104ef565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561019d578082015181840152602081019050610182565b50505050905090810190601f1680156101ca5780820380516001836020036101000a031916815260200191505b50848103835260238152602001806105dc602391396040018481038252602781526020018061058f602791396040019550505050505060006040518083038186803b15801561021857600080fd5b505af415801561022c573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461028261052c565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156102e35780820151818401526020810190506102c8565b50505050905090810190601f1680156103105780820380516001836020036101000a031916815260200191505b508481038352602581526020018061056a60259139604001848103825260268152602001806105b6602691396040019550505050505060006040518083038186803b15801561035e57600080fd5b505af4158015610372573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146104c357806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fd5b062c07f8a61fda452024e9c9d7db09548980e5f298d0f5cab47c3c9c172b36000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b50565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606040518060400160405280600681526020017f4552523430330000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f455252363131000000000000000000000000000000000000000000000000000081525090509056fe557067726164654f776e65642e7472616e73666572557067726164654f776e657273686970546865206d73672e73656e646572206973206e6f74207468652075706772616465206f776e6572546865206e65772075706772616465206f776e6572206d757374206e6f74206265204e554c4c557067726164654f776e65642e7072655f6f6e6c794279557067726164654f776e6572a265627a7a72315820daff5637d41db2906cac2fe9db7bee8d0c5e54778a9c3e23c3b835bd7bbf30aa64736f6c634300050c0032";
        bytecode = Replace(bytecode, "$ecfb6c4d3c3ceff197e19e585a0a53728c$", commons_base_ErrorsLib_sol_ErrorsLib);
        const data = bytecode;
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
        LogUpgradeOwnerChanged(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogUpgradeOwnerChanged", this.address, callback); }
        getUpgradeOwner() {
            const data = Encode(this.client).getUpgradeOwner();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getUpgradeOwner();
            });
        }
        transferUpgradeOwnership(_newOwner: string) {
            const data = Encode(this.client).transferUpgradeOwnership(_newOwner);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).transferUpgradeOwnership();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        getUpgradeOwner: () => { return client.encode("E7284879", []); },
        transferUpgradeOwnership: (_newOwner: string) => { return client.encode("AC83EC7C", ["address"], _newOwner); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        getUpgradeOwner: (): [string] => { return client.decode(data, ["address"]); },
        transferUpgradeOwnership: (): void => { return; }
    }; };
}