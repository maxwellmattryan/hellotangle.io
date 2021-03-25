import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'web-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAdmin: boolean = false;

    shouldDisplaySidebar: boolean = false;
    shouldDisplayNavbar: boolean = true;

    private previousPageYOffset: number = 0;

    constructor() { }

    ngOnInit(): void { }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(): void {
        this.checkPageOffset();
    }

    checkPageOffset(): void {
        const minPageYOffset: number = 50;

        this.shouldDisplayNavbar = window.pageYOffset < this.previousPageYOffset || window.pageYOffset < minPageYOffset;
        this.previousPageYOffset = window.pageYOffset;
    }

    toggleSidebar(): void {
        this.shouldDisplaySidebar = !this.shouldDisplaySidebar;
    }
}
