export class Hotel
{
    constructor(id, naziv, adresa)
    {
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;

        this.sobe = [];
        this.racuni = [];

        this.kontejner = null;
    }


    dodajSobu(sb)
    {
        this.sobe.push(sb);
    }

    dodajRacun(rc)
    {
        this.racuni.push(rc);
    }


    crtajHotel(host)
    {
        if (!host)
            throw new Error("Host nije definisan!");

        this.kontejner = document.createElement("div");
        this.kontejner.className = "kontejnerHotel";
        host.appendChild(this.kontejner);

        const naziv = document.createElement("h1");
        naziv.innerHTML = this.naziv;
        this.kontejner.appendChild(naziv);

        const kontSobe = document.createElement("div");
        kontSobe.className = "kontSobe";
        this.kontejner.appendChild(kontSobe);

        this.crtajFormuSobe(kontSobe);
        this.crtajSobe(kontSobe);

        this.kontejner.appendChild(document.createElement("hr"));

        const kontRacun = document.createElement("div");
        kontRacun.className = "kontRacun";
        this.kontejner.appendChild(kontRacun);

        this.crtajFormuRacun(kontRacun);
        this.crtajRacune(kontRacun);
        
    }

    crtajFormuSobe(host)
    {

    }

    crtajSobe(host)
    {

    }

    crtajFormuRacun(host)
    {
        
    }

    crtajRacune(host)
    {
        
    }



}