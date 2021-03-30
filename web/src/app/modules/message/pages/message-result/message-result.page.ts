import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * The page component for displaying the result of a message broadcast.
 */
@Component({
    selector: 'web-message-result-page',
    templateUrl: './message-result.page.html',
    styleUrls: ['./message-result.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageResultPage implements OnInit {
    constructor(private readonly title: Title) { }

    ngOnInit(): void {
        this.title.setTitle(`IOTA Message Result | HelloTangle`);
    }
}
