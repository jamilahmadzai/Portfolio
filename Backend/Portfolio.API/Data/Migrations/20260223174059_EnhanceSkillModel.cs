using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class EnhanceSkillModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Proficiency",
                table: "Skills",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Tier",
                table: "Skills",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsageContext",
                table: "Skills",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsageContextDe",
                table: "Skills",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "YearsOfExperience",
                table: "Skills",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Proficiency",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "Tier",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "UsageContext",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "UsageContextDe",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "YearsOfExperience",
                table: "Skills");
        }
    }
}
