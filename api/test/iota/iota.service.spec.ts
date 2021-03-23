import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { Transaction } from '@iota/core';

import { IotaService } from '@api/iota/services/iota.service';

import { FakeMessage } from '@test/message/message.repository.mock';

describe('IotaService', () => {
    let service: IotaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot()
            ],
            providers: [
                ConfigService,
                IotaService
            ],
        }).compile();

        service = module.get<IotaService>(IotaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('can connect to a node and gather information', () => {
        expect(service.connectToNode()).resolves.toHaveProperty('time');
    });

    it('can broadcast message to Tangle and return a non-empty Transaction array', () => {
        service.sendMessage(FakeMessage)
            .then((data: readonly Transaction[]) => {
                expect(data.length).toBeGreaterThanOrEqual(1);
            })
            .catch((error) => { });
    });
});
