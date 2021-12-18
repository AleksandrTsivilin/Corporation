using Microsoft.EntityFrameworkCore.Migrations;

namespace DataBase.Migrations
{
    public partial class MoveColummCountFromProductsToProductStorage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {           

            migrationBuilder.AddColumn<int>(
                name: "CountProduct",
                table: "ProductStorage",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.Sql($"BEGIN Transaction;\r" +
                $"DECLARE @MyCursor CURSOR; " +
                $"DECLARE @MyCount INT; " +
                $"DECLARE @MyId INT; " +
                $"BEGIN " +
                $"SET @MyCursor = CURSOR FOR " +
                $"SELECT top 1000 Id, AvaiableCount FROM Products " +
                $"OPEN @MyCursor " +
                $"FETCH NEXT FROM @MyCursor INTO @MyId, @MyCount " +
                $"WHILE @@FETCH_STATUS = 0 " +
                $"BEGIN " +
                $"UPDATE ProductStorage SET CountProduct = @MyCount where ProductId = @MyId; " +
                $"FETCH NEXT FROM @MyCursor " +
                $"INTO @MyId, @MyCount " +
                $"END; " +
                $"CLOSE @MyCursor; " +
                $"DEALLOCATE @MyCursor; " +
                $"END; " +
                $"COMMIT;");

            migrationBuilder.DropColumn(
                name: "AvaiableCount",
                table: "Products");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvaiableCount",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.Sql($"BEGIN Transaction;\r" +
                $"DECLARE @MyCursor CURSOR; " +
                $"DECLARE @MyCount INT; " +
                $"DECLARE @MyProductId INT; " +
                $"BEGIN " +
                $"SET @MyCursor = CURSOR FOR " +
                $"SELECT top 1000 ProductId, CountProduct FROM ProductStorage " +
                $"OPEN @MyCursor " +
                $"FETCH NEXT FROM @MyCursor INTO @MyProductId, @MyCount " +
                $"WHILE @@FETCH_STATUS = 0 " +
                $"BEGIN " +
                $"UPDATE Products SET AvaiableCount = @MyCount where Id = @MyProductId; " +
                $"FETCH NEXT FROM @MyCursor " +
                $"INTO @MyProductId, @MyCount " +
                $"END; " +
                $"CLOSE @MyCursor; " +
                $"DEALLOCATE @MyCursor; " +
                $"END; " +
                $"COMMIT;");


            migrationBuilder.DropColumn(
                name: "CountProduct",
                table: "ProductStorage");
        }
    }
}
