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
export module DefaultApplicationRegistry {
    export function Deploy<Tx>(client: Provider<Tx>, commons_base_ErrorsLib_sol_ErrorsLib: string): Promise<string> {
        let bytecode = "6080604052600160008060018060006301ffc9a760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff0219169083151502179055508260026000600381106200006a57fe5b602091828204019190066101000a81548160ff021916908360ff1602179055508160026001600381106200009a57fe5b602091828204019190066101000a81548160ff021916908360ff1602179055508060028060038110620000c957fe5b602091828204019190066101000a81548160ff021916908360ff1602179055506200014060405160200180807f676574417274696661637456657273696f6e2829000000000000000000000000815250601401905060405160208183030381529060405280519060200120620001e160201b60201c565b50505033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620001db60405160200180807f7570677261646528616464726573732900000000000000000000000000000000815250601001905060405160208183030381529060405280519060200120620001e160201b60201c565b620002ce565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141562000262576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f81526020018062002d40602f913960400191505060405180910390fd5b6001806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b612a6280620002de6000396000f3fe608060405234801561001057600080fd5b506004361061018d5760003560e01c8063a86da9b4116100de578063e51d063411610097578063e72c673711610071578063e72c6737146108b1578063efed99b41461090d578063f085f6dd14610973578063f4ace0d0146109975761018d565b8063e51d0634146107b4578063e60ced2c14610800578063e7284879146108675761018d565b8063a86da9b41461058a578063ac83ec7c146105a8578063b21c815f146105ec578063c46df94e14610648578063cbd8558e14610716578063e10533c6146107585761018d565b80635c0301381161014b5780637589adb7116101255780637589adb71461040957806378bc0b0d1461042d5780638166b73d146104a6578063903e7a15146105485761018d565b80635c0301381461034d5780635c646a05146103a5578063756b2e6c146103c35761018d565b8062c4efa41461019257806301ffc9a7146101b05780630900f0101461021557806335657e68146102715780634ddaf8f2146102cd57806357e0ebca14610329575b600080fd5b61019a6109f3565b6040518082815260200191505060405180910390f35b6101fb600480360360208110156101c657600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190929190505050610a17565b604051808215151515815260200191505060405180910390f35b6102576004803603602081101561022b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a7f565b604051808215151515815260200191505060405180910390f35b6102b36004803603602081101561028757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f14565b604051808215151515815260200191505060405180910390f35b61030f600480360360208110156102e357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f1f565b604051808215151515815260200191505060405180910390f35b6103316111f0565b604051808260ff1660ff16815260200191505060405180910390f35b61038f6004803603602081101561036357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061121b565b6040518082815260200191505060405180910390f35b6103ad611317565b6040518082815260200191505060405180910390f35b6103cb61133b565b6040518082600360200280838360005b838110156103f65780820151818401526020810190506103db565b5050505090500191505060405180910390f35b6104116113ac565b604051808260ff1660ff16815260200191505060405180910390f35b6104906004803603606081101561044357600080fd5b8101908080606001906003806020026040519081016040528092919082600360200280828437600081840152601f19601f82011690508083019250505050505091929192905050506113d7565b6040518082815260200191505060405180910390f35b610532600480360360a08110156104bc57600080fd5b8101908080359060200190929190803560ff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191690602001909291908035906020019092919050505061144d565b6040518082815260200191505060405180910390f35b6105746004803603602081101561055e57600080fd5b81019080803590602001909291905050506116a4565b6040518082815260200191505060405180910390f35b61059261175a565b6040518082815260200191505060405180910390f35b6105ea600480360360208110156105be57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611803565b005b6105f4611c04565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b6106746004803603602081101561065e57600080fd5b8101908080359060200190929190505050611c4e565b604051808660ff1660ff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001847bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020018381526020018281526020019550505050505060405180910390f35b6107426004803603602081101561072c57600080fd5b8101908080359060200190929190505050611d48565b6040518082815260200191505060405180910390f35b610760611dfe565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b6107ea600480360360408110156107ca57600080fd5b810190808035906020019092919080359060200190929190505050611e48565b6040518082815260200191505060405180910390f35b6108366004803603604081101561081657600080fd5b810190808035906020019092919080359060200190929190505050611f07565b604051808360ff1660ff16815260200182600181111561085257fe5b60ff1681526020019250505060405180910390f35b61086f611fd7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6108b9612001565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b61095d6004803603608081101561092357600080fd5b810190808035906020019092919080359060200190929190803560ff169060200190929190803560ff16906020019092919050505061202e565b6040518082815260200191505060405180910390f35b61097b61226d565b604051808260ff1660ff16815260200191505060405180910390f35b6109d9600480360360208110156109ad57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612297565b604051808215151515815260200191505060405180910390f35b7f414e3a2f2f6170706c69636174696f6e7300000000000000000000000000000081565b600060016000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b600073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610af56125d9565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610b56578082015181840152602081019050610b3b565b50505050905090810190601f168015610b835780820380516001836020036101000a031916815260200191505b50848103835260238152602001806129b460239139604001848103825260278152602001806128e4602791396040019550505050505060006040518083038186803b158015610bd157600080fd5b505af4158015610be5573d6000803e3d6000fd5b505050508173__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef6001610c0f8461121b565b12610c18612616565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610c79578082015181840152602081019050610c5e565b50505050905090810190601f168015610ca65780820380516001836020036101000a031916815260200191505b508481038352602981526020018061293c602991396040018481038252604b815260200180612834604b91396060019550505050505060006040518083038186803b158015610cf457600080fd5b505af4158015610d08573d6000803e3d6000fd5b50505050610d1583610f1f565b8015610dd757508273ffffffffffffffffffffffffffffffffffffffff166335657e68306040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b158015610d9b57600080fd5b505af1158015610daf573d6000803e3d6000fd5b505050506040513d6020811015610dc557600080fd5b81019080805190602001909291905050505b915073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef8315610dfd612653565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015610e5e578082015181840152602081019050610e43565b50505050905090810190601f168015610e8b5780820380516001836020036101000a031916815260200191505b508481038352601b8152602001807f41627374726163745570677261646561626c652e757067726164650000000000815250602001848103825260408152602001806128a4604091396040019550505050505060006040518083038186803b158015610ef657600080fd5b505af4158015610f0a573d6000803e3d6000fd5b5050505050919050565b600060019050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630a452ad6836040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b158015610fc157600080fd5b505af1158015610fd5573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff1663f4ace0d06000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15801561107957600080fd5b505af115801561108d573d6000803e3d6000fd5b505050506040513d60208110156110a357600080fd5b8101908080519060200190929190505050905073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef82156110da612653565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561113b578082015181840152602081019050611120565b50505050905090810190601f1680156111685780820380516001836020036101000a031916815260200191505b508481038352601f8152602001807f416273747261637444625570677261646561626c652e6d696772617465546f008152506020018481038252603181526020018061290b603191396040019550505050505060006040518083038186803b1580156111d357600080fd5b505af41580156111e7573d6000803e3d6000fd5b50505050919050565b6000600260006003811061120057fe5b602091828204019190069054906101000a900460ff16905090565b6000611310600260038060200260405190810160405280929190826003801561127f576020028201916000905b82829054906101000a900460ff1660ff16815260200190600101906020826000010492830192600103820291508084116112485790505b50505050508373ffffffffffffffffffffffffffffffffffffffff1663756b2e6c6040518163ffffffff1660e01b815260040160606040518083038186803b1580156112ca57600080fd5b505afa1580156112de573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250606081101561130357600080fd5b8101908091905050612690565b9050919050565b7f414e3a2f2f6170706c69636174696f6e732f6163636573732d706f696e74730081565b6113436127ed565b60026003806020026040519081016040528092919082600380156113a2576020028201916000905b82829054906101000a900460ff1660ff168152602001906001019060208260000104928301926001038202915080841161136b5790505b5050505050905090565b600060026001600381106113bc57fe5b602091828204019190069054906101000a900460ff16905090565b6000611446600260038060200260405190810160405280929190826003801561143b576020028201916000905b82829054906101000a900460ff1660ff16815260200190600101906020826000010492830192600103820291508084116114045790505b505050505083612690565b9050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638166b73d87878787876040518663ffffffff1660e01b8152600401808681526020018560028111156114b657fe5b60ff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200182815260200195505050505050602060405180830381600087803b15801561155b57600080fd5b505af115801561156f573d6000803e3d6000fd5b505050506040513d602081101561158557600080fd5b810190808051906020019092919050505090506115a0612743565b81141561169b577f414e3a2f2f6170706c69636174696f6e730000000000000000000000000000007f508c695ab328384fcdbbe37d4484a497a7aa922f6c0239f5fc5ce9d239d6565c878760028111156115f657fe5b878787604051808681526020018560ff1660ff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020018281526020019550505050505060405180910390a25b95945050505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663903e7a15836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561171857600080fd5b505afa15801561172c573d6000803e3d6000fd5b505050506040513d602081101561174257600080fd5b81019080805190602001909291905050509050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a86da9b46040518163ffffffff1660e01b815260040160206040518083038186803b1580156117c357600080fd5b505afa1580156117d7573d6000803e3d6000fd5b505050506040513d60208110156117ed57600080fd5b8101908080519060200190929190505050905090565b73__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156118776125d9565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b838110156118d85780820151818401526020810190506118bd565b50505050905090810190601f1680156119055780820380516001836020036101000a031916815260200191505b50848103835260238152602001806129b460239139604001848103825260278152602001806128e4602791396040019550505050505060006040518083038186803b15801561195357600080fd5b505af4158015611967573d6000803e3d6000fd5b5050505073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146119bd61274c565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b83811015611a1e578082015181840152602081019050611a03565b50505050905090810190601f168015611a4b5780820380516001836020036101000a031916815260200191505b508481038352602581526020018061287f6025913960400184810382526026815260200180612965602691396040019550505050505060006040518083038186803b158015611a9957600080fd5b505af4158015611aad573d6000803e3d6000fd5b505050508073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611c015780600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fd5b062c07f8a61fda452024e9c9d7db09548980e5f298d0f5cab47c3c9c172b3600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b50565b60405160200180807f757067726164652861646472657373290000000000000000000000000000000081525060100190506040516020818303038152906040528051906020012081565b60008060008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c46df94e876040518263ffffffff1660e01b81526004018082815260200191505060a06040518083038186803b158015611cc857600080fd5b505afa158015611cdc573d6000803e3d6000fd5b505050506040513d60a0811015611cf257600080fd5b810190808051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190505050809550819650829750839850849950505050505091939590929450565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cbd8558e836040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b158015611dbc57600080fd5b505afa158015611dd0573d6000803e3d6000fd5b505050506040513d6020811015611de657600080fd5b81019080805190602001909291905050509050919050565b60405160200180807f676574417274696661637456657273696f6e282900000000000000000000000081525060140190506040516020818303038152906040528051906020012081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e51d063484846040518363ffffffff1660e01b8152600401808381526020018281526020019250505060206040518083038186803b158015611ec457600080fd5b505afa158015611ed8573d6000803e3d6000fd5b505050506040513d6020811015611eee57600080fd5b8101908080519060200190929190505050905092915050565b6000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e60ced2c85856040518363ffffffff1660e01b81526004018083815260200182815260200192505050604080518083038186803b158015611f8357600080fd5b505afa158015611f97573d6000803e3d6000fd5b505050506040513d6040811015611fad57600080fd5b81019080805190602001909291908051906020019092919050505080925081935050509250929050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b604051602001808061298b6029913960290190506040516020818303038152906040528051906020012081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166388114be7866040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b1580156120a257600080fd5b505afa1580156120b6573d6000803e3d6000fd5b505050506040513d60208110156120cc57600080fd5b81019080805190602001909291905050506120f0576120e9612789565b9050612265565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663efed99b4868686866040518563ffffffff1660e01b8152600401808581526020018481526020018360ff1660ff16815260200182600181111561216857fe5b60ff168152602001945050505050602060405180830381600087803b15801561219057600080fd5b505af11580156121a4573d6000803e3d6000fd5b505050506040513d60208110156121ba57600080fd5b810190808051906020019092919050505090506121d5612743565b811415612264577f414e3a2f2f6170706c69636174696f6e732f6163636573732d706f696e7473007fe6cd28a5574a35135d11e8d4dba593166a5980443e10ba70b4b753d4543fcaec86868686600181111561222d57fe5b604051808581526020018481526020018360ff1660ff1681526020018260ff1660ff16815260200194505050505060405180910390a25b5b949350505050565b60006002806003811061227c57fe5b602091828204019190069054906101000a900460ff16905090565b600073__$ecfb6c4d3c3ceff197e19e585a0a53728c$__6375d7bdef600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141580156123df5750600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1663e72848796040518163ffffffff1660e01b815260040160206040518083038186803b15801561238b57600080fd5b505afa15801561239f573d6000803e3d6000fd5b505050506040513d60208110156123b557600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1614155b6123e76125d9565b6040518363ffffffff1660e01b81526004018083151515158152602001806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561244857808201518184015260208101905061242d565b50505050905090810190601f1680156124755780820380516001836020036101000a031916815260200191505b508481038352602481526020018061281060249139604001848103825260578152602001806129d7605791396060019550505050505060006040518083038186803b1580156124c357600080fd5b505af41580156124d7573d6000803e3d6000fd5b505050503073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16637f692a2a6040518163ffffffff1660e01b815260040160206040518083038186803b15801561253857600080fd5b505afa15801561254c573d6000803e3d6000fd5b505050506040513d602081101561256257600080fd5b810190808051906020019092919050505073ffffffffffffffffffffffffffffffffffffffff1614156125d457816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600190505b919050565b60606040518060400160405280600681526020017f4552523430330000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f4552523432320000000000000000000000000000000000000000000000000000815250905090565b60606040518060400160405280600681526020017f4552523630300000000000000000000000000000000000000000000000000000815250905090565b60006126be836000600381106126a257fe5b6020020151836000600381106126b457fe5b6020020151612793565b9050600081146126d05780905061273d565b6126fc836001600381106126e057fe5b6020020151836001600381106126f257fe5b6020020151612793565b90506000811461270e5780905061273d565b61273a8360026003811061271e57fe5b60200201518360026003811061273057fe5b6020020151612793565b90505b92915050565b60006001905090565b60606040518060400160405280600681526020017f4552523631310000000000000000000000000000000000000000000000000000815250905090565b60006103e9905090565b60008260ff168260ff1614156127ac57600090506127e7565b8260ff168260ff1610156127e2577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90506127e7565b600190505b92915050565b604051806060016040528060039060208202803883398082019150509050509056fe416273747261637444625570677261646561626c652e6163636570744461746162617365546865207570677261646520737563636573736f72206d75737420686176652061206869676865722076657273696f6e207468616e207468652063757272656e7420636f6e74726163742e557067726164654f776e65642e7472616e73666572557067726164654f776e6572736869704f6e65206f66206d696772617465546f202f206d69677261746546726f6d2072657475726e65642066616c73652e2041626f7274696e6720757067726164652e546865206d73672e73656e646572206973206e6f74207468652075706772616465206f776e657254686520444220636f6e747261637420776173206e6f7420616363657074656420627920746865206e6577206f776e657241627374726163745570677261646561626c652e7072655f68696768657256657273696f6e4f6e6c79546865206e65772075706772616465206f776e6572206d757374206e6f74206265204e554c4c636f6d706c65746528616464726573732c627974657333322c627974657333322c6164647265737329557067726164654f776e65642e7072655f6f6e6c794279557067726164654f776e6572546865206d73672e73656e646572206d757374206569746865722062652074686520757067726164654f776e6572206f72206120636f6e74726163742077697468207468652073616d6520757067726164654f776e6572a265627a7a723158208e3d02fc6ab1ed85cdf04879f6cb22e04cf75c5e7bb967ac286bb942a10e0d1864736f6c634300050c0032466f7262696464656e2076616c7565203078666666666666666620666f722045524331363520696e74657266616365";
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
        LogApplicationAccessPointCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogApplicationAccessPointCreation", this.address, callback); }
        LogApplicationCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogApplicationCreation", this.address, callback); }
        LogUpgradeOwnerChanged(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogUpgradeOwnerChanged", this.address, callback); }
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
        acceptDatabase(_db: string) {
            const data = Encode(this.client).acceptDatabase(_db);
            return Call<Tx, {
                accepted: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).acceptDatabase();
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
        getUpgradeOwner() {
            const data = Encode(this.client).getUpgradeOwner();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getUpgradeOwner();
            });
        }
        migrateFrom() {
            const data = Encode(this.client).migrateFrom();
            return Call<Tx, {
                success: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).migrateFrom();
            });
        }
        migrateTo(_successor: string) {
            const data = Encode(this.client).migrateTo(_successor);
            return Call<Tx, {
                success: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).migrateTo();
            });
        }
        supportsInterface(_interfaceId: Buffer) {
            const data = Encode(this.client).supportsInterface(_interfaceId);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).supportsInterface();
            });
        }
        transferUpgradeOwnership(_newOwner: string) {
            const data = Encode(this.client).transferUpgradeOwnership(_newOwner);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).transferUpgradeOwnership();
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
        acceptDatabase: (_db: string) => { return client.encode("F4ACE0D0", ["address"], _db); },
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
        getUpgradeOwner: () => { return client.encode("E7284879", []); },
        migrateFrom: () => { return client.encode("35657E68", []); },
        migrateTo: (_successor: string) => { return client.encode("4DDAF8F2", ["address"], _successor); },
        supportsInterface: (_interfaceId: Buffer) => { return client.encode("01FFC9A7", ["bytes4"], _interfaceId); },
        transferUpgradeOwnership: (_newOwner: string) => { return client.encode("AC83EC7C", ["address"], _newOwner); },
        upgrade: (_successor: string) => { return client.encode("0900F010", ["address"], _successor); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        DEFAULT_COMPLETION_FUNCTION: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_Upgradeable: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        EVENT_ID_APPLICATIONS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_APPLICATION_ACCESS_POINTS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        acceptDatabase: (): {
            accepted: boolean;
        } => {
            const [accepted] = client.decode(data, ["bool"]);
            return { accepted: accepted };
        },
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
        getUpgradeOwner: (): [string] => { return client.decode(data, ["address"]); },
        migrateFrom: (): {
            success: boolean;
        } => {
            const [success] = client.decode(data, ["bool"]);
            return { success: success };
        },
        migrateTo: (): {
            success: boolean;
        } => {
            const [success] = client.decode(data, ["bool"]);
            return { success: success };
        },
        supportsInterface: (): [boolean] => { return client.decode(data, ["bool"]); },
        transferUpgradeOwnership: (): void => { return; },
        upgrade: (): {
            success: boolean;
        } => {
            const [success] = client.decode(data, ["bool"]);
            return { success: success };
        }
    }; };
}