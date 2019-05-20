import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(
      private toastController: ToastController
  ) { }

  public prompt = async (message: string) => {
    const toast = await this.toastController.create({
      header: "NOTIFICATION",
      message: message,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        }
      ],
      duration: 2500
    });
    toast.present();
  }
}
