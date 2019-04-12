import {
    TilretteleggingDTO,
    ArbeidsforholdFrilansDTO,
    ArbeidsforholdSelvstendigDTO,
    ArbeidsforholdVirksomhetDTO
} from '../../types/TilretteleggingDTO';
import { mapTilretteleggingerTilDTO } from '../søknadUtils';
import SøknadUtilsMock from '../../mock/søknadUtils.mock';
import { Arbeidsforholdstype } from '../../types/Tilrettelegging';

const mock = SøknadUtilsMock;

describe('søknadUtils', () => {
    it('deler flere tilrettelegginger for et arbeidsforhold opp i egne tilrettelegginger', () => {
        const dto: TilretteleggingDTO[] = mapTilretteleggingerTilDTO(mock.tilrettelegginger, '123');
        expect(dto.length).toBe(9);
    });
    it('fjerner evt. id fra dto', () => {
        const dto: any[] = mapTilretteleggingerTilDTO(mock.tilrettelegginger, '123');
        expect(dto.some((d) => d.id !== undefined)).toBeFalsy();
    });
    it('har alle nødvendige props', () => {
        const dto: TilretteleggingDTO[] = mapTilretteleggingerTilDTO(mock.tilrettelegginger, '123');
        expect(dto.some((d) => d.type === undefined)).toBeFalsy();
        expect(dto.some((d) => d.arbeidsforhold === undefined)).toBeFalsy();
        expect(dto.some((d) => d.behovForTilretteleggingFom === undefined)).toBeFalsy();
        expect(dto.some((d) => d.arbeidsforhold === undefined)).toBeFalsy();
    });
    it('har identisk arbeidsforhold for hver tilrettelegginstype', () => {
        const dto: TilretteleggingDTO[] = mapTilretteleggingerTilDTO([mock.virksomhetTilrettelegging], '123');
        const del1: string = JSON.stringify(dto[0].arbeidsforhold);
        const del2: string = JSON.stringify(dto[1].arbeidsforhold);
        const del3: string = JSON.stringify(dto[2].arbeidsforhold);
        expect(del1).toEqual(del2);
        expect(del2).toEqual(del3);
    });
    describe('mapper arbeidsforhold korrekt', () => {
        const dtoVirksomhet: TilretteleggingDTO[] = mapTilretteleggingerTilDTO([mock.virksomhetTilrettelegging], '123');
        const dtoFrilans: TilretteleggingDTO[] = mapTilretteleggingerTilDTO([mock.frilansTilrettelegging], '123');
        const dtoSelvstendig: TilretteleggingDTO[] = mapTilretteleggingerTilDTO(
            [mock.selvstendigTilrettelegging],
            '123'
        );

        it('for virksomhet', () => {
            const arbeidsforhold: ArbeidsforholdVirksomhetDTO = dtoVirksomhet[0]
                .arbeidsforhold as ArbeidsforholdVirksomhetDTO;
            expect(arbeidsforhold).toBeDefined();
            expect(arbeidsforhold.type).toBe(Arbeidsforholdstype.VIRKSOMHET);
            expect(arbeidsforhold.orgnr).toBeDefined();
        });

        it('for frilans', () => {
            const arbeidsforhold: ArbeidsforholdFrilansDTO = dtoFrilans[0].arbeidsforhold as ArbeidsforholdFrilansDTO;
            expect(arbeidsforhold).toBeDefined();
            expect(arbeidsforhold.type).toBe(Arbeidsforholdstype.FRILANSER);
            expect(arbeidsforhold.risikoFaktorer).toBeDefined();
            expect(arbeidsforhold.tilretteleggingstiltak).toBeDefined();
        });

        it('for selvstendig', () => {
            const arbeidsforhold: ArbeidsforholdSelvstendigDTO = dtoSelvstendig[0]
                .arbeidsforhold as ArbeidsforholdSelvstendigDTO;
            expect(arbeidsforhold).toBeDefined();
            expect(arbeidsforhold.type).toBe(Arbeidsforholdstype.SELVSTENDIG);
            expect(arbeidsforhold.fnr).toBeDefined();
            expect(arbeidsforhold.risikoFaktorer).toBeDefined();
            expect(arbeidsforhold.tilretteleggingstiltak).toBeDefined();
        });
    });
});
