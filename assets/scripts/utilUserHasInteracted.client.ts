let newVariable: any;
newVariable = window.navigator;

export function checkIfUserHasInteracted() {
  if (newVariable.userActivation.hasBeenActive) {
    console.log("user has interacted");
  }
}
