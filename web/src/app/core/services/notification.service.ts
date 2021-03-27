import { Injectable, NgZone } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The actions available for `SnackBar` notifications.
 */
export type SnackBarAction = 'Email' | '';

/**
 * The service for creating `SnackBar` notification pop-ups.
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(
        private readonly snackBar: MatSnackBar,
        private zone: NgZone
    ) { }

    /**
     * Creates a `SnackBar` notification to immediate display to the screen.
     * @param message The message to display in the notification.
     * @param action The (optional) action to perform.
     * @param duration The duration that the notification will exist.
     */
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
