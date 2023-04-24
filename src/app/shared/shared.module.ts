import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardComponent } from './components/card/card.component';

const SHARED_IMPORTS = [
  CommonModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
];

@NgModule({
  declarations: [SpinnerComponent, CardComponent],
  imports: [SHARED_IMPORTS],
  exports: [SHARED_IMPORTS, SpinnerComponent, CardComponent],
})
export class SharedModule {}
