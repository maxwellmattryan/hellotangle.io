import { Component, OnInit, HostListener } from '@angular/core';

/**
 * The header component containing the logo and navigation links (plus sidebar).
 */
@Component({
    selector: 'web-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public shouldDisplaySidebar: boolean = false;
    public shouldDisplayNavbar: boolean = true;

    private previousPageYOffset: number = 0;

    ngOnInit(): void { }

    /**
     * Check the page offset on user scroll.
     * @internal
     */
    @HostListener('window:scroll', ['$event'])
    private onWindowScroll(): void {
        this.checkPageOffset();
    }

    /**
     * Checks and updates the page offset accordingly.
     * @internal
     */
    private checkPageOffset(): void {
        const minPageYOffset: number = 50;

        this.shouldDisplayNavbar = window.pageYOffset < this.previousPageYOffset || window.pageYOffset < minPageYOffset;
        this.previousPageYOffset = window.pageYOffset;
    }

    /**
     * Toggles the sidebar display.
     */
    public toggleSidebar(): void {
        this.shouldDisplaySidebar = !this.shouldDisplaySidebar;
    }
}
