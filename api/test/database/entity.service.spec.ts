import { Test, TestingModule } from '@nestjs/testing';

import { EntityService } from '@api/core/database/entity.service';
import { Id } from '@api/core/types/id.type';

describe('EntityService', () => {
    let service: EntityService<unknown>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EntityService]
        }).compile();

        service = module.get<EntityService<unknown>>(EntityService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createId', () => {
        it('should create a unique hashed identifier within the correct format', () => {
            const id: Id = service.createId(['my', 'unique', 'identifier(s)']);
            const idStr = String(id);

            expect(idStr.length).toEqual(64);
            expect(idStr).toMatch(/[A-Z0-9]{64}/);
        });
    });
});
