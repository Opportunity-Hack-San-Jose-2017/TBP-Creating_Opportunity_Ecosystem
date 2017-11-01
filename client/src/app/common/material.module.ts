import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule } from '@angular/material';
import 'hammerjs';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialModule {}