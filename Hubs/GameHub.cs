using Microsoft.AspNetCore.SignalR;

namespace DotnetAngularSignalr.Hubs;

public class GameHub : Hub
{
    public async Task BackendMethod(string parameter1, int parameter2)
    {
        Console.WriteLine($"Message received on backend. Payload: {parameter1}, {parameter2}");
        await Task.CompletedTask;

        await Clients.All.SendAsync("MessageFromBackend", new { Message = "Hello back!", Value = parameter2 });
    }
}