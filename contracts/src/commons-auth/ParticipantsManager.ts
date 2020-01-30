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
export module ParticipantsManager {
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
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
        OBJECT_CLASS_ORGANIZATION() {
            const data = Encode(this.client).OBJECT_CLASS_ORGANIZATION();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).OBJECT_CLASS_ORGANIZATION();
            });
        }
        OBJECT_CLASS_USER_ACCOUNT() {
            const data = Encode(this.client).OBJECT_CLASS_USER_ACCOUNT();
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).OBJECT_CLASS_USER_ACCOUNT();
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
        createOrganization(_initialApprovers: string[], _defaultDepartmentId: Buffer) {
            const data = Encode(this.client).createOrganization(_initialApprovers, _defaultDepartmentId);
            return Call<Tx, [number, string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createOrganization();
            });
        }
        createUserAccount(_id: Buffer, _owner: string, _ecosystem: string) {
            const data = Encode(this.client).createUserAccount(_id, _owner, _ecosystem);
            return Call<Tx, {
                userAccount: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).createUserAccount();
            });
        }
        departmentExists(_organization: string, _departmentId: Buffer) {
            const data = Encode(this.client).departmentExists(_organization, _departmentId);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).departmentExists();
            });
        }
        getApproverAtIndex(_organization: string, _pos: number) {
            const data = Encode(this.client).getApproverAtIndex(_organization, _pos);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getApproverAtIndex();
            });
        }
        getApproverData(_organization: string, _approver: string) {
            const data = Encode(this.client).getApproverData(_organization, _approver);
            return Call<Tx, {
                approverAddress: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getApproverData();
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
        getDepartmentAtIndex(_organization: string, _index: number) {
            const data = Encode(this.client).getDepartmentAtIndex(_organization, _index);
            return Call<Tx, {
                id: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDepartmentAtIndex();
            });
        }
        getDepartmentData(_organization: string, _id: Buffer) {
            const data = Encode(this.client).getDepartmentData(_organization, _id);
            return Call<Tx, {
                userCount: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDepartmentData();
            });
        }
        getDepartmentUserAtIndex(_organization: string, _depId: Buffer, _index: number) {
            const data = Encode(this.client).getDepartmentUserAtIndex(_organization, _depId, _index);
            return Call<Tx, {
                departmentMember: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDepartmentUserAtIndex();
            });
        }
        getNumberOfApprovers(_organization: string) {
            const data = Encode(this.client).getNumberOfApprovers(_organization);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfApprovers();
            });
        }
        getNumberOfDepartmentUsers(_organization: string, _depId: Buffer) {
            const data = Encode(this.client).getNumberOfDepartmentUsers(_organization, _depId);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfDepartmentUsers();
            });
        }
        getNumberOfDepartments(_organization: string) {
            const data = Encode(this.client).getNumberOfDepartments(_organization);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfDepartments();
            });
        }
        getNumberOfOrganizations() {
            const data = Encode(this.client).getNumberOfOrganizations();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfOrganizations();
            });
        }
        getNumberOfUsers(_organization: string) {
            const data = Encode(this.client).getNumberOfUsers(_organization);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfUsers();
            });
        }
        getOrganizationAtIndex(_pos: number) {
            const data = Encode(this.client).getOrganizationAtIndex(_pos);
            return Call<Tx, {
                organization: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOrganizationAtIndex();
            });
        }
        getOrganizationData(_organization: string) {
            const data = Encode(this.client).getOrganizationData(_organization);
            return Call<Tx, {
                numApprovers: number;
                organizationKey: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOrganizationData();
            });
        }
        getUserAccountsSize() {
            const data = Encode(this.client).getUserAccountsSize();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getUserAccountsSize();
            });
        }
        getUserAtIndex(_organization: string, _pos: number) {
            const data = Encode(this.client).getUserAtIndex(_organization, _pos);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getUserAtIndex();
            });
        }
        getUserData(_organization: string, _user: string) {
            const data = Encode(this.client).getUserData(_organization, _user);
            return Call<Tx, {
                userAddress: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getUserData();
            });
        }
        organizationExists(_address: string) {
            const data = Encode(this.client).organizationExists(_address);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).organizationExists();
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
        userAccountExists(_userAccount: string) {
            const data = Encode(this.client).userAccountExists(_userAccount);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).userAccountExists();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        ERC165_ID_ObjectFactory: () => { return client.encode("54AF67B7", []); },
        ERC165_ID_Upgradeable: () => { return client.encode("B21C815F", []); },
        ERC165_ID_VERSIONED_ARTIFACT: () => { return client.encode("E10533C6", []); },
        OBJECT_CLASS_ORGANIZATION: () => { return client.encode("BF90B027", []); },
        OBJECT_CLASS_USER_ACCOUNT: () => { return client.encode("9B3EF402", []); },
        compareArtifactVersion: (_other: string, _version: [number, number, number]) => {
            if (typeof _other === "string")
                return client.encode("5C030138", ["address"], _other);
            if (typeof _version === "string")
                return client.encode("78BC0B0D", ["uint8[3]"], _version);
        },
        createOrganization: (_initialApprovers: string[], _defaultDepartmentId: Buffer) => { return client.encode("39CB0623", ["address[]", "bytes32"], _initialApprovers, _defaultDepartmentId); },
        createUserAccount: (_id: Buffer, _owner: string, _ecosystem: string) => { return client.encode("C392DF6B", ["bytes32", "address", "address"], _id, _owner, _ecosystem); },
        departmentExists: (_organization: string, _departmentId: Buffer) => { return client.encode("AB8EC038", ["address", "bytes32"], _organization, _departmentId); },
        getApproverAtIndex: (_organization: string, _pos: number) => { return client.encode("3DAF56B8", ["address", "uint256"], _organization, _pos); },
        getApproverData: (_organization: string, _approver: string) => { return client.encode("EC89DA8B", ["address", "address"], _organization, _approver); },
        getArtifactVersion: () => { return client.encode("756B2E6C", []); },
        getArtifactVersionMajor: () => { return client.encode("57E0EBCA", []); },
        getArtifactVersionMinor: () => { return client.encode("7589ADB7", []); },
        getArtifactVersionPatch: () => { return client.encode("F085F6DD", []); },
        getDepartmentAtIndex: (_organization: string, _index: number) => { return client.encode("EC9C6220", ["address", "uint256"], _organization, _index); },
        getDepartmentData: (_organization: string, _id: Buffer) => { return client.encode("6CFB6C6B", ["address", "bytes32"], _organization, _id); },
        getDepartmentUserAtIndex: (_organization: string, _depId: Buffer, _index: number) => { return client.encode("87DE70A7", ["address", "bytes32", "uint256"], _organization, _depId, _index); },
        getNumberOfApprovers: (_organization: string) => { return client.encode("CC5BAF17", ["address"], _organization); },
        getNumberOfDepartmentUsers: (_organization: string, _depId: Buffer) => { return client.encode("1065FFB9", ["address", "bytes32"], _organization, _depId); },
        getNumberOfDepartments: (_organization: string) => { return client.encode("AD76666D", ["address"], _organization); },
        getNumberOfOrganizations: () => { return client.encode("BD3A694E", []); },
        getNumberOfUsers: (_organization: string) => { return client.encode("851D585E", ["address"], _organization); },
        getOrganizationAtIndex: (_pos: number) => { return client.encode("031E8EAF", ["uint256"], _pos); },
        getOrganizationData: (_organization: string) => { return client.encode("69AD9617", ["address"], _organization); },
        getUserAccountsSize: () => { return client.encode("17BD60EF", []); },
        getUserAtIndex: (_organization: string, _pos: number) => { return client.encode("FDBB918F", ["address", "uint256"], _organization, _pos); },
        getUserData: (_organization: string, _user: string) => { return client.encode("F4EEEFE9", ["address", "address"], _organization, _user); },
        organizationExists: (_address: string) => { return client.encode("E7ABD5EA", ["address"], _address); },
        upgrade: (_successor: string) => { return client.encode("0900F010", ["address"], _successor); },
        userAccountExists: (_userAccount: string) => { return client.encode("02F53264", ["address"], _userAccount); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        ERC165_ID_ObjectFactory: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_Upgradeable: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        OBJECT_CLASS_ORGANIZATION: (): [string] => { return client.decode(data, ["string"]); },
        OBJECT_CLASS_USER_ACCOUNT: (): [string] => { return client.decode(data, ["string"]); },
        compareArtifactVersion: (): {
            result: number;
        } => {
            const [result] = client.decode(data, ["int256"]);
            return { result: result };
        },
        createOrganization: (): [number, string] => { return client.decode(data, ["uint256", "address"]); },
        createUserAccount: (): {
            userAccount: string;
        } => {
            const [userAccount] = client.decode(data, ["address"]);
            return { userAccount: userAccount };
        },
        departmentExists: (): [boolean] => { return client.decode(data, ["bool"]); },
        getApproverAtIndex: (): [string] => { return client.decode(data, ["address"]); },
        getApproverData: (): {
            approverAddress: string;
        } => {
            const [approverAddress] = client.decode(data, ["address"]);
            return { approverAddress: approverAddress };
        },
        getArtifactVersion: (): [[number, number, number]] => { return client.decode(data, ["uint8[3]"]); },
        getArtifactVersionMajor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionMinor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionPatch: (): [number] => { return client.decode(data, ["uint8"]); },
        getDepartmentAtIndex: (): {
            id: Buffer;
        } => {
            const [id] = client.decode(data, ["bytes32"]);
            return { id: id };
        },
        getDepartmentData: (): {
            userCount: number;
        } => {
            const [userCount] = client.decode(data, ["uint256"]);
            return { userCount: userCount };
        },
        getDepartmentUserAtIndex: (): {
            departmentMember: string;
        } => {
            const [departmentMember] = client.decode(data, ["address"]);
            return { departmentMember: departmentMember };
        },
        getNumberOfApprovers: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfDepartmentUsers: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfDepartments: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfOrganizations: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getNumberOfUsers: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getOrganizationAtIndex: (): {
            organization: string;
        } => {
            const [organization] = client.decode(data, ["address"]);
            return { organization: organization };
        },
        getOrganizationData: (): {
            numApprovers: number;
            organizationKey: Buffer;
        } => {
            const [numApprovers, organizationKey] = client.decode(data, ["uint256", "bytes32"]);
            return { numApprovers: numApprovers, organizationKey: organizationKey };
        },
        getUserAccountsSize: (): {
            size: number;
        } => {
            const [size] = client.decode(data, ["uint256"]);
            return { size: size };
        },
        getUserAtIndex: (): [string] => { return client.decode(data, ["address"]); },
        getUserData: (): {
            userAddress: string;
        } => {
            const [userAddress] = client.decode(data, ["address"]);
            return { userAddress: userAddress };
        },
        organizationExists: (): [boolean] => { return client.decode(data, ["bool"]); },
        upgrade: (): {
            success: boolean;
        } => {
            const [success] = client.decode(data, ["bool"]);
            return { success: success };
        },
        userAccountExists: (): [boolean] => { return client.decode(data, ["bool"]); }
    }; };
}