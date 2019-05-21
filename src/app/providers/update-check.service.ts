import {EventEmitter, Injectable} from '@angular/core';
import {ConfigStorageService} from "./config-storage.service";
import {AuthService} from "./auth.service";

import * as io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class UpdateCheckService {

    public updateEmitter: EventEmitter<void>;
    private ioSocket;

    constructor(
        private configStorageService: ConfigStorageService,
        private authService: AuthService
    ) {
        this.updateEmitter = new EventEmitter();
    }

    public disconnect = (): void => {
        if (this.ioSocket) {
            this.ioSocket.disconnect();
        }
    };

    public loadSocket = (): void => {
        this.disconnect();

        this.ioSocket = io(this.configStorageService.getSettigns().socketEndpoint + 'liveupdate', {
            path: '/s/'
        });

        this.ioSocket.on("connect", () => {
            this.ioSocket.emit('authenticate', {
                token: this.authService.cachedAuthResponse.token
            }).on('authenticated', () => {
                console.log("Live update socket connected");
                this.ioSocket.on("update", this.handleUpdate);
                this.ioSocket.on("disconnect", () => {
                    this.ioSocket.removeAllListeners();
                })
            });
        })
    };

    private handleUpdate = () => {
        console.log("Got update!");
        this.updateEmitter.emit();
    }
}
