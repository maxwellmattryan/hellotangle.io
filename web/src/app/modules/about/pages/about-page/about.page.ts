import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * The page component containing all relevant information about the HelloTangle project.
 */
@Component({
    selector: 'web-about-page',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
    constructor(private readonly title: Title) { }

    ngOnInit(): void {
        this.title.setTitle(`About | HelloTangle`);
    }
}
