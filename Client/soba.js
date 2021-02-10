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
        //sredjivanje sobe
        this.sredjivanjeSobe = false;

        this.miniSobaKont = null;
       

    }


    vratiBoju()
    {
        if(this.zauzeta != false)
            return "crimson";
        else
            return "#3bb78f";
    }

    vratiTipSobe()
    {
        var string;
        switch(this.brojKreveta)
        {
            case 1:
                string = "Jednokrevetna soba";
                break;
            case 2:
                string = "Dvokrevetna soba";
                break;
            case 3:
                string = "Trokrevetna soba";
                break;
            case 4:
                string = "Cetvorokrevetna soba";
                break;
            default:
                string = "Neispravan broj kreveta";
        }
        return string;
        
    }

    vratiKolikoDugoGostOstaje()
    {
        return this.brojDana;
    }

    dodajGoste(br, podaciGost)
    {
        this.trenutniKapacitet += br;
        this.gost = podaciGost;
    }


    crtajSobu(host)
    {
        if(!host)
            throw new Error("Host nije definisan!");
        
        this.miniSobaKont = document.createElement("div");
        this.miniSobaKont.className = "miniSobaKont";

        let tekst = "Soba broj: " + `${this.brojSobe}`;
        tekst += " " + this.vratiTipSobe();
        this.miniSobaKont.innerHTML = tekst;
        this.miniSobaKont.style.backgroundColor = this.vratiBoju();
        host.appendChild(this.miniSobaKont);

    }

    azurirajSobu(podaciOGostu, brOsoba, brDana)
    {
        if(podaciOGostu != "" && this.sredjivanjeSobe==false)
        {
            this.dodajGoste(brOsoba, podaciOGostu);
            this.brojDana = brDana;
            this.zauzeta = true;

            //let tekst = "Soba broj: " + `${this.id}`;
            //tekst += `${ime} ${prezime} ${email}`;
            this.miniSobaKont.innerHTML = "Soba broj: " + `${this.brojSobe} ` + `${this.gost}`;
            //this.miniSobaKont.innerHTML = tekst;
            this.miniSobaKont.style.backgroundColor = this.vratiBoju();
        }
        else if(this.sredjivanjeSobe == true)
            alert("Sredjivanje sobe! Izaberite sobu koja je vec sredjena!");
        else 
        {
            this.trenutniKapacitet = 0;
            this.gost = "";
            this.brojDana = 0;
            this.zauzeta = false;
            this.sredjivanjeSobe = true;
            let tekst = "Soba broj: " + `${this.brojSobe}`;
            tekst += " " + this.vratiTipSobe();
            tekst += " *SREDjIVANJE SOBE* "
            this.miniSobaKont.innerHTML = tekst;
            this.miniSobaKont.style.backgroundColor = "#FFE4B5";
        }
    }

}

