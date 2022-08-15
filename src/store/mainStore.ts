import { configure, makeObservable } from 'mobx';

configure({
  enforceActions: 'never',
  // computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  // observableRequiresReaction: true,
  // disableErrorBoundaries: true,
});

export class MainStore {
  constructor() {
    makeObservable(this, {});
    this.initializeApp();
  }
  initializeApp = async () => {};
}

export const store = new MainStore();
