import { makeAutoObservable, runInAction } from "mobx";
import { KitReflow } from "../schema";
import { FetchKitReflowUseCase } from "../use-cases";
import Swal from "sweetalert2";

class KitReflowNumberStore {
  kitReflows: KitReflow[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  init = async () => {
    await this.fetchKitReflow();
  };

  onSearch = async (val: string) => {
    if (val.length == 0) {
      await this.fetchKitReflow();
    } else {
      this.kitReflows = this.kitReflows.filter((item) =>
        item.kitName.includes(val),
      );
    }
  };

  fetchKitReflow = async () => {
    const res = await FetchKitReflowUseCase();
    if (res.success) {
      runInAction(() => {
        this.kitReflows = res.data.items;
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Loading Kit Reflow Error",
        text: res.error,
      });
    }
  };
}

export const kitReflowNumberStore = new KitReflowNumberStore();
