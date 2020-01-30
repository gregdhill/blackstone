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
export module Organization {
    export class Contract<Tx> {
        private client: Provider<Tx>;
        public address: string;
        constructor(client: Provider<Tx>, address: string) {
            this.client = client;
            this.address = address;
        }
        LogDepartmentUserRemoval(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDepartmentUserRemoval", this.address, callback); }
        LogDepartmentUserUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogDepartmentUserUpdate", this.address, callback); }
        LogOrganizationApproverRemoval(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogOrganizationApproverRemoval", this.address, callback); }
        LogOrganizationApproverUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogOrganizationApproverUpdate", this.address, callback); }
        LogOrganizationCreation(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogOrganizationCreation", this.address, callback); }
        LogOrganizationDepartmentRemoval(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogOrganizationDepartmentRemoval", this.address, callback); }
        LogOrganizationDepartmentUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogOrganizationDepartmentUpdate", this.address, callback); }
        LogOrganizationUserRemoval(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogOrganizationUserRemoval", this.address, callback); }
        LogOrganizationUserUpdate(callback: (err: Error, event: any) => void): Readable { return this.client.listen("LogOrganizationUserUpdate", this.address, callback); }
        ERC165_ID_Organization() {
            const data = Encode(this.client).ERC165_ID_Organization();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ERC165_ID_Organization();
            });
        }
        ERC165_ID_VERSIONED_ARTIFACT() {
            const data = Encode(this.client).ERC165_ID_VERSIONED_ARTIFACT();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).ERC165_ID_VERSIONED_ARTIFACT();
            });
        }
        EVENT_ID_DEPARTMENT_USERS() {
            const data = Encode(this.client).EVENT_ID_DEPARTMENT_USERS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_DEPARTMENT_USERS();
            });
        }
        EVENT_ID_ORGANIZATION_ACCOUNTS() {
            const data = Encode(this.client).EVENT_ID_ORGANIZATION_ACCOUNTS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ORGANIZATION_ACCOUNTS();
            });
        }
        EVENT_ID_ORGANIZATION_APPROVERS() {
            const data = Encode(this.client).EVENT_ID_ORGANIZATION_APPROVERS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ORGANIZATION_APPROVERS();
            });
        }
        EVENT_ID_ORGANIZATION_DEPARTMENTS() {
            const data = Encode(this.client).EVENT_ID_ORGANIZATION_DEPARTMENTS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ORGANIZATION_DEPARTMENTS();
            });
        }
        EVENT_ID_ORGANIZATION_USERS() {
            const data = Encode(this.client).EVENT_ID_ORGANIZATION_USERS();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).EVENT_ID_ORGANIZATION_USERS();
            });
        }
        addApprover(_userAccount: string) {
            const data = Encode(this.client).addApprover(_userAccount);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addApprover();
            });
        }
        addDepartment(_id: Buffer) {
            const data = Encode(this.client).addDepartment(_id);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addDepartment();
            });
        }
        addUser(_userAccount: string) {
            const data = Encode(this.client).addUser(_userAccount);
            return Call<Tx, {
                successful: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addUser();
            });
        }
        addUserToDepartment(_userAccount: string, _department: Buffer) {
            const data = Encode(this.client).addUserToDepartment(_userAccount, _department);
            return Call<Tx, {
                successful: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).addUserToDepartment();
            });
        }
        authorizeUser(_userAccount: string, _department: Buffer) {
            const data = Encode(this.client).authorizeUser(_userAccount, _department);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).authorizeUser();
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
        departmentExists(_id: Buffer) {
            const data = Encode(this.client).departmentExists(_id);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).departmentExists();
            });
        }
        getApproverAtIndex(_pos: number) {
            const data = Encode(this.client).getApproverAtIndex(_pos);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getApproverAtIndex();
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
        getDefaultDepartmentId() {
            const data = Encode(this.client).getDefaultDepartmentId();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDefaultDepartmentId();
            });
        }
        getDepartmentAtIndex(_index: number) {
            const data = Encode(this.client).getDepartmentAtIndex(_index);
            return Call<Tx, {
                id: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDepartmentAtIndex();
            });
        }
        getDepartmentData(_id: Buffer) {
            const data = Encode(this.client).getDepartmentData(_id);
            return Call<Tx, {
                userCount: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDepartmentData();
            });
        }
        getDepartmentUserAtIndex(_depId: Buffer, _index: number) {
            const data = Encode(this.client).getDepartmentUserAtIndex(_depId, _index);
            return Call<Tx, {
                userAccount: string;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getDepartmentUserAtIndex();
            });
        }
        getNumberOfApprovers() {
            const data = Encode(this.client).getNumberOfApprovers();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfApprovers();
            });
        }
        getNumberOfDepartmentUsers(_depId: Buffer) {
            const data = Encode(this.client).getNumberOfDepartmentUsers(_depId);
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfDepartmentUsers();
            });
        }
        getNumberOfDepartments() {
            const data = Encode(this.client).getNumberOfDepartments();
            return Call<Tx, {
                size: number;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfDepartments();
            });
        }
        getNumberOfUsers() {
            const data = Encode(this.client).getNumberOfUsers();
            return Call<Tx, [number]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getNumberOfUsers();
            });
        }
        getOrganizationDetails() {
            const data = Encode(this.client).getOrganizationDetails();
            return Call<Tx, {
                numberOfApprovers: number;
                organizationKey: Buffer;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOrganizationDetails();
            });
        }
        getOrganizationKey() {
            const data = Encode(this.client).getOrganizationKey();
            return Call<Tx, [Buffer]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getOrganizationKey();
            });
        }
        getUserAtIndex(_pos: number) {
            const data = Encode(this.client).getUserAtIndex(_pos);
            return Call<Tx, [string]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).getUserAtIndex();
            });
        }
        initialize(_initialApprovers: string[], _defaultDepartmentId: Buffer) {
            const data = Encode(this.client).initialize(_initialApprovers, _defaultDepartmentId);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).initialize();
            });
        }
        removeApprover(_userAccount: string) {
            const data = Encode(this.client).removeApprover(_userAccount);
            return Call<Tx, void>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).removeApprover();
            });
        }
        removeDepartment(_depId: Buffer) {
            const data = Encode(this.client).removeDepartment(_depId);
            return Call<Tx, {
                successful: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).removeDepartment();
            });
        }
        removeUser(_userAccount: string) {
            const data = Encode(this.client).removeUser(_userAccount);
            return Call<Tx, {
                successful: boolean;
            }>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).removeUser();
            });
        }
        removeUserFromDepartment(_userAccount: string, _depId: Buffer) {
            const data = Encode(this.client).removeUserFromDepartment(_userAccount, _depId);
            return Call<Tx, [boolean]>(this.client, this.address, data, (exec: Uint8Array) => {
                return Decode(this.client, exec).removeUserFromDepartment();
            });
        }
    }
    export const Encode = <Tx>(client: Provider<Tx>) => { return {
        ERC165_ID_Organization: () => { return client.encode("3657DB17", []); },
        ERC165_ID_VERSIONED_ARTIFACT: () => { return client.encode("E10533C6", []); },
        EVENT_ID_DEPARTMENT_USERS: () => { return client.encode("4374FCF8", []); },
        EVENT_ID_ORGANIZATION_ACCOUNTS: () => { return client.encode("6E40C2ED", []); },
        EVENT_ID_ORGANIZATION_APPROVERS: () => { return client.encode("669E9E23", []); },
        EVENT_ID_ORGANIZATION_DEPARTMENTS: () => { return client.encode("3E21A8D9", []); },
        EVENT_ID_ORGANIZATION_USERS: () => { return client.encode("94D42FC2", []); },
        addApprover: (_userAccount: string) => { return client.encode("B646C194", ["address"], _userAccount); },
        addDepartment: (_id: Buffer) => { return client.encode("B2E30DDF", ["bytes32"], _id); },
        addUser: (_userAccount: string) => { return client.encode("421B2D8B", ["address"], _userAccount); },
        addUserToDepartment: (_userAccount: string, _department: Buffer) => { return client.encode("B68B5F6C", ["address", "bytes32"], _userAccount, _department); },
        authorizeUser: (_userAccount: string, _department: Buffer) => { return client.encode("DDC5DD51", ["address", "bytes32"], _userAccount, _department); },
        compareArtifactVersion: (_other: string, _version: [number, number, number]) => {
            if (typeof _other === "string")
                return client.encode("5C030138", ["address"], _other);
            if (typeof _version === "string")
                return client.encode("78BC0B0D", ["uint8[3]"], _version);
        },
        departmentExists: (_id: Buffer) => { return client.encode("20FEABBA", ["bytes32"], _id); },
        getApproverAtIndex: (_pos: number) => { return client.encode("EA415CFD", ["uint256"], _pos); },
        getArtifactVersion: () => { return client.encode("756B2E6C", []); },
        getArtifactVersionMajor: () => { return client.encode("57E0EBCA", []); },
        getArtifactVersionMinor: () => { return client.encode("7589ADB7", []); },
        getArtifactVersionPatch: () => { return client.encode("F085F6DD", []); },
        getDefaultDepartmentId: () => { return client.encode("6FA02737", []); },
        getDepartmentAtIndex: (_index: number) => { return client.encode("AAA8282B", ["uint256"], _index); },
        getDepartmentData: (_id: Buffer) => { return client.encode("F06E141E", ["bytes32"], _id); },
        getDepartmentUserAtIndex: (_depId: Buffer, _index: number) => { return client.encode("81B05199", ["bytes32", "uint256"], _depId, _index); },
        getNumberOfApprovers: () => { return client.encode("35E07244", []); },
        getNumberOfDepartmentUsers: (_depId: Buffer) => { return client.encode("6371E7B4", ["bytes32"], _depId); },
        getNumberOfDepartments: () => { return client.encode("E94E9888", []); },
        getNumberOfUsers: () => { return client.encode("4D009288", []); },
        getOrganizationDetails: () => { return client.encode("89C9E2EF", []); },
        getOrganizationKey: () => { return client.encode("ABD67A7E", []); },
        getUserAtIndex: (_pos: number) => { return client.encode("FFCC7BBF", ["uint256"], _pos); },
        initialize: (_initialApprovers: string[], _defaultDepartmentId: Buffer) => { return client.encode("D44A9341", ["address[]", "bytes32"], _initialApprovers, _defaultDepartmentId); },
        removeApprover: (_userAccount: string) => { return client.encode("6CF4C88F", ["address"], _userAccount); },
        removeDepartment: (_depId: Buffer) => { return client.encode("FBE620A7", ["bytes32"], _depId); },
        removeUser: (_userAccount: string) => { return client.encode("98575188", ["address"], _userAccount); },
        removeUserFromDepartment: (_userAccount: string, _depId: Buffer) => { return client.encode("7E047585", ["address", "bytes32"], _userAccount, _depId); }
    }; };
    export const Decode = <Tx>(client: Provider<Tx>, data: Uint8Array) => { return {
        ERC165_ID_Organization: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        ERC165_ID_VERSIONED_ARTIFACT: (): [Buffer] => { return client.decode(data, ["bytes4"]); },
        EVENT_ID_DEPARTMENT_USERS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ORGANIZATION_ACCOUNTS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ORGANIZATION_APPROVERS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ORGANIZATION_DEPARTMENTS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        EVENT_ID_ORGANIZATION_USERS: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        addApprover: (): void => { return; },
        addDepartment: (): [boolean] => { return client.decode(data, ["bool"]); },
        addUser: (): {
            successful: boolean;
        } => {
            const [successful] = client.decode(data, ["bool"]);
            return { successful: successful };
        },
        addUserToDepartment: (): {
            successful: boolean;
        } => {
            const [successful] = client.decode(data, ["bool"]);
            return { successful: successful };
        },
        authorizeUser: (): [boolean] => { return client.decode(data, ["bool"]); },
        compareArtifactVersion: (): {
            result: number;
        } => {
            const [result] = client.decode(data, ["int256"]);
            return { result: result };
        },
        departmentExists: (): [boolean] => { return client.decode(data, ["bool"]); },
        getApproverAtIndex: (): [string] => { return client.decode(data, ["address"]); },
        getArtifactVersion: (): [[number, number, number]] => { return client.decode(data, ["uint8[3]"]); },
        getArtifactVersionMajor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionMinor: (): [number] => { return client.decode(data, ["uint8"]); },
        getArtifactVersionPatch: (): [number] => { return client.decode(data, ["uint8"]); },
        getDefaultDepartmentId: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
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
            userAccount: string;
        } => {
            const [userAccount] = client.decode(data, ["address"]);
            return { userAccount: userAccount };
        },
        getNumberOfApprovers: (): [number] => { return client.decode(data, ["uint256"]); },
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
        getNumberOfUsers: (): [number] => { return client.decode(data, ["uint256"]); },
        getOrganizationDetails: (): {
            numberOfApprovers: number;
            organizationKey: Buffer;
        } => {
            const [numberOfApprovers, organizationKey] = client.decode(data, ["uint256", "bytes32"]);
            return { numberOfApprovers: numberOfApprovers, organizationKey: organizationKey };
        },
        getOrganizationKey: (): [Buffer] => { return client.decode(data, ["bytes32"]); },
        getUserAtIndex: (): [string] => { return client.decode(data, ["address"]); },
        initialize: (): void => { return; },
        removeApprover: (): void => { return; },
        removeDepartment: (): {
            successful: boolean;
        } => {
            const [successful] = client.decode(data, ["bool"]);
            return { successful: successful };
        },
        removeUser: (): {
            successful: boolean;
        } => {
            const [successful] = client.decode(data, ["bool"]);
            return { successful: successful };
        },
        removeUserFromDepartment: (): [boolean] => { return client.decode(data, ["bool"]); }
    }; };
}