import { Racun } from "./racun.js";
import { Soba } from "./soba.js";

export class Hotel
{

    constructor(id, naziv, adresa, brojSobaPoTipu)
    {
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;

        //broj soba po tipu sobe (1krevetne, 2krevetne, 3krevetne i 4krevetne)
        this.brojSobaPoTipu = brojSobaPoTipu;

        //ukupan broj soba
        this.brojSoba = this.brojSobaPoTipu*4;

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
        if(!host)
            throw new Error("Host nije definisan!");
        
        const kontFormaSobe = document.createElement("div");
        kontFormaSobe.className = "kontForma";
        host.appendChild(kontFormaSobe);

        let elLabela = document.createElement("h3");
        elLabela.innerHTML = "Unos gosta";
        kontFormaSobe.appendChild(elLabela);

        let elInput;

        let podaci = ["Ime:", "Prezime:", "E-mail:", "Broj dana:", "Broj odraslih:", "Broj dece:"];
        let imenaKlasa = ["ime","prezime","email", "brDana", "brOdraslih", "brDece"];
        let tipovi = ["text", "text", "text", "number", "number", "number"];
        podaci.forEach((el, ind) =>
        {
            elLabela = document.createElement("label");
            elLabela.innerHTML = el;
            kontFormaSobe.appendChild(elLabela);
            elInput = document.createElement("input");
            elInput.type = tipovi[ind];
            elInput.className = imenaKlasa[ind];
            kontFormaSobe.appendChild(elInput);
        })

        kontFormaSobe.appendChild(document.createElement("br"));

        let divSl = document.createElement("div");
        kontFormaSobe.appendChild(divSl);
        elLabela = document.createElement("label");
        elLabela.innerHTML = "Broj sobe:";
        divSl.appendChild(elLabela);
        let izbor = document.createElement("select");
        divSl.appendChild(izbor);
        let opcija = null;
        for(let i=0;i<this.brojSoba;i++)
        {
            opcija = document.createElement("option");
            opcija.innerHTML = i+1;
            opcija.value = i+1;
            izbor.appendChild(opcija);
        }

        kontFormaSobe.appendChild(document.createElement("br"));

        const dugme = document.createElement("button");
        dugme.innerHTML = "Check in";
        dugme.className = "dugmici";
        kontFormaSobe.appendChild(dugme);

        dugme.onclick = (ev) =>
        {
            //Podaci o gostu
            let ime = this.kontejner.querySelector(".ime").value;
            let prezime = this.kontejner.querySelector(".prezime").value;
            let email = this.kontejner.querySelector(".email").value;
            let podaciOGostu = ime + " " + prezime + " " + email;

            let kolikoOstaje = parseInt(this.kontejner.querySelector(".brDana").value);

            //Proverava se da li je broj kreveta dovoljan za broj osoba i da li je soba vec rezervisana
            let brojOdraslih = parseInt(this.kontejner.querySelector(".brOdraslih").value);
            let brojDece = parseInt(this.kontejner.querySelector(".brDece").value);
            if(isNaN(brojDece))
                brojDece = 0;
            if(isNaN(brojOdraslih))
                brojOdraslih = 0;
            let ukupanBrOsoba = brojOdraslih + brojDece;

            let brojSobe = parseInt(izbor.value);

            //console.log(this.sobe[brojSobe-1]);
            if (ime == "" || prezime == "")
                alert("Potrebno je uneti ime i prezime gosta!");
            else if(this.sobe[brojSobe-1].zauzeta == true)
                alert("Soba je vec zauzeta! Molimo Vas izaberite drugu sobu!");
            else if(this.sobe[brojSobe-1].brojKreveta < ukupanBrOsoba)
                alert("Broj kreveta ne odgovara broju osoba!");
            else if(this.sobe[brojSobe-1].sredjivanjeSobe == true)
                alert("Izaberite sobu koja je sredjena!");
            else
            {
                //this.sobe[brojSobe-1].azurirajSobu(ime, prezime, email, ukupanBrOsoba, kolikoOstaje);
                fetch("https://localhost:5001/Hotel/IzmeniSobu", {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        id:this.sobe[brojSobe-1].id,
                        brojSobe:brojSobe,
                        brojKreveta:this.sobe[brojSobe-1].brojKreveta,
                        trenutniKapacitet:ukupanBrOsoba,
                        brojDana:kolikoOstaje,
                        zauzeta:true,
                        sredjivanje:false,
                        gost:podaciOGostu,
                    })
                }).then(p=>{
                    this.sobe[brojSobe-1].azurirajSobu(podaciOGostu, ukupanBrOsoba, kolikoOstaje);
                });
            }
        }

        kontFormaSobe.appendChild(document.createElement("br"));
        kontFormaSobe.appendChild(document.createElement("br"));


        //Check out
        elLabela = document.createElement("label");
        elLabela.innerHTML = "Uneti broj sobe:";
        kontFormaSobe.appendChild(elLabela);

        let inputBrSobe = document.createElement("input");
        inputBrSobe.className = "checkOut";
        inputBrSobe.type = "number";
        kontFormaSobe.appendChild(inputBrSobe);

        const dugme1 = document.createElement("button");
        dugme1.innerHTML = "Check out";
        dugme1.className = "dugmici";
        kontFormaSobe.appendChild(dugme1);

        dugme1.onclick = (ev) =>
        {
            let brojSobe = this.kontejner.querySelector(".checkOut").value;
            if(!this.sobe[brojSobe-1])
                alert("Izabrana soba ne postoji!");
            else if(this.sobe[brojSobe-1].zauzeta == false)
                alert("Ova soba je prazna!");
            else if(this.racuni[brojSobe-1].placenRacun == false)
            {
                alert("Morate izmiriti dugovanja!");
                //console.log(this.racuni[brojSobe-1]);
            }
            else
            {
                //this.sobe[brojSobe-1].azurirajSobu("",0,0);
                //let tipSobe = this.sobe[brojSobe-1].vratiTipSobe();
                //this.racuni[brojSobe-1].azurirajRacun(tipSobe,0,false,false);*/

                //this.sobe[brojSobe-1].azurirajSobu(ime, prezime, email, ukupanBrOsoba, kolikoOstaje);
                fetch("https://localhost:5001/Hotel/IzmeniSobu", {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        id:this.sobe[brojSobe-1].id,
                        brojSobe:brojSobe,
                        brojKreveta:this.sobe[brojSobe-1].brojKreveta,
                        trenutniKapacitet:0,
                        brojDana:0,
                        zauzeta:false,
                        sredjivanje:true,
                        gost:"",
                    })
                }).then(p=>{
                    this.sobe[brojSobe-1].azurirajSobu("", 0, 0);
                });

                fetch("https://localhost:5001/Hotel/IzmeniRacun", {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        id:this.racuni[brojSobe-1].id,
                        brojSobe:this.racuni[brojSobe-1].brojSobe,
                        tipSobe:this.racuni[brojSobe-1].tipSobe,
                        brojDana:0,
                        roomService:false,
                        spaCentar:false,
                        konacnaCena:0,
                        placenRacun:false,
                    })
                }).then(p=>{
                    this.racuni[brojSobe-1].azurirajRacun(0, false, false);
                });
                
            }

        }

    }

    crtajSobe(host)
    {
        if(!host)
            throw new Error("Host nije definisan!");

        const kontPrikazSoba = document.createElement("div");
        kontPrikazSoba.className = "kontPrikazSoba";
        host.appendChild(kontPrikazSoba);

        fetch("https://localhost:5001/Hotel/PreuzmiSobe/" + this.id).then(p=>{
            p.json().then(data=> {
                data.forEach(soba => {
                    let soba1 = new Soba(soba.id, soba.brojSobe, soba.brojKreveta);
                    this.dodajSobu(soba1);
                    soba1.crtajSobu(kontPrikazSoba);
                    if(soba.gost != null)
                        soba1.azurirajSobu(soba.gost,soba.trenutniKapacitet,soba.brojDana);
                    
                })
            })
        })
        

       /*const kontPrikazSoba = document.createElement("div");
       kontPrikazSoba.className = "kontPrikazSoba";
       host.appendChild(kontPrikazSoba);

        for(let i=0;i<4;i++)
        {
            for(let j=0;j<this.brojSobaPoTipu;j++)
            {
                let soba = new Soba((i*this.brojSobaPoTipu)+j, (i*this.brojSobaPoTipu)+j+1, i+1);
                this.dodajSobu(soba);
                soba.crtajSobu(kontPrikazSoba);
            }
        }*/

    }


    

    crtajFormuRacun(host)
    {
        if(!host)
        throw new Error("Host nije definisan!");

        const kontFormaRacun = document.createElement("div");
        kontFormaRacun.className = "kontForma";
        host.appendChild(kontFormaRacun);

        let elLabela = document.createElement("h3");
        elLabela.innerHTML = "Formiraj racun";
        kontFormaRacun.appendChild(elLabela);

        elLabela = document.createElement("label");
        elLabela.innerHTML = "Uneti broj sobe:";
        kontFormaRacun.appendChild(elLabela);

        let inputSobaRacun = document.createElement("input");
        inputSobaRacun.className = "racunSoba";
        inputSobaRacun.type = "number";
        kontFormaRacun.appendChild(inputSobaRacun);

        elLabela = document.createElement("label");
        elLabela.innerHTML = "Dodatne koriscene usluge:";
        kontFormaRacun.appendChild(elLabela);


        let usluge = ["Room service", "Spa centar"];
        let ime = ["roomService", "spaCentar"];
        let opcija = null;  
        let divCb = document.createElement("div");
        divCb.className = "dodatneUsluge";
        kontFormaRacun.appendChild(divCb);
        usluge.forEach((el, ind) => {
            opcija = document.createElement("input");
            opcija.type = "checkbox";
            opcija.name = ime[ind];
            divCb.appendChild(opcija);
            elLabela = document.createElement("label");
            elLabela.innerHTML = el;
            divCb.appendChild(elLabela);
            divCb.appendChild(document.createElement("br"));
        })
        

        const dugme = document.createElement("button");
        dugme.innerHTML = "Racun";
        dugme.className = "dugmici";
        kontFormaRacun.appendChild(dugme);

        dugme.onclick = (ev) =>
        {
            let brojSobeRacun = this.kontejner.querySelector(".racunSoba").value;
            
            var roomServiceCh = this.kontejner.querySelector(`input[name="roomService"]`);
            let roomServiceChecked = roomServiceCh.checked;

            var spaCentarCh = this.kontejner.querySelector(`input[name="spaCentar"]`);
            let spaCentarChecked = spaCentarCh.checked;

            //console.log(this.racuni[brojSobeRacun-1]);
            
            if(!this.racuni[brojSobeRacun-1])
                alert("Izabrana soba ne postoji!");
            else if(this.sobe[brojSobeRacun-1].zauzeta == false)
                alert("Ova soba je prazna!");
            else if (this.racuni[brojSobeRacun-1].placenRacun == true)
                alert("Racun je vec placen!");
            else
            {
                //let tip = this.sobe[brojSobeRacun-1].vratiTipSobe();
                let brojDana = this.sobe[brojSobeRacun-1].vratiKolikoDugoGostOstaje();
                let cena = this.racuni[brojSobeRacun-1].odrediKonacnuCenu();
                //console.log(cena);
                //this.racuni[brojSobeRacun-1].azurirajRacun(tip, brojDana, roomServiceChecked, spaCentarChecked);

                fetch("https://localhost:5001/Hotel/IzmeniRacun", {
                    method:"PUT",
                    headers:{
                        "COntent-Type":"application/json"
                    },
                    body:JSON.stringify({
                        id:this.racuni[brojSobeRacun-1].id,
                        brojSobe:this.racuni[brojSobeRacun-1].brojSobe,
                        tipSobe:this.racuni[brojSobeRacun-1].tipSobe,
                        brojDana:brojDana,
                        roomService:roomServiceChecked,
                        spaCentar:spaCentarChecked,
                        konacnaCena:this.racuni[brojSobeRacun-1].odrediKonacnuCenu(),
                        placenRacun:false,
                    })
                }).then(p=>{
                    this.racuni[brojSobeRacun-1].azurirajRacun(brojDana, roomServiceChecked, spaCentarChecked);
                });
                
            }
            

        }

        kontFormaRacun.appendChild(document.createElement("hr"));

        //Placanje
        elLabela = document.createElement("label");
        elLabela.innerHTML = "Uneti broj sobe:";
        kontFormaRacun.appendChild(elLabela);

        let inputEl = document.createElement("input");
        inputEl.type = "number";
        inputEl.className = "uplataBrSobe";
        kontFormaRacun.appendChild(inputEl);

        elLabela = document.createElement("label");
        elLabela.innerHTML = "Uneti iznos:";
        kontFormaRacun.appendChild(elLabela);

        let uplata = document.createElement("input");
        uplata.className = "uplataIznos";
        uplata.type = "number";
        kontFormaRacun.appendChild(uplata);
        
        kontFormaRacun.appendChild(document.createElement("br"));

        const dugme1 = document.createElement("button");
        dugme1.innerHTML = "Plati";
        dugme1.className = "dugmici";
        kontFormaRacun.appendChild(dugme1);

        dugme1.onclick = (ev) =>
        {
            let brojSobeRacun = this.kontejner.querySelector(".uplataBrSobe").value;
            let uplataZaSobu = this.kontejner.querySelector(".uplataIznos").value;

            let br = this.racuni[brojSobeRacun-1].brojDana;
            let usluga = this.racuni[brojSobeRacun-1].roomService;
            let spa = this.racuni[brojSobeRacun-1].spaCentar;
            

            //console.log(this.racuni[brojSobeRacun-1].konacnaCena);

            let provera = this.racuni[brojSobeRacun-1].konacnaCena - uplataZaSobu;

            if(!this.racuni[brojSobeRacun-1])
                alert("Morate prvo izabrati odgovarajucu sobu!");
            else if(this.sobe[brojSobeRacun-1].zauzeta == false)
                alert("Ova soba je prazna!");
            else if (!uplataZaSobu)
                alert("Unesite sumu!");
            else if (this.racuni[brojSobeRacun-1].placenRacun == true)
                alert("Racun je vec placen!");
            else if (provera!= 0)
                alert("Morate platiti iznos u celosti");
            else
            {
                //this.racuni[brojSobeRacun-1].platiRacun(uplataZaSobu);

                fetch("https://localhost:5001/Hotel/IzmeniRacun", {
                    method:"PUT",
                    headers:{
                        "COntent-Type":"application/json"
                    },
                    body:JSON.stringify({
                        id:this.racuni[brojSobeRacun-1].id,
                        brojSobe:this.racuni[brojSobeRacun-1].brojSobe,
                        tipSobe:this.racuni[brojSobeRacun-1].tipSobe,
                        brojDana:this.racuni[brojSobeRacun-1].brojDana,
                        roomService:this.racuni[brojSobeRacun-1].roomService,
                        spaCentar:this.racuni[brojSobeRacun-1].spaCentar,
                        konacnaCena:this.racuni[brojSobeRacun-1].odrediKonacnuCenu(),
                        placenRacun:true,
                    })
                }).then(p=>{
                    this.racuni[brojSobeRacun-1].platiRacun(uplataZaSobu);
                    this.racuni[brojSobeRacun-1].azurirajRacun(br, usluga, spa);
                });
            }
        }
        

    }



    crtajRacune(host)
    {

         const kontPrikazRacuna = document.createElement("div");
         kontPrikazRacuna.className = "kontPrikazRacuna";
         host.appendChild(kontPrikazRacuna);

         fetch("https://localhost:5001/Hotel/PreuzmiRacune/" + this.id).then(p=>{
            p.json().then(data=>{
                data.forEach(racun=>{
                    let racun1=new Racun(racun.id,racun.brojSobe,racun.tipSobe, racun.brojDana, racun.roomService, racun.spaCentar);
                    this.dodajRacun(racun1);
                    racun1.crtajRacuncic(kontPrikazRacuna);
                    
                   
        
                    if(racun.placenRacun != false)
                    {
                       racun1.placenRacun = true;
                       racun1.azurirajRacun(racun.brojDana, racun.roomService, racun.spaCentar);
                    }

                    if(racun.brojDana != 0)
                    {
                        racun1.konacnaCena = racun.konacnaCena;
                        racun1.azurirajRacun(racun.brojDana, racun.roomService, racun.spaCentar);
                    }
                });
            });
        });


    }


}