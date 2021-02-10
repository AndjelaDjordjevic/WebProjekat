using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HotelController : ControllerBase
    {
        public HotelContext Context { get; set; }
        public HotelController(HotelContext context)
        {
            Context = context;
        }

        [Route("PreuzmiHotele")]
        [HttpGet]
        public async Task<List<Hotel>> PreuzmiHotele()
        {
            return await Context.Hoteli.Include(h=>h.Sobe).Include(h=>h.Racuni).ToListAsync();
        }

        [Route("UpisiHotel")]
        [HttpPost]
        public async Task UpisiHotel([FromBody] Hotel hotel)
        {
            Context.Hoteli.Add(hotel);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniHotel")]
        [HttpPut]
        public async Task IzmeniHotel([FromBody] Hotel hotel)
        {
            Context.Update<Hotel>(hotel);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiHotel")]
        [HttpDelete]
        public async Task IzbrisiHotel(int id)
        {
            var nizSoba = Context.Sobe.Where(s=>s.Hotel.ID == id);
            await nizSoba.ForEachAsync( s=> 
            {
                Context.Remove(s);
            });

            var nizRacuna = Context.Racuni.Where(r=> r.Hotel.ID == id);
            await nizRacuna.ForEachAsync( r=> 
            {
                Context.Remove(r);
            });

            var hotel = await Context.Hoteli.FindAsync(id);
            Context.Remove(hotel);
            await Context.SaveChangesAsync();
        }

        [Route("PreuzmiSobe/{idHotela}")]
        [HttpGet]
        public async Task<List<Soba>> PreuzmiSobe(int idHotela)
        {
            return await Context.Sobe.Where( soba => soba.Hotel.ID == idHotela).OrderBy( soba=> soba.BrojSobe).ToListAsync();
        }

        [Route("UpisiSobu/{idHotela}")]
        [HttpPost]
        public async Task UpisiSobu(int idHotela, [FromBody] Soba soba)
        {
            var hotel = await Context.Hoteli.FindAsync(idHotela);
            soba.Hotel = hotel;
            Context.Sobe.Add(soba);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniSobu")]
        [HttpPut]
        public async Task IzmeniSobu([FromBody] Soba soba)
        {
            Context.Update<Soba>(soba);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiSobu/{idSobe}")]
        [HttpDelete]
        public async Task IzbrisiSobu(int idSobe)
        {
            var soba = await Context.Sobe.FindAsync(idSobe);
            Context.Remove(soba);
            await Context.SaveChangesAsync();
        }


        [Route("PreuzmiRacune/{idHotela}")]
        [HttpGet]
        public async Task<List<Racun>> PreuzmiRacune(int idHotela)
        {
            return await Context.Racuni.Where( racun => racun.Hotel.ID == idHotela).OrderBy( racun => racun.BrojSobe).ToListAsync();
        }

        [Route("UpisiRacun/{idHotela}")]
        [HttpPost]
        public async Task UpisiRacun(int idHotela, [FromBody] Racun racun)
        {
            var hotel = await Context.Hoteli.FindAsync(idHotela);
            racun.Hotel = hotel;
            Context.Racuni.Add(racun);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniRacun")]
        [HttpPut]
        public async Task IzmeniRacun([FromBody] Racun racun)
        {
            Context.Update<Racun>(racun);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiRacun/{idRacuna}")]
        [HttpDelete]
        public async Task IzbrisiRacun(int idRacuna)
        {
            var racun = await Context.Racuni.FindAsync(idRacuna);
            Context.Remove(racun);
            await Context.SaveChangesAsync();
        }
    }
}
