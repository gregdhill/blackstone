pragma solidity ^0.4.23;

/**
 * @dev Defines the storage layout for owned contracts.
 */
contract StorageDefOwner {

    address internal owner;

    /**
     * @dev Internal constructor to enforce abstract contract.
     */
    constructor() internal {}
}