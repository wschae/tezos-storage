import { TezosToolkit } from "@taquito/taquito";
import $ from "jquery";

export class App {
  private tk: TezosToolkit;

  constructor() {
    this.tk = new TezosToolkit("http://localhost:8732");
  }

  public initUI() {
    $("#show-storage-button").bind("click", () =>
      this.getStorage($("#address-input").val());
    );
  }

  private showError(message: string) {
    $("#storage-output").removeClass().addClass("hide");
    $("#error-message")
      .removeClass()
      .addClass("show")
      .html("Error: " + message);
  }

  private showStorage(balance: number) {
    $("#error-message").removeClass().addClass("hide");
    $("#storage-output").removeClass().addClass("show");
    $("#storage").html(balance);
  }

  private getStorage(address: string) {
    this.tk.contract.at(address)
    .then(contract => contract.storage())
    .then(value => this.showStorage(value.toNumber()));
  }
}
