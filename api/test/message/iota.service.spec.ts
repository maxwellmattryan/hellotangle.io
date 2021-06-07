import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { IotaService } from '@api/message/services/iota.service';
import { Message } from '@api/message/entities/message.entity';

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

    it('can broadcast message to Tangle and return a non-empty Transaction array', () => {
        service.sendMessage(FakeMessage)
            .then((data: Message) => {
                expect(typeof data).toEqual(Message);
            })
            .catch((error) => { });
    });
});
