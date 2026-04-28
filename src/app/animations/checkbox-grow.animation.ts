import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

const animationDelay = 250;

export const checkboxGrowAnimation = trigger("checkbox-grow", [
  state(
    "false",
    style({
      opacity: 0,
      transform: "translate(-50%, -50%) scale(0)",
    })
  ),
  state(
    "true",
    style({
      opacity: 1,
      transform: "translate(-50%, -50%) scale(1)",
    })
  ),
  transition("false <=> true", [animate(`${animationDelay}ms ease-in-out`)]),
]);
