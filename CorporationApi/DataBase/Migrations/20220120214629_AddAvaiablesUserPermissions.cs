using Microsoft.EntityFrameworkCore.Migrations;

namespace DataBase.Migrations
{
    public partial class AddAvaiablesUserPermissions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Permissions_AvaiablesUser_AvaiableUserId",
                table: "Permissions");

            migrationBuilder.DropIndex(
                name: "IX_Permissions_AvaiableUserId",
                table: "Permissions");

            migrationBuilder.DropColumn(
                name: "AvaiableUserId",
                table: "Permissions");

            migrationBuilder.CreateTable(
                name: "AvaiablesUserPermissins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AvaiablesUserId = table.Column<int>(type: "int", nullable: false),
                    PermissionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvaiablesUserPermissins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AvaiablesUserPermissins_AvaiablesUser_AvaiablesUserId",
                        column: x => x.AvaiablesUserId,
                        principalTable: "AvaiablesUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AvaiablesUserPermissins_Permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AvaiablesUserPermissins_AvaiablesUserId",
                table: "AvaiablesUserPermissins",
                column: "AvaiablesUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AvaiablesUserPermissins_PermissionId",
                table: "AvaiablesUserPermissins",
                column: "PermissionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AvaiablesUserPermissins");

            migrationBuilder.AddColumn<int>(
                name: "AvaiableUserId",
                table: "Permissions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_AvaiableUserId",
                table: "Permissions",
                column: "AvaiableUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Permissions_AvaiablesUser_AvaiableUserId",
                table: "Permissions",
                column: "AvaiableUserId",
                principalTable: "AvaiablesUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
