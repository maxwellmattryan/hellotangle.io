import { Component, OnInit } from '@angular/core';

/**
 * The footer component containing standard footer text (i.e. name and copyright).
 */
@Component({
    selector: 'web-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    ngOnInit(): void { }
}
