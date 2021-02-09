export class Soba
{
    constructor(id, brojSobe, brojKreveta)
    {
        this.id = id;
        this.brojSobe = brojSobe;
        this.brojKreveta = brojKreveta;
        
        this.trenutniKapacitet = 0;
        this.brojDana = 0;
        this.gost = "";
        this.zauzeta = false;
        
        this.miniSobaKont = null;
    }
}