// Placeholder Program.cs for TravelEase.API
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.MapGet("/", () => "TravelEase API placeholder");
app.Run();
