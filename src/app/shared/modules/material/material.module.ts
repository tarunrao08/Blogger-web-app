import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOptionModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';

const MATERIAL_MODULES = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatToolbarModule,
  MatChipsModule,
  MatSnackBarModule,
  MatOptionModule,
  MatBadgeModule,
  MatPaginatorModule,
  MatMenuModule,
  MatGridListModule,
];

@NgModule({
  declarations: [],
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES,
})
export class MaterialModule {}
