using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProjectModelWithArchitecture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ArchitectureDescription",
                table: "Projects",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ArchitectureDescriptionDe",
                table: "Projects",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ArchitectureImpact",
                table: "Projects",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ArchitectureImpactDe",
                table: "Projects",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArchitectureDescription",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ArchitectureDescriptionDe",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ArchitectureImpact",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ArchitectureImpactDe",
                table: "Projects");
        }
    }
}
