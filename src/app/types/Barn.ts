interface Barn {
    erBarnetFødt: boolean;
    termindatoer: Date[];
    fødselsdato?: Date;
}

export interface UferdigBarn {
    termindato?: Date;
    erBarnetFødt?: boolean;
    fødselsdato?: Date;
}

export default Barn;
