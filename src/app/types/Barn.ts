interface Barn {
    erBarnetFødt: boolean;
    termindato: Date;
    fødselsdatoer?: Date[];
}

export interface UferdigBarn {
    termindato?: Date;
    erBarnetFødt?: boolean;
    fødselsdato?: Date;
}

export default Barn;
