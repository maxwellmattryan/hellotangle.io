import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
    ngOnInit(): void { }
}
