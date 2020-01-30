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
export module ApplicationRegistryDb {
    export function Deploy<Tx>(client: Provider<Tx>, commons_base_ErrorsLib_sol_ErrorsLib: string): Promise<string> {
        let bytecode = "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506112d9806100606000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063a86da9b411610071578063a86da9b414610266578063c46df94e14610284578063cbd8558e14610352578063e51d063414610394578063e60ced2c146103e0578063efed99b414610447576100a9565b80630a452ad6146100ae5780637f692a2a146100f25780638166b73d1461013c57806388114be7146101de578063903e7a1514610224575b600080fd5b6100f0600480360360208110156100c457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104ad565b005b6100fa6108aa565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101c8600480360360a081101561015257600080fd5b8101908080359060200190929190803560ff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190803590602001909291905050506108d3565b6040518082815260200191505060405180910390f35b61020a600480360360208110156101f457600080fd5b8101908080359060200190929190505050610c18565b604051808215151515815260200191505060405180910390f35b6102506004803603602081101561023a57600080fd5b8101908080359060200190929190505050610c48565b6040518082815260200191505060405180910390f35b61026e610c6b565b6040518082815260200191505060405180910390f35b6102b06004803603602081101561029a57600080fd5b8101908080359060200190929190505050610c7a565b604051808660ff1660ff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001847bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020018381526020018281526020019550505050505060405180910390f35b61037e6004803603602081101561036857600080fd5b8101908080359060200190929190505050610d6e565b6040518082815260200191505060405180910390f35b6103ca600480360360408110156103aa57600080fd5b810190808035906020019092919080359060200190929190505050610d97565b6040518082815260200191505060405180910390f35b610416600480360360408110156103f657600080fd5b810190808035906020019092919080359060200190929190505050610dd3565b604051808360ff1660ff16815260200182600181111561043257fe5b60ff1681526020019250505060405180910390f35b6104976004803603608081101561045d57600080fd5b810190808035906020019092919080359060200190929190803560ff169060200190929190803560ff169060200190929190505050610e5d565b6040518082815260200191505060405180910390f35b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610520611188565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610581578082015181840152602081019050610566565b50505050905090810190601f1680156105ae5780820380516001836020036101000a031916815260200191505b50848103835260218152602001806112846021913960400184810382526026815260200180611239602691396040019550505050505060006040518083038186803b1580156105fc57600080fd5b505af4158015610610573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146106666111c5565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156106c75780820151818401526020810190506106ac565b50505050905090810190601f1680156106f45780820380516001836020036101000a031916815260200191505b5084810383526023815260200180611216602391396040018481038252602581526020018061125f602591396040019550505050505060006040518083038186803b15801561074257600080fd5b505af4158015610756573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146108a7577f0814a6975d95b7ef86d699e601b879308be10e8f2c4c77a940021f3d61b09eaf6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610948611188565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156109a957808201518184015260208101905061098e565b50505050905090810190601f1680156109d65780820380516001836020036101000a031916815260200191505b50848103835260218152602001806112846021913960400184810382526026815260200180611239602691396040019550505050505060006040518083038186803b158015610a2457600080fd5b505af4158015610a38573d6000803e3d6000fd5b505050506001600001600087815260200190815260200160002060060160009054906101000a900460ff1615610a7757610a70611202565b9050610c0f565b6001800186908060018154018082558091505090600182039060005260206000200160009091929091909150556001600001600088815260200190815260200160002060000181905550856001600001600088815260200190815260200160002060010160000181905550846001600001600088815260200190815260200160002060010160010160006101000a81548160ff02191690836002811115610b1a57fe5b0217905550836001600001600088815260200190815260200160002060010160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826001600001600088815260200190815260200160002060010160010160156101000a81548163ffffffff021916908360e01c0217905550816001600001600088815260200190815260200160002060010160020181905550600180600001600088815260200190815260200160002060060160006101000a81548160ff021916908315150217905550610c0c61120c565b90505b95945050505050565b60006001600001600083815260200190815260200160002060060160009054906101000a900460ff169050919050565b6000600180018281548110610c5957fe5b90600052602060002001549050919050565b60006001800180549050905090565b60008060008060006001600001600087815260200190815260200160002060010160010160009054906101000a900460ff166002811115610cb757fe5b94506001600001600087815260200190815260200160002060010160010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1693506001600001600087815260200190815260200160002060010160010160159054906101000a900460e01b9250600160000160008781526020019081526020016000206001016002015491506001600001600087815260200190815260200160002060010160040180549050905091939590929450565b600060016000016000838152602001908152602001600020600101600401805490509050919050565b6000600160000160008481526020019081526020016000206001016004018281548110610dc057fe5b9060005260206000200154905092915050565b60008060016000016000858152602001908152602001600020600101600301600084815260200190815260200160002060010160009054906101000a900460ff16915060016000016000858152602001908152602001600020600101600301600084815260200190815260200160002060010160019054906101000a900460ff1690509250929050565b600073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610ed2611188565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610f33578082015181840152602081019050610f18565b50505050905090810190601f168015610f605780820380516001836020036101000a031916815260200191505b50848103835260218152602001806112846021913960400184810382526026815260200180611239602691396040019550505050505060006040518083038186803b158015610fae57600080fd5b505af4158015610fc2573d6000803e3d6000fd5b5050505060016000016000868152602001908152602001600020600101600301600085815260200190815260200160002060010160029054906101000a900460ff161561101857611011611202565b9050611180565b6001600001600086815260200190815260200160002060010160040184908060018154018082558091505090600182039060005260206000200160009091929091909150555083600160000160008781526020019081526020016000206001016003016000868152602001908152602001600020600001819055508260016000016000878152602001908152602001600020600101600301600086815260200190815260200160002060010160006101000a81548160ff021916908360ff1602179055508160016000016000878152602001908152602001600020600101600301600086815260200190815260200160002060010160016101000a81548160ff0219169083600181111561112857fe5b02179055506001806000016000878152602001908152602001600020600101600301600086815260200190815260200160002060010160026101000a81548160ff02191690831515021790555061117d61120c565b90505b949350505050565b60606040518060400160405280600681526020017f4552523430330000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f4552523631310000000000000000000000000000000000000000000000000000815250905090565b60006103ea905090565b6000600190509056fe53797374656d4f776e65642e7472616e7366657253797374656d4f776e657273686970546865206d73672e73656e646572206973206e6f74207468652073797374656d206f776e6572546865206e65772073797374656d206f776e6572206d757374206e6f74206265204e554c4c53797374656d4f776e65642e7072655f6f6e6c79427953797374656d4f776e6572a265627a7a7231582022b29a66e07cd922e4c178bac63113b6154591984e6f3b4b46429e3880125aa364736f6c634300050c0032";
        bytecode = Replace(bytecode, "$ecfb6c4d3c3ceff197e19e585a0a53728c$", commons_base_ErrorsLib_sol_ErrorsLib);
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
        addAccessPoint(_id: Buffer, _accessPointId: Buffer, _dataType: number, _direction: number) {
            const data = Encode(this.client).addAccessPoint(_id, _accessPointId, _dataType, _direction);
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addAccessPoint();
            });
        }
        addApplication(_id: Buffer, _type: number, _location: string, _function: Buffer, _webForm: Buffer) {
            const data = Encode(this.client).addApplication(_id, _type, _location, _function, _webForm);
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addApplication();
            });
        }
        applicationExists(_id: Buffer) {
            const data = Encode(this.client).applicationExists(_id);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).applicationExists();
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
        getApplicationAtIndex(_index: number) {
            const data = Encode(this.client).getApplicationAtIndex(_index);
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
        addAccessPoint: (_id: Buffer, _accessPointId: Buffer, _dataType: number, _direction: number) => { return client.encode("EFED99B4", ["bytes32", "bytes32", "uint8", "uint8"], _id, _accessPointId, _dataType, _direction); },
        addApplication: (_id: Buffer, _type: number, _location: string, _function: Buffer, _webForm: Buffer) => { return client.encode("8166B73D", ["bytes32", "uint8", "address", "bytes4", "bytes32"], _id, _type, _location, _function, _webForm); },
        applicationExists: (_id: Buffer) => { return client.encode("88114BE7", ["bytes32"], _id); },
        getAccessPointAtIndex: (_id: Buffer, _index: number) => { return client.encode("E51D0634", ["bytes32", "uint256"], _id, _index); },
        getAccessPointData: (_id: Buffer, _accessPointId: Buffer) => { return client.encode("E60CED2C", ["bytes32", "bytes32"], _id, _accessPointId); },
        getApplicationAtIndex: (_index: number) => { return client.encode("903E7A15", ["uint256"], _index); },
        getApplicationData: (_id: Buffer) => { return client.encode("C46DF94E", ["bytes32"], _id); },
        getNumberOfAccessPoints: (_id: Buffer) => { return client.encode("CBD8558E", ["bytes32"], _id); },
        getNumberOfApplications: () => { return client.encode("A86DA9B4", []); },
        getSystemOwner: () => { return client.encode("7F692A2A", []); },
        transferSystemOwnership: (_newOwner: string) => { return client.encode("0A452AD6", ["address"], _newOwner); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        addAccessPoint: (): [number] => { return client.decode(data, ["uint256"]); },
        addApplication: (): [number] => { return client.decode(data, ["uint256"]); },
        applicationExists: (): [boolean] => { return client.decode(data, ["bool"]); },
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
        getSystemOwner: (): [string] => { return client.decode(data, ["address"]); },
        transferSystemOwnership: (): void => { return; }
    }; };
}