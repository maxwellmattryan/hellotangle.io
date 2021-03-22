import { Injectable } from '@nestjs/common';

import { createHash } from 'crypto';

export type Digest = 'base64' | 'hex';
export type HashAlgorithm = 'sha256' | 'sha512' | 'md5' | 'RSA-SHA256';

import { Id } from '@api/core/types/id.type';

@Injectable()
export class EntityService<T> {
    private digest: Digest = 'base64';
    private hashAlgorithm: HashAlgorithm = 'sha512';

    public createId(identifiers: string[], length: number = 64): Id {
        return this.createStringHashId(identifiers.join(' '), length);
    }

    private createStringHashId(identifier: string, length: number = 64): Id {
        const now: string = new Date().toString();

        return <Id>createHash(this.hashAlgorithm)
            .update(identifier + now + this.getRandomInt(1_000_000))
            .digest(this.digest)
            .toString()
            .replace(/[^A-Z0-9]/g, this.generateRandomIdChar)
            .slice(0, length);
    }

    private generateRandomIdChar = (): string => {
        const randChars: string[] = [
            String.fromCharCode(this.getRandomInt(26) + 65),    // A-Z
            String.fromCharCode(this.getRandomInt(10) + 48)     // 0-9
        ];

        return randChars[this.getRandomInt(randChars.length)];
    }

    private getRandomInt(n: number): number {
        return Math.floor(Math.random() * Math.floor(n));
    }
}
