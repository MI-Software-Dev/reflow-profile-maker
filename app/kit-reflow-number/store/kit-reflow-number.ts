import { makeAutoObservable } from "mobx";

class KitReflowNumberStore{
  constructor() {
    makeAutoObservable(this)
  }
}

export const kitReflowNumberStore = new KitReflowNumberStore()