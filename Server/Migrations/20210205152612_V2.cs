using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Racuni_Hotel_HotelID",
                table: "Racuni");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Racuni",
                table: "Racuni");

            migrationBuilder.RenameTable(
                name: "Racuni",
                newName: "Racun");

            migrationBuilder.RenameIndex(
                name: "IX_Racuni_HotelID",
                table: "Racun",
                newName: "IX_Racun_HotelID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Racun",
                table: "Racun",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Racun_Hotel_HotelID",
                table: "Racun",
                column: "HotelID",
                principalTable: "Hotel",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Racun_Hotel_HotelID",
                table: "Racun");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Racun",
                table: "Racun");

            migrationBuilder.RenameTable(
                name: "Racun",
                newName: "Racuni");

            migrationBuilder.RenameIndex(
                name: "IX_Racun_HotelID",
                table: "Racuni",
                newName: "IX_Racuni_HotelID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Racuni",
                table: "Racuni",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Racuni_Hotel_HotelID",
                table: "Racuni",
                column: "HotelID",
                principalTable: "Hotel",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
