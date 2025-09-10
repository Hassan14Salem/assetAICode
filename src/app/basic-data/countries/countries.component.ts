import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Country {
  nameAr: string;
  nameEn: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CountriesComponent {
  items: Country[] = [];
  displayDialog = false;
  dialogTitle = 'Add Country';
  isEdit = false;
  currentIndex: number | null = null;
  form: Country = { nameAr: '', nameEn: '', description: '', status: 'Active' };
  @ViewChild('deletePopup') deletePopup: any;
  deleteIndex: number | null = null;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.seedItems();
  }

  seedItems() {
    this.items = Array.from({ length: 20 }, (_, i) => ({
      nameAr: `دولة ${i + 1}`,
      nameEn: `Country ${i + 1}`,
      description: `Description for country ${i + 1}`,
      status: i % 2 === 0 ? 'Active' : 'Inactive'
    }));
  }

  openAddDialog() {
    this.dialogTitle = 'Add Country';
    this.isEdit = false;
    this.form = { nameAr: '', nameEn: '', description: '', status: 'Active' };
    this.displayDialog = true;
    this.currentIndex = null;
  }

  openEditDialog(index: number) {
    this.dialogTitle = 'Edit Country';
    this.isEdit = true;
    this.currentIndex = index;
    this.form = { ...this.items[index] };
    this.displayDialog = true;
  }

  saveDialog() {
    if (this.isEdit && this.currentIndex !== null) {
      this.items[this.currentIndex] = { ...this.form };
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Country updated successfully' });
    } else {
      this.items.unshift({ ...this.form });
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Country added successfully' });
    }
    this.displayDialog = false;
  }

  confirmDelete(event: Event, index: number) {
    this.confirmationService.confirm({
      target: event.target as HTMLElement,
      message: 'Are you sure you want to delete this country?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.items.splice(index, 1);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Country deleted successfully' });
      }
    });
  }
}
