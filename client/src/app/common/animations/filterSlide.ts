import { trigger, state, style, transition, animate } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const filterSlide = trigger('filterSlide',
[
    transition(':enter', [
        style({ transform: 'scaleY(0)' }),
        animate('190ms', style({ transform: 'scaleY(1)', 'transition-timing-function': 'ease-in' }))
    ]),
    transition(':leave', [
        style({ transform: 'scaleY(1)' }),
        animate('100ms', style({ transform: 'scaleY(0)' }))
    ])
])