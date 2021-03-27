import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

/**
 * The directive allows for components to "appear" into view, allowing for the
 * triggering of specific animations.
 */
@Directive({
    selector: '[appear]'
})
export class AppearDirective implements AfterViewInit, OnDestroy {
    @Output() appear: EventEmitter<void> = new EventEmitter<void>();

    elementPos: number = -1;
    elementHeight: number = -1;

    scrollPos: number = -1;
    windowHeight: number = -1;

    subscriptionScroll: Subscription = new Subscription();
    subscriptionResize: Subscription = new Subscription();

    constructor(private element: ElementRef) { }

    ngAfterViewInit(): void {
        this.subscribe();
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

    /**
     * Checks for visibility emitting the `appear` event if element is visible.
     * @internal
     */
    private checkVisibility(): void {
        if(this.isElementVisible()) {
            this.updateDimensions();

            if(this.isElementVisible()) {
                this.unsubscribe();
                this.appear.emit();
            }
        }
    }

    /**
     * Checks the scroll position of an element to determine if the element is visible.
     * @returns A boolean value that is true if the element is visible.
     * @internal
     */
    isElementVisible(): boolean {
        return this.scrollPos >= this.elementPos || (this.scrollPos + this.windowHeight) >= (this.elementPos + this.elementHeight);
    }

    /**
     * Updates the scroll position.
     */
    private updateScrollPos(): void {
        this.scrollPos = window.scrollY;
    }

    /**
     * Updates the dimensions, namely the window height and element position and height.
     * @internal
     */
    private updateDimensions(): void {
        this.windowHeight = window.innerHeight;

        this.elementPos = this.calculateOffsetTop(this.element.nativeElement);
        this.elementHeight = this.element.nativeElement.offsetHeight;
    }

    /**
     * Calculates the offset top of an HTML element.
     * @param element The native element of an `ElementRef` object.
     * @returns A number representing the calculated offset top (including parent elements).
     * @internal
     */
    private calculateOffsetTop(element: any): number {
        let offsetTop = element.offsetTop || 0;

        if(element.offsetParent)
            offsetTop += this.calculateOffsetTop(element.offsetParent);

        return offsetTop;
    }

    /**
     * Subscribes to the scroll and resize events handling element visibility.
     * @internal
     */
    private subscribe(): void {
        this.subscriptionScroll = fromEvent(window, 'scroll').pipe(startWith(null))
            .subscribe(() => {
                this.updateScrollPos();
                this.checkVisibility();
            });
        
        this.subscriptionResize = fromEvent(window, 'resize').pipe(startWith(null))
            .subscribe(() => {
                this.updateDimensions();
                this.checkVisibility();
            });
    }

    /**
     * Unsubscribes from the scroll and resize events.
     * @internal
     */
    private unsubscribe(): void {
        if(this.subscriptionScroll) {
            this.subscriptionScroll.unsubscribe();
        }
        
        if(this.subscriptionResize) {
            this.subscriptionResize.unsubscribe();
        }
    }
}
