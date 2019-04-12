import { TilretteleggingDTO } from '../../types/TilretteleggingDTO';
import { mapTilretteleggingerTilDTO } from '../søknadUtils';
import SøknadUtilsMock from '../../mock/søknadUtils.mock';

const mock = SøknadUtilsMock;

describe('søknadUtils', () => {
    it('lager en tilrettelegging for hel, delvis og ingen', () => {
        const dto: TilretteleggingDTO[] = mapTilretteleggingerTilDTO(mock.tilrettelegginger);
        expect(dto.length).toBe(9);
    });
    it('lager en tilrettelegging for hel, delvis og ingen', () => {
        const frilansDto: TilretteleggingDTO[] = mapTilretteleggingerTilDTO([mock.frilansTilrettelegging]);
        expect(frilansDto.length).toBe(3);
    });
});
