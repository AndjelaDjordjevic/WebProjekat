export class Racun
{
    constructor(id, brojSobe, tipSobe, brojDana, roomService, spaCentar)
    {
        this.id = id;
        this.brojSobe = brojSobe;
        this.tipSobe = tipSobe;
        this.brojDana = brojDana;

        //True ili false - da li su korisceni room service i spa centar
        this.roomService = roomService; //2500din
        this.spaCentar = spaCentar;     //3200din


        this.placenRacun = false;

        this.konacnaCena = 0;
        this.miniKontejnerRacun = null;
    }

    vratiCenuPoTipuSobe()
    {
        var cena = 0;
        switch(this.tipSobe)
        {
            case "Jednokrevetna soba":
                cena = 4120;
                break;
            case "Dvokrevetna soba":
                cena = 5750;
                break;
            case "Trokrevetna soba":
                cena = 6510;
                break;
            case "Cetvorokrevetna soba":
                cena = 8220;
                break;
            default:
                cena = 0;
        }
        return cena;
    }

    odrediKonacnuCenu()
    {
        let cenaSobe = this.vratiCenuPoTipuSobe();      
        this.konacnaCena = cenaSobe * this.brojDana;
        if (this.roomService)
            this.konacnaCena += 2500;
        if (this.spaCentar)
            this.konacnaCena += 3200;
        return this.konacnaCena;
    }

    crtajRacuncic(host)
    {
        if(!host)
            throw new Error("Host nije definisan!");

        this.miniKontejnerRacun = document.createElement("div");
        this.miniKontejnerRacun.className = "miniRacunKont";
        host.appendChild(this.miniKontejnerRacun);

        this.miniKontejnerRacun.innerHTML = "Racun za sobu: " + this.brojSobe;
    }

    azurirajRacun(brojDana, roomService, spaCentar)
    {
        if(brojDana == 0)
        {
            this.miniKontejnerRacun.innerHTML = "Racun za sobu: " + this.brojSobe;
        }
        else if(this.placenRacun == true)
        {
            this.miniKontejnerRacun.innerHTML = "Racun za sobu: " + this.brojSobe + " je placen!";
        }
        else
        {
            this.brojDana = brojDana;
            this.roomService = roomService;
            this.spaCentar = spaCentar;
            this.konacnaCena = this.odrediKonacnuCenu();
        
            let tekst = "Racun za sobu: " + this.brojSobe;
            tekst += " " + this.konacnaCena + " ";
            tekst += " RSD";
            
            tekst += "  *Ocekuje se uplata*  ";
            this.miniKontejnerRacun.innerHTML = tekst;
        }
    
    }

    platiRacun(iznos)
    {
        let provera = this.konacnaCena - iznos;
        if(provera != 0)
            alert("Morate platiti iznos u celosti!");
        else
        {
            this.placenRacun = true;
            console.log(this.placenRacun);
            this.miniKontejnerRacun.innerHTML = "Racun je placen";
        }
    }




}