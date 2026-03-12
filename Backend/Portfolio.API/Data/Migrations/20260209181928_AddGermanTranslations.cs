using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddGermanTranslations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DescriptionDe",
                table: "Projects",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "FeaturesDe",
                table: "Projects",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleDe",
                table: "Projects",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<List<string>>(
                name: "DescriptionDe",
                table: "Experiences",
                type: "text[]",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LocationDe",
                table: "Experiences",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PeriodDe",
                table: "Experiences",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoleDe",
                table: "Experiences",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DegreeDe",
                table: "Educations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionDe",
                table: "Educations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InstitutionDe",
                table: "Educations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LocationDe",
                table: "Educations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PeriodDe",
                table: "Educations",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionDe",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "FeaturesDe",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "TitleDe",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "DescriptionDe",
                table: "Experiences");

            migrationBuilder.DropColumn(
                name: "LocationDe",
                table: "Experiences");

            migrationBuilder.DropColumn(
                name: "PeriodDe",
                table: "Experiences");

            migrationBuilder.DropColumn(
                name: "RoleDe",
                table: "Experiences");

            migrationBuilder.DropColumn(
                name: "DegreeDe",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "DescriptionDe",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "InstitutionDe",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "LocationDe",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "PeriodDe",
                table: "Educations");
        }
    }
}
