import { Id } from '@api/core/types/id.type';
import { createId } from '@api/core/utils/id.util';

describe('BaseRepository', () => {
    it('can create a unique hashed identifier within the correct format', () => {
        const id: Id = createId(['my', 'unique', 'identifier(s)']);
        const idStr = String(id);

        expect(idStr.length).toEqual(64);
        expect(idStr).toMatch(/[A-Z0-9]{64}/);
    });
});
