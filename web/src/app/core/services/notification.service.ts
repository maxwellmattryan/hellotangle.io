import { Injectable, NgZone } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

export type SnackBarAction = 'email' | '';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(
        private readonly snackBar: MatSnackBar,
        private zone: NgZone
    ) { }

    public createNotification(message: string, action: SnackBarAction = '', duration: number = 2400): void {
        this.zone.run(() => {
            const ref = this.snackBar.open(message, action, { duration });

            switch(action) {
                default:
                case '':
                    break;
            }
        });
    }
}
