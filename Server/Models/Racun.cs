using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Server.Models
{
    [Table("Racun")]
    public class Racun
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("BrojSobe")]
        public int BrojSobe { get; set; }

        [Column("TipSobe")]
        public string TipSobe { get; set; }

        [Column("BrojDana")]
        public int BrojDana { get; set; }

        [Column("RoomService")]
        public bool RoomService { get; set; }

        [Column("SpaCentar")]
        public bool SpaCentar { get; set; }

        [Column("PlacenRacun")]
        public bool PlacenRacun { get; set; }

        [Column("KonacnaCena")]
        public int KonacnaCena { get; set; }

        [JsonIgnore]
        public Hotel Hotel { get; set; }
    }
}