using DotnetAngularSignalr.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder
        .WithOrigins("http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});
builder.Services.AddSignalR();
builder.Services.AddControllersWithViews();
builder.Services.AddOpenApiDocument();

var app = builder.Build();
app.UseCors("CorsPolicy");
app.UseStaticFiles();
app.UseRouting();
app.MapHub<GameHub>("/hubs/game");

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi();
}

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
