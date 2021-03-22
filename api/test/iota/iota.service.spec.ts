import { Test, TestingModule } from '@nestjs/testing';
import { IotaService } from '@api/core/iota/iota.service';

describe('IotaService', () => {
    let service: IotaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [IotaService],
        }).compile();

        service = module.get<IotaService>(IotaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
