using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class EnhanceEducationModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Focus",
                table: "Educations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FocusDe",
                table: "Educations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "RelevantModules",
                table: "Educations",
                type: "text[]",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Focus",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "FocusDe",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "RelevantModules",
                table: "Educations");
        }
    }
}
