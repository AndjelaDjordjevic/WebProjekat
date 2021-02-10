using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Models
{
    [Table("Soba")]
    public class Soba
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("BrojSobe")]
        public int BrojSobe { get; set; }

        [Column("BrojKreveta")]
        public int BrojKreveta { get; set; }

        [Column("TrenutniKapacitet")]
        public int TrenutniKapacitet { get; set; }

        [Column("BrojDana")]
        public int BrojDana { get; set; }

        [Column("Gost")]
        public string Gost { get; set; }

        [Column("Zauzeta")]
        public bool Zauzeta { get; set; }

        [Column("Sredjivanje")]
        public bool Sredjivanje { get; set; }

        [JsonIgnore]
        public Hotel Hotel { get; set; }

    }
}