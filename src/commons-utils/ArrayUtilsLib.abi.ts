//Code generated by solts. DO NOT EDIT.
import { Readable } from "stream";
interface Provider<Tx> {
    deploy(msg: Tx, callback: (err: Error, addr: Uint8Array) => void): void;
    call(msg: Tx, callback: (err: Error, exec: Uint8Array) => void): void;
    callSim(msg: Tx, callback: (err: Error, exec: Uint8Array) => void): void;
    listen(signature: string, address: string, callback: (err: Error, event: any) => void): Readable;
    payload(data: string, address?: string): Tx;
    encode(name: string, inputs: string[], ...args: any[]): string;
    decode(data: Uint8Array, outputs: string[]): any;
}
function Call<Tx, Output>(client: Provider<Tx>, addr: string, data: string, isSim: boolean, callback: (exec: Uint8Array) => Output): Promise<Output> {
    const payload = client.payload(data, addr);
    if (isSim)
        return new Promise((resolve, reject) => { client.callSim(payload, (err, exec) => { err ? reject(err) : resolve(callback(exec)); }); });
    else
        return new Promise((resolve, reject) => { client.call(payload, (err, exec) => { err ? reject(err) : resolve(callback(exec)); }); });
}
function Replace(bytecode: string, name: string, address: string): string {
    address = address + Array(40 - address.length + 1).join("0");
    const truncated = name.slice(0, 36);
    const label = "__" + truncated + Array(37 - truncated.length).join("_") + "__";
    while (bytecode.indexOf(label) >= 0)
        bytecode = bytecode.replace(label, address);
    return bytecode;
}
export module ArrayUtilsLib {
    export function Deploy<Tx>(client: Provider<Tx>): Promise<string> {
        let bytecode = "610b26610026600b82828239805160001a60731461001957fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100925760003560e01c8063b32b8e2c11610065578063b32b8e2c14610401578063c01c0b5f146104db578063d5d8dc81146105b5578063d9a7d8bc1461068557610092565b806331dcf5bf146100975780633da80d66146101675780635b6d43a2146102575780636e16f75b14610331575b600080fd5b61014d600480360360208110156100ad57600080fd5b81019080803590602001906401000000008111156100ca57600080fd5b8201836020820111156100dc57600080fd5b803590602001918460208302840111640100000000831117156100fe57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050509192919290505050610755565b604051808215151515815260200191505060405180910390f35b61023d6004803603604081101561017d57600080fd5b810190808035906020019064010000000081111561019a57600080fd5b8201836020820111156101ac57600080fd5b803590602001918460208302840111640100000000831117156101ce57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050509192919290803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506107d7565b604051808215151515815260200191505060405180910390f35b6103176004803603604081101561026d57600080fd5b810190808035906020019064010000000081111561028a57600080fd5b82018360208201111561029c57600080fd5b803590602001918460208302840111640100000000831117156102be57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f82011690508083019250505050505050919291929080359060200190929190505050610852565b604051808215151515815260200191505060405180910390f35b6103e76004803603602081101561034757600080fd5b810190808035906020019064010000000081111561036457600080fd5b82018360208201111561037657600080fd5b8035906020019184602083028401116401000000008311171561039857600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192905050506108a1565b604051808215151515815260200191505060405180910390f35b6104c16004803603604081101561041757600080fd5b810190808035906020019064010000000081111561043457600080fd5b82018360208201111561044657600080fd5b8035906020019184602083028401116401000000008311171561046857600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019092919050505061094f565b604051808215151515815260200191505060405180910390f35b61059b600480360360408110156104f157600080fd5b810190808035906020019064010000000081111561050e57600080fd5b82018360208201111561052057600080fd5b8035906020019184602083028401116401000000008311171561054257600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019092919050505061099e565b604051808215151515815260200191505060405180910390f35b61066b600480360360208110156105cb57600080fd5b81019080803590602001906401000000008111156105e857600080fd5b8201836020820111156105fa57600080fd5b8035906020019184602083028401116401000000008311171561061c57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f8201169050808301925050505050505091929192905050506109ed565b604051808215151515815260200191505060405180910390f35b61073b6004803603602081101561069b57600080fd5b81019080803590602001906401000000008111156106b857600080fd5b8201836020820111156106ca57600080fd5b803590602001918460208302840111640100000000831117156106ec57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050509192919290505050610a6f565b604051808215151515815260200191505060405180910390f35b600080600090505b82518110156107cc5760006001820190505b83518110156107be5783818151811061078457fe5b602002602001015184838151811061079857fe5b602002602001015114156107b1576001925050506107d2565b808060010191505061076f565b50808060010191505061075d565b50600090505b919050565b600080600090505b8351811015610846578273ffffffffffffffffffffffffffffffffffffffff1684828151811061080b57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff16141561083957600191505061084c565b80806001019150506107df565b50600090505b92915050565b600080600090505b8351811015610895578284828151811061087057fe5b6020026020010151141561088857600191505061089b565b808060010191505061085a565b50600090505b92915050565b600080600090505b82518110156109445760006001820190505b8351811015610936578381815181106108d057fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff168483815181106108fa57fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1614156109295760019250505061094a565b80806001019150506108bb565b5080806001019150506108a9565b50600090505b919050565b600080600090505b8351811015610992578284828151811061096d57fe5b60200260200101511415610985576001915050610998565b8080600101915050610957565b50600090505b92915050565b600080600090505b83518110156109e157828482815181106109bc57fe5b602002602001015114156109d45760019150506109e7565b80806001019150506109a6565b50600090505b92915050565b600080600090505b8251811015610a645760006001820190505b8351811015610a5657838181518110610a1c57fe5b6020026020010151848381518110610a3057fe5b60200260200101511415610a4957600192505050610a6a565b8080600101915050610a07565b5080806001019150506109f5565b50600090505b919050565b600080600090505b8251811015610ae65760006001820190505b8351811015610ad857838181518110610a9e57fe5b6020026020010151848381518110610ab257fe5b60200260200101511415610acb57600192505050610aec565b8080600101915050610a89565b508080600101915050610a77565b50600090505b91905056fea265627a7a72315820e9095dd4768160e7f65ce9028c8c98f674963cd5a0c3898c25f8b3e29bad4e6564736f6c634300050c0032";
        const data = bytecode;
        const payload = client.payload(data);
        return new Promise((resolve, reject) => { client.deploy(payload, (err, addr) => {
            if (err)
                reject(err);
            else {
                const address = Buffer.from(addr).toString("hex").toUpperCase();
                resolve(address);
            }
        }); });
    }
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        contains(_list: string[] | number[] | number[] | Buffer[], _value: string | number | number | Buffer) {
            const data = Encode(this.client).contains(_list, _value);
            return Call<Tx, [boolean]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).contains();
            });
        }
        hasDuplicates(_list: number[] | string[] | number[] | Buffer[]) {
            const data = Encode(this.client).hasDuplicates(_list);
            return Call<Tx, [boolean]>(this.client, this.address, data, true, (exec: Uint8Array) => {
                return Decode(this.client, exec).hasDuplicates();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        contains: (_list: string[] | number[] | number[] | Buffer[], _value: string | number | number | Buffer) => {
            if (typeof _list === "string" && typeof _value === "string")
                return client.encode("3DA80D66", ["address[]", "address"], _list, _value);
            if (typeof _list === "string" && typeof _value === "string")
                return client.encode("5B6D43A2", ["int256[]", "int256"], _list, _value);
            if (typeof _list === "string" && typeof _value === "string")
                return client.encode("B32B8E2C", ["uint256[]", "uint256"], _list, _value);
            if (typeof _list === "string" && typeof _value === "string")
                return client.encode("C01C0B5F", ["bytes32[]", "bytes32"], _list, _value);
        },
        hasDuplicates: (_list: number[] | string[] | number[] | Buffer[]) => {
            if (typeof _list === "string")
                return client.encode("31DCF5BF", ["uint256[]"], _list);
            if (typeof _list === "string")
                return client.encode("6E16F75B", ["address[]"], _list);
            if (typeof _list === "string")
                return client.encode("D5D8DC81", ["int256[]"], _list);
            if (typeof _list === "string")
                return client.encode("D9A7D8BC", ["bytes32[]"], _list);
        }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        contains: (): [boolean] => { return client.decode(data, ["bool"]); },
        hasDuplicates: (): [boolean] => { return client.decode(data, ["bool"]); }
    }; };
}