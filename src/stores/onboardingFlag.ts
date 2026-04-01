/** Simple global flag to signal onboarding completion to _layout.tsx */
let _listeners: Array<() => void> = [];
let _done = false;

export function onboardingDone() {
  _done = true;
  _listeners.forEach((fn) => fn());
}

export function isOnboardingDone() {
  return _done;
}

export function onOnboardingDone(fn: () => void) {
  _listeners.push(fn);
  return () => {
    _listeners = _listeners.filter((f) => f !== fn);
  };
}
