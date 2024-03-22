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

var app = builder.Build();
app.UseCors("CorsPolicy");
app.UseStaticFiles();
app.UseRouting();
app.MapHub<GameHub>("/hubs/game");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
