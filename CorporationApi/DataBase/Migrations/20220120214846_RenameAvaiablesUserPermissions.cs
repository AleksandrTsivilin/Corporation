using Microsoft.EntityFrameworkCore.Migrations;

namespace DataBase.Migrations
{
    public partial class RenameAvaiablesUserPermissions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AvaiablesUserPermissins_AvaiablesUser_AvaiablesUserId",
                table: "AvaiablesUserPermissins");

            migrationBuilder.DropForeignKey(
                name: "FK_AvaiablesUserPermissins_Permissions_PermissionId",
                table: "AvaiablesUserPermissins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AvaiablesUserPermissins",
                table: "AvaiablesUserPermissins");

            migrationBuilder.RenameTable(
                name: "AvaiablesUserPermissins",
                newName: "AvaiablesUserPermissions");

            migrationBuilder.RenameIndex(
                name: "IX_AvaiablesUserPermissins_PermissionId",
                table: "AvaiablesUserPermissions",
                newName: "IX_AvaiablesUserPermissions_PermissionId");

            migrationBuilder.RenameIndex(
                name: "IX_AvaiablesUserPermissins_AvaiablesUserId",
                table: "AvaiablesUserPermissions",
                newName: "IX_AvaiablesUserPermissions_AvaiablesUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AvaiablesUserPermissions",
                table: "AvaiablesUserPermissions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AvaiablesUserPermissions_AvaiablesUser_AvaiablesUserId",
                table: "AvaiablesUserPermissions",
                column: "AvaiablesUserId",
                principalTable: "AvaiablesUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AvaiablesUserPermissions_Permissions_PermissionId",
                table: "AvaiablesUserPermissions",
                column: "PermissionId",
                principalTable: "Permissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AvaiablesUserPermissions_AvaiablesUser_AvaiablesUserId",
                table: "AvaiablesUserPermissions");

            migrationBuilder.DropForeignKey(
                name: "FK_AvaiablesUserPermissions_Permissions_PermissionId",
                table: "AvaiablesUserPermissions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AvaiablesUserPermissions",
                table: "AvaiablesUserPermissions");

            migrationBuilder.RenameTable(
                name: "AvaiablesUserPermissions",
                newName: "AvaiablesUserPermissins");

            migrationBuilder.RenameIndex(
                name: "IX_AvaiablesUserPermissions_PermissionId",
                table: "AvaiablesUserPermissins",
                newName: "IX_AvaiablesUserPermissins_PermissionId");

            migrationBuilder.RenameIndex(
                name: "IX_AvaiablesUserPermissions_AvaiablesUserId",
                table: "AvaiablesUserPermissins",
                newName: "IX_AvaiablesUserPermissins_AvaiablesUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AvaiablesUserPermissins",
                table: "AvaiablesUserPermissins",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AvaiablesUserPermissins_AvaiablesUser_AvaiablesUserId",
                table: "AvaiablesUserPermissins",
                column: "AvaiablesUserId",
                principalTable: "AvaiablesUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AvaiablesUserPermissins_Permissions_PermissionId",
                table: "AvaiablesUserPermissins",
                column: "PermissionId",
                principalTable: "Permissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
