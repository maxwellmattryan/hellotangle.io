import { createHash } from 'crypto';

import { Id } from '@api/core/types/id.types';

type Digest = 'base64' | 'hex';
const digest: Digest = 'base64';
type HashAlgorithm = 'sha256' | 'sha512' | 'md5' | 'RSA-SHA256';
const hashAlgorithm: HashAlgorithm = 'sha512';

/**
 * Creates a correctly-formatted ID to use for entities.
 * @param identifiers The unique values to use in creating the ID.
 * @param length The number of characters to use in the ID.
 * @returns A unique ID value to append to entities.
 */
export const createId = (identifiers: string[], length: number = 64): Id => {
    return createStringHashId(identifiers.join(' '), length);
};

/**
 * Creates a hashed ID string.
 * @param identifier The unique identifier string.
 * @param length The number of characters to use in the ID.
 * @returns A unique hashed ID string.
 * @internal
 */
function createStringHashId(identifier: string, length: number = 64): Id {
    const now: string = new Date().toString();

    return <Id>createHash(hashAlgorithm)
        .update(identifier + now + generateRandomInt(1_000_000))
        .digest(digest)
        .toString()
        .replace(/[^A-Z0-9]/g, generateRandomChar)
        .slice(0, length);
}

/**
 * Generates a random alphanumeric character (only A-Z and 0-9).
 * @returns Single-character alphanumeric string.
 */
function generateRandomChar(): string {
    const randChars: string[] = [
        String.fromCharCode(generateRandomInt(26) + 65),    // A-Z
        String.fromCharCode(generateRandomInt(10) + 48)     // 0-9
    ];

    return randChars[generateRandomInt(randChars.length)];
}

/**
 * Generates a random integer.
 * @param n The upper bound to use for RNG.
 * @returns A randomly-generated number lesser or equal to `n`.
 */
function generateRandomInt(n: number): number {
    return Math.floor(Math.random() * Math.floor(n));
}
