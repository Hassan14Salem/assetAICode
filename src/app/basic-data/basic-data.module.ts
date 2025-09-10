import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDataRoutingModule } from './basic-data-routing.module';
import { ClassificationsComponent } from './classifications/classifications.component';
import { CountriesComponent } from './countries/countries.component';
import { RegionsComponent } from './regions/regions.component';
import { CitiesComponent } from './cities/cities.component';
import { AssetTypesComponent } from './asset-types/asset-types.component';
import { AssetStatusesComponent } from './asset-statuses/asset-statuses.component';


import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    ClassificationsComponent,
    CountriesComponent,
    RegionsComponent,
    CitiesComponent,
    AssetTypesComponent,
    AssetStatusesComponent
  ],
  imports: [
    CommonModule,
    BasicDataRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    MultiSelectModule,
    ToastModule,
    TooltipModule,
    ProgressBarModule,
    CardModule,
    TabViewModule,
    FileUploadModule,
    ToolbarModule,
    ConfirmDialogModule,
  FormsModule,
  ConfirmPopupModule,
  ],
  providers: [ConfirmationService, MessageService]
})
export class BasicDataModule {}
