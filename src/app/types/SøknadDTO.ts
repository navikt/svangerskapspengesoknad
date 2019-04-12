import { Søknadstype } from './Søknad';
import InformasjonOmUtenlandsopphold from './InformasjonOmUtenlandsopphold';
import Barn from './Barn';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { TilretteleggingDTO } from './TilretteleggingDTO';
import { Søker } from './Søker';

interface SøknadDTO {
    type: Søknadstype;
    erEndringssøknad: boolean;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: Barn;
    vedlegg?: Attachment[];
    tilrettelegging: TilretteleggingDTO[];
    søker: Søker;
}
export default SøknadDTO;
