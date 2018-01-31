// Import our dependencies
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatGridListModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDialogModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSidenavModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSidenavModule
  ]
})
export class AngMaterialModule {}
