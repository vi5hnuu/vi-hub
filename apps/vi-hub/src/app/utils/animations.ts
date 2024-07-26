import {animate, keyframes, style, transition, trigger,} from '@angular/animations';

export const widthFillAnimation = trigger('widthFill', [
  transition(
    ':enter',
    [
      animate(
        '{{ duration }} ease-out',
        keyframes([
          style({
            clientWidth: 0,
            width: '0%',
            maxWidth: 0,
            opacity: '{{ initialOpacity }}',
            padding: 0,
          }),
          style({
            clientWidth: '*',
            width: '*',
            maxWidth: '*',
            opacity: 1,
            padding: '*',
          }),
        ])
      ),
    ],
    {params: {duration: '100ms', initialOpacity: '0'}}
  ),
  transition(
    ':leave',
    [
      style({
        clientWidth: '*',
        width: '*',
        opacity: 1,
        padding: '*',
        margin: '*',
      }), // Initial width
      animate(
        '{{ duration }} ease-out',
        keyframes([
          style({
            clientWidth: '*',
            width: '*',
            opacity: 1,
            padding: '*',
            margin: '*',
          }),
          style({
            clientWidth: 0,
            width: 0,
            opacity: 0,
            padding: 0,
            margin: 0,
          }),
        ])
      ),
    ],
    {params: {duration: '100ms'}}
  ),
]);

export const heightFadeAnimation = trigger('heightFade', [
  transition(':enter', [
    style({height: 0, opacity: 0}),
    animate(
      '200ms ease-out',
      keyframes([
        style({height: 0, opacity: 0}),
        style({height: '*', opacity: 1}),
      ])
    ),
  ]),
  transition(':leave', [
    style({height: '*', opacity: 1}),
    animate(
      '200ms ease-out',
      keyframes([
        style({height: '*', opacity: 1, padding: '*', margin: '*'}),
        style({height: 0, opacity: 0, padding: 0, margin: 0}),
      ])
    ),
  ]),
]);
