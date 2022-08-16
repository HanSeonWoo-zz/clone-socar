import { action, computed, configure, makeObservable, observable, toJS } from 'mobx';

import { History } from '../components/types';
import { DEFAULT_HISTORY_DATA } from './../components/data';

configure({
  enforceActions: 'never',
  // computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  // observableRequiresReaction: true,
  // disableErrorBoundaries: true,
});

export class MainStore {
  histories: History[] = [];
  constructor() {
    makeObservable(this, {
      histories: observable,
      initializeHistory: action,
      addHistory: action,
      getRecentReservation: computed,
    });
    this.initializeApp();
  }
  initializeApp = async () => {
    this.initializeHistory();
  };
  initializeHistory = async () => {
    this.histories = DEFAULT_HISTORY_DATA;
    console.log('🚀 ~ file: mainStore.ts ~ line 27 ~ MainStore ~ initializeHistory= ~ DEFAULT_HISTORY_DATA', DEFAULT_HISTORY_DATA);
  };
  addHistory = async (newHistory: History) => {
    if (newHistory) {
      const newId = this.histories?.length + 1;
      this.histories = [...this.histories, { id: newId, ...newHistory }];
      return newId;
    }
  };
  cancelReservation = async (id: number) => {
    const index = this.histories.findIndex((i) => i.id === id);
    if (index === -1) return;
    this.histories[index].state = '예약취소';
  };

  get getRecentReservation() {
    const reserved = [...this.histories?.filter((i) => i.state === '예약완료')];
    const res = reserved.sort((a, b) => {
      const aDate = new Date(a.dateStart);
      const bDate = new Date(b.dateStart);
      return aDate > bDate ? 1 : -1;
    });
    return res[0];
  }
}
