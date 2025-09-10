import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.css']
})
export class AssetsListComponent implements OnInit {
  assets: any[] = [];
  deleteIndex: number | null = null;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadAssets();
  }

  loadAssets() {
    this.assets = JSON.parse(localStorage.getItem('assets') || '[]');
  }

  onEdit(asset: any, idx: number) {
    this.router.navigate(['/assets/edit', idx]);
  }

  onView(asset: any, idx: number) {
    this.router.navigate(['/assets/view', idx]);
  }

  onDelete(idx: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this asset?',
      accept: () => {
        this.assets.splice(idx, 1);
        localStorage.setItem('assets', JSON.stringify(this.assets));
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Asset deleted successfully!' });
      }
    });
  }
}
