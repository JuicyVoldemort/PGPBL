// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

@NgModule({
  declarations: [PickupCallCardComponent, ErrorMessageComponent ],
  imports: [CommonModule, IonicModule], // added ionic module to fix element cant used
  exports: [PickupCallCardComponent, ErrorMessageComponent] // Export it so it can be used in other modules
})
export class SharedModule {}


// shared module disini digunakan untuk mengatasi error dari penggunaan component berulang
// shared module memusatkan export di satu module sehingga dapat dipanggil di module lain
// menjadi solusi alternatif dari apa yang ditunjukkan pada video tutorial nomor playlist 23

