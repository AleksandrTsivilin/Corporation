using Microsoft.EntityFrameworkCore.Migrations;

namespace DataBase.Migrations
{
    public partial class AddTableProductTemplateUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductTemplates_Users_UserId",
                table: "ProductTemplates");

            migrationBuilder.DropIndex(
                name: "IX_ProductTemplates_UserId",
                table: "ProductTemplates");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ProductTemplates");

            migrationBuilder.CreateTable(
                name: "ProductTemplatesUser",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsOwner = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TemplateId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductTemplatesUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductTemplatesUser_ProductTemplates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "ProductTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductTemplatesUser_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductTemplatesUser_TemplateId",
                table: "ProductTemplatesUser",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductTemplatesUser_UserId",
                table: "ProductTemplatesUser",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductTemplatesUser");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ProductTemplates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProductTemplates_UserId",
                table: "ProductTemplates",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTemplates_Users_UserId",
                table: "ProductTemplates",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
