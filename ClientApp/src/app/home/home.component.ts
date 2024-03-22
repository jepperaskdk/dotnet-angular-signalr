import * as signalR from "@microsoft/signalr"
import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    private hubConnection: signalR.HubConnection

    constructor() {
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
