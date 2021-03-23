import { createHash } from 'crypto';

import { Id } from '@api/shared/types/id.types';

export type Digest = 'base64' | 'hex';
const digest: Digest = 'base64';
export type HashAlgorithm = 'sha256' | 'sha512' | 'md5' | 'RSA-SHA256';
const hashAlgorithm: HashAlgorithm = 'sha512';

export const createId = (identifiers: string[], length: number = 64): Id => {
    return createStringHashId(identifiers.join(' '), length);
}

function createStringHashId(identifier: string, length: number = 64): Id {
    const now: string = new Date().toString();

    return <Id>createHash(hashAlgorithm)
        .update(identifier + now + getRandomInt(1_000_000))
        .digest(digest)
        .toString()
        .replace(/[^A-Z0-9]/g, generateRandomIdChar)
        .slice(0, length);
}

function generateRandomIdChar(): string {
    const randChars: string[] = [
        String.fromCharCode(getRandomInt(26) + 65),    // A-Z
        String.fromCharCode(getRandomInt(10) + 48)     // 0-9
    ];

    return randChars[getRandomInt(randChars.length)];
}

function getRandomInt(n: number): number {
    return Math.floor(Math.random() * Math.floor(n));
}
