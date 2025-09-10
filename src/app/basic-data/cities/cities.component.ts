import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

interface City {
  nameAr: string;
  nameEn: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CitiesComponent {
  items: City[] = [];
  displayDialog = false;
  dialogTitle = 'Add City';
  isEdit = false;
  currentIndex: number | null = null;
  form: City = { nameAr: '', nameEn: '', description: '', status: 'Active' };
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
      nameAr: `مدينة ${i + 1}`,
      nameEn: `City ${i + 1}`,
      description: `Description for city ${i + 1}`,
      status: i % 2 === 0 ? 'Active' : 'Inactive'
    }));
  }

  openAddDialog() {
    this.dialogTitle = 'Add City';
    this.isEdit = false;
    this.form = { nameAr: '', nameEn: '', description: '', status: 'Active' };
    this.displayDialog = true;
    this.currentIndex = null;
  }

  openEditDialog(index: number) {
    this.dialogTitle = 'Edit City';
    this.isEdit = true;
    this.currentIndex = index;
    this.form = { ...this.items[index] };
    this.displayDialog = true;
  }

  saveDialog() {
    if (this.isEdit && this.currentIndex !== null) {
      this.items[this.currentIndex] = { ...this.form };
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'City updated successfully' });
    } else {
      this.items.unshift({ ...this.form });
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'City added successfully' });
    }
    this.displayDialog = false;
  }

  confirmDelete(event: Event, index: number) {
    this.confirmationService.confirm({
      target: event.target as HTMLElement,
      message: 'Are you sure you want to delete this city?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.items.splice(index, 1);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'City deleted successfully' });
      }
    });
  }
}
