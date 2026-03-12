# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy the solution file and project files
COPY Portfolio.sln ./
COPY Portfolio.API/Portfolio.API.csproj ./Portfolio.API/

# Restore dependencies
RUN dotnet restore

# Copy the remaining source code
COPY . .

# Build and publish the app
WORKDIR /app/Portfolio.API
RUN dotnet publish -c Release -o /out

# Use the official .NET runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /out .

# Expose the port the app runs on
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Start the application
ENTRYPOINT ["dotnet", "Portfolio.API.dll"]
