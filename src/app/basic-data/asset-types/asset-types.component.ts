import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

interface AssetType {
  nameAr: string;
  nameEn: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-asset-types',
  templateUrl: './asset-types.component.html',
  styleUrls: ['./asset-types.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AssetTypesComponent {
  items: AssetType[] = [];
  displayDialog = false;
  dialogTitle = 'Add Asset Type';
  isEdit = false;
  currentIndex: number | null = null;
  form: AssetType = { nameAr: '', nameEn: '', description: '', status: 'Active' };
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
      nameAr: `نوع أصل ${i + 1}`,
      nameEn: `Asset Type ${i + 1}`,
      description: `Description for asset type ${i + 1}`,
      status: i % 2 === 0 ? 'Active' : 'Inactive'
    }));
  }

  openAddDialog() {
    this.dialogTitle = 'Add Asset Type';
    this.isEdit = false;
    this.form = { nameAr: '', nameEn: '', description: '', status: 'Active' };
    this.displayDialog = true;
    this.currentIndex = null;
  }

  openEditDialog(index: number) {
    this.dialogTitle = 'Edit Asset Type';
    this.isEdit = true;
    this.currentIndex = index;
    this.form = { ...this.items[index] };
    this.displayDialog = true;
  }

  saveDialog() {
    if (this.isEdit && this.currentIndex !== null) {
      this.items[this.currentIndex] = { ...this.form };
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Asset type updated successfully' });
    } else {
      this.items.unshift({ ...this.form });
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Asset type added successfully' });
    }
    this.displayDialog = false;
  }

  confirmDelete(event: Event, index: number) {
    this.confirmationService.confirm({
      target: event.target as HTMLElement,
      message: 'Are you sure you want to delete this asset type?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.items.splice(index, 1);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Asset type deleted successfully' });
      }
    });
  }
}
