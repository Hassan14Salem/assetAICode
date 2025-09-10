import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AssetFormComponent } from './asset-form/asset-form.component';
import { AssetViewComponent } from './asset-view/asset-view.component';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', component: AssetsListComponent },
  { path: 'add', component: AssetFormComponent },
  { path: 'edit/:id', component: AssetFormComponent },
  { path: 'view/:id', component: AssetViewComponent }
];

@NgModule({
  declarations: [
    AssetsListComponent,
    AssetFormComponent,
    AssetViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    ConfirmPopupModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    MultiSelectModule,
    TooltipModule,
    ProgressBarModule,
    CardModule,
    TabViewModule,
    FileUploadModule,
    ToolbarModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ]
})
export class AssetsModule { }
