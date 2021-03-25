import { Component, OnInit } from '@angular/core';

/**
 * The loading spinner component that is displayed while data is being loaded in to the page.
 */
@Component({
  selector: 'web-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  ngOnInit(): void { }
}
