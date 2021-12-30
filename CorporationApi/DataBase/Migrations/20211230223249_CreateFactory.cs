using Microsoft.EntityFrameworkCore.Migrations;

namespace DataBase.Migrations
{
    public partial class CreateFactory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FactoryId",
                table: "Departments",
                type: "int",
                nullable: false);

            migrationBuilder.CreateTable(
                name: "Factories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Factories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Departments_FactoryId",
                table: "Departments",
                column: "FactoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Factories_FactoryId",
                table: "Departments",
                column: "FactoryId",
                principalTable: "Factories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Factories_FactoryId",
                table: "Departments");

            migrationBuilder.DropTable(
                name: "Factories");

            migrationBuilder.DropIndex(
                name: "IX_Departments_FactoryId",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "FactoryId",
                table: "Departments");
        }
    }
}
