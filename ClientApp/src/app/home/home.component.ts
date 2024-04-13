import * as signalR from "@microsoft/signalr"
import { Component, inject } from '@angular/core';
import { WeatherForecast, WeatherForecastClient } from "src/services/generated/server.api";
import { tap } from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    private client = inject(WeatherForecastClient);
    private hubConnection: signalR.HubConnection;

    constructor() {
        this.client.get()
            .pipe(tap((r: WeatherForecast[]) => console.log(r)))
            .subscribe();
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5000/hubs/game')
            .build();
        this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started');

                let i = 0;
                const loop = () => {
                    setTimeout(() => {
                        console.log(`Sending value: ${i}`)
                        this.hubConnection.send("BackendMethod", "Hello", i);
                        i++;
                        loop();
                    }, 1000);
                };
                loop();
            })
            .catch(err => console.log('Error while starting connection: ' + err));

        this.hubConnection.on("MessageFromBackend", (data) => console.log(`Received from backend: ${JSON.stringify(data)}`));
    }
}
