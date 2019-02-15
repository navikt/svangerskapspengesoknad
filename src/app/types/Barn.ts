abstract class BarnBase {
    antallBarn?: number | undefined;
    erBarnetFødt?: boolean;
}

export interface FødtBarn extends BarnBase {
    fødselsdatoer: string[];
}

export interface UfødtBarn extends BarnBase {
    termindato: Date;
}

type Barn = FødtBarn | UfødtBarn;

export default Barn;
