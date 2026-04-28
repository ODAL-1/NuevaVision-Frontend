import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

const animationDelay = 150;

export const fadeInAnimation = trigger("fadeIn", [
  state("void", style({ opacity: 0 })),
  state("*", style({ opacity: 1 })),
  transition("void => *", animate(`${animationDelay}ms ease-out`)),
  transition("* => void", animate(`${animationDelay}ms ease-out`)),
]);
