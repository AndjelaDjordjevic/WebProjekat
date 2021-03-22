import {Hotel} from "./hotel.js";

//const hotelProba = new Hotel(1,"Hotel Proba", "Pr123",5);
//console.log(hotelProba);
//hotelProba.crtajHotel(document.body);

let main = document.createElement("div");
main.className = "bodyMain";
document.body.appendChild(main);


//Dodavanje hotela
let kontejnerDodaj = document.createElement("div");
kontejnerDodaj.className = "kontUpravljanje";
main.appendChild(kontejnerDodaj);


let elLabela = document.createElement("h3");
elLabela.innerHTML = "Dodaj novi hotel";
kontejnerDodaj.appendChild(elLabela);
let elInput;
let podaci = ["Naziv:","Adresa:","Broj soba po tipu:"];
let klase = ["nazivHotela", "adresaHotela", "brojSobaUHotelu"];
let tipovi = ["text","text","number"];
podaci.forEach((el, ind) =>
{
    elLabela = document.createElement("label");
    elLabela.innerHTML = el;
    kontejnerDodaj.appendChild(elLabela);
    elInput = document.createElement("input");
    elInput.type = tipovi[ind];
    elInput.className = klase[ind];
    kontejnerDodaj.appendChild(elInput);
})
kontejnerDodaj.appendChild(document.createElement("br"));
const dugmeDodaj = document.createElement("button");
dugmeDodaj.innerHTML="Dodaj hotel";
dugmeDodaj.className = "dugmici";
kontejnerDodaj.appendChild(dugmeDodaj);

dugmeDodaj.onclick=(ev)=>{

    let nazivH = kontejnerDodaj.querySelector(".nazivHotela").value;
    let adresaH = kontejnerDodaj.querySelector(".adresaHotela").value;
    let brojH = kontejnerDodaj.querySelector(".brojSobaUHotelu").value;

    fetch("https://localhost:5001/Hotel/UpisiHotel", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            naziv:nazivH,
            adresa:adresaH,
            brojSobaPoTipu:brojH,
        })
    });
}
kontejnerDodaj.appendChild(document.createElement("br"));
kontejnerDodaj.appendChild(document.createElement("br"));

elLabela = document.createElement("label");
elLabela.innerHTML = "Uneti ID hotela:";
kontejnerDodaj.appendChild(elLabela);

elInput = document.createElement("input");
elInput.className = "dodavanjeSobaIRacunaUBazu";
kontejnerDodaj.appendChild(elInput);

kontejnerDodaj.appendChild(document.createElement("br"));
const dugmeDodajSobeIRacune = document.createElement("button");
dugmeDodajSobeIRacune.innerHTML="Dodaj sobe i racune";
dugmeDodajSobeIRacune.className = "dugmici";
kontejnerDodaj.appendChild(dugmeDodajSobeIRacune);

dugmeDodajSobeIRacune.onclick=(ev)=>{

    let id = kontejnerDodaj.querySelector(".dodavanjeSobaIRacunaUBazu").value;
    let brojH = kontejnerDodaj.querySelector(".brojSobaUHotelu").value;
    
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<brojH;j++)
        {
            let roomNumber = (i*brojH)+j+1;
            fetch("https://localhost:5001/Hotel/UpisiSobu/"+ id,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                brojSobe:roomNumber,
                brojKreveta:i+1,
                })
            });
        }
    } 

    let ukupanBroj = brojH * 4;
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<brojH;j++)
        {
            let roomNumber = (i*brojH)+j+1;

            let tip;
            if(i==0)
                tip = "Jednokrevetna soba";
            else if(i==1)
                tip = "Dvokrevetna soba";
            else if(i==2)
                tip = "Trokrevetna soba";
            else 
                tip = "Cetvorokrevetna soba";

            fetch("https://localhost:5001/Hotel/UpisiRacun/"+ id,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                brojSobe:roomNumber,
                tipSobe:tip,
                brojDana:0,
                roomService:false,
                spaCentar:false,
                })
            });
        }
    }

}



//Crtanje svih hotela

let kontejnerCrtajSve = document.createElement("div");
kontejnerCrtajSve.className = "kontUpravljanje";
main.appendChild(kontejnerCrtajSve);

elLabela = document.createElement("h3")
elLabela.innerHTML = "Crtanje hotela";
kontejnerCrtajSve.appendChild(elLabela);

const dugmeCrtaj = document.createElement("button");
dugmeCrtaj.innerHTML="Crtaj sve hotele";
dugmeCrtaj.className = "dugmici";
kontejnerCrtajSve.appendChild(dugmeCrtaj);

dugmeCrtaj.onclick = (ev) => {


    fetch("https://localhost:5001/Hotel/PreuzmiHotele").then( p=> {
        p.json().then(data => {
            data.forEach(hotel => {
                const hotel1 = new Hotel(hotel.id, hotel.naziv, hotel.adresa, hotel.brojSobaPoTipu);
                hotel1.crtajHotel(document.body);

                hotel1.sobe.forEach(soba=>{
                    let s = soba;
                    s.azurirajSobu(soba.gost,soba.trenutniKapacitet,soba.brojDana);
                });

                hotel1.racuni.forEach(racun=> {
                    let r = racun;
                    r.azurirajRacun(racun.tip, racun.brojDana, racun.roomService, racun.spaCentar);
                });
    
            });
        });
    });


    
}


//Brisanje hotela
let kontejnerBrisanje = document.createElement("div");
kontejnerBrisanje.className = "kontUpravljanje";
main.appendChild(kontejnerBrisanje);

elLabela = document.createElement("h3");
elLabela.innerHTML = "Brisanje hotela";
kontejnerBrisanje.appendChild(elLabela);
elLabela = document.createElement("label");
elLabela.innerHTML = "ID hotela:";
kontejnerBrisanje.appendChild(elLabela);

elInput = document.createElement("input");
elInput.className ="idBrisanjeHotela";
elInput.type ="number";
kontejnerBrisanje.appendChild(elInput);

kontejnerBrisanje.appendChild(document.createElement("br"));

let dugmeBrisanje = document.createElement("button");
dugmeBrisanje.innerHTML="Obrisi hotel";
dugmeBrisanje.className = "dugmici";
kontejnerBrisanje.appendChild(dugmeBrisanje);
dugmeBrisanje.onclick = (ev) =>
{
    let id = document.querySelector(".idBrisanjeHotela").value;
    console.log(id);
    fetch("https://localhost:5001/Hotel/IzbrisiHotel?id="+id,{method:"DELETE"}).then( p=> {
        if (p.ok) 
        {
            location.reload();
        }
    });
}

