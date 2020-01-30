import { UserAccount } from "../commons-auth/UserAccount";
import { Client } from "./client";
import * as grpc from 'grpc';

export function HexFromString(str: string) {
    return Buffer.from(str, 'utf8');
} 

export function HexToString(hex: Buffer) {
    return Buffer.from(hex).toString('utf8');
}

/**
 * Returns a promise to call the forwardCall function of the given userAddress to invoke the function encoded in the given payload on the provided target address and return the result bytes representation
 * The 'payload' parameter must be the output of calling the 'encode(...)' function on a contract's function. E.g. <contract>.<function>.encode(param1, param2)
 * 'shouldWaitForVent' is a boolean parameter which indicates whether this.callOnBehalfOf should to wait for vent db to catch up to the block height in the forwardCall response, before resolving the promise.
 */
export async function CallOnBehalfOf(client: Client, userAddress: string, targetAddress: string, payload: string): Promise<Buffer> {
    const actingUser = new UserAccount.Contract(client, userAddress)
    return actingUser.forwardCall(targetAddress, Buffer.from(payload))
        .then(data => data[0])
}

export async function GetFromNameRegistry(client: Client, name: string) {
    return new Promise<string | undefined>((resolve, reject) => {
        client.namereg.get(name, (err, exec) => {
            err ? err.code === grpc.status.NOT_FOUND ? resolve(undefined) : reject(err) 
                : resolve(exec.getData());
        });
    });
}

export async function SetToNameRegistry(client: Client, name: string, value: string) {
    return new Promise<void>((resolve, reject) => {
        client.namereg.set(name, value, 5000, 2000, (err, _) => 
            err ? reject(err) : resolve());
    });
}