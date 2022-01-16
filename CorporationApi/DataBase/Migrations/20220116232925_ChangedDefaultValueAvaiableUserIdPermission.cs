using Microsoft.EntityFrameworkCore.Migrations;

namespace DataBase.Migrations
{
    public partial class ChangedDefaultValueAvaiableUserIdPermission : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Permissions_AvaiablesUser_AvaiableUserId",
                table: "Permissions");

            migrationBuilder.AlterColumn<int>(
                name: "AvaiableUserId",
                table: "Permissions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Permissions_AvaiablesUser_AvaiableUserId",
                table: "Permissions",
                column: "AvaiableUserId",
                principalTable: "AvaiablesUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Permissions_AvaiablesUser_AvaiableUserId",
                table: "Permissions");

            migrationBuilder.AlterColumn<int>(
                name: "AvaiableUserId",
                table: "Permissions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Permissions_AvaiablesUser_AvaiableUserId",
                table: "Permissions",
                column: "AvaiableUserId",
                principalTable: "AvaiablesUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
