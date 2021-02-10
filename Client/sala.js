export class Sala
{
    constructor(id, brojMesta)
    {
        this.id = id;
        this.brojMesta = brojMesta;

        this.miniSalaKont = null;
    }

    crtajSalu(host)
    {
        if(!host)
        throw new Error("Host nije definisan!");
    
        this.miniSalaKont = document.createElement("div");
        this.miniSalaKont.className = "miniSalaKont";

        let tekst = "Sala broj: " + `${this.id}`;
        this.miniSalaKont.innerHTML = tekst;
        host.appendChild(this.miniSalaKont);
    }
}