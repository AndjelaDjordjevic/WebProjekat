using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    [Table("Hotel")]
    public class Hotel
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(255)]
        public string Naziv { get; set; }
        
        [Column("Adresa")]
        [MaxLength(255)]
        public string Adresa { get; set; }
       
        [Column("BrojSobaPoTipu")]
        [DataType("number")]
        public int BrojSobaPoTipu { get; set; }

        public virtual List<Soba> Sobe { get; set; }
        public virtual List<Racun> Racuni { get; set; }
        
    }
}