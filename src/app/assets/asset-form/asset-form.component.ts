import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.css']
})
export class AssetFormComponent implements OnInit {
  // Section toggles
  BasicInfoSection = true;
  AcquisitionInfoSection = false;
  AccountingInfoSection = false;
  ValuationInfoSection = false;
  AttachmentInfoSection = false;



  // Asset model
  asset: any = {};
  assetId: number = 0;
  editMode = false;
  viewOnly = false;

  // Dropdown data (should be loaded from service in real app)
  assetTypes: any[] = [];
  assetStatus: any[] = [];
  filteredAssetIsCompleted = [
    { isCompleted: true, nameEn: 'Completed', nameAr: 'مكتمل' },
    { isCompleted: false, nameEn: 'Not Completed', nameAr: 'غير مكتمل' }
  ];
  companyUsers: any[] = [];
  treeClassifications: any[] = [];
  companies: any[] = [];
  departments: any[] = [];
  locations: any[] = [];
  acquisitionMethods: any[] = [];
  valuationMethods: any[] = [];
  attachments: any[] = [];
  countries: any[] = [];
  regions: any[] = [];
  cities: any[] = [];

  // Previews for images
  assetPreview: string | null = null;
  tagPreview: string | null = null;
  otherPreview: string | null = null;

  // Form groups
  basicInfoForm!: FormGroup;
  acquisitionInfoForm!: FormGroup;
  accountingInfoForm!: FormGroup;
  valuationInfoForm!: FormGroup;
  departmentForm!: FormGroup;
  locationForm!: FormGroup;

  // RTL support
  enableRtl = false;

  // Form submit flags
  isSubmitbasicInfoForm = false;
  isSubmitacquisitionInfoForm = false;
  isSubmitaccoumtinginfoForm = false;
  isSubmitvaluationInfoForm = false;
  isSubmitDepartmentForm = false;
  isSubmitLocationForm = false;

  // Classification selection
  selectedClassification: any = null;
  // Department modal
  department: any = {};
  depNameArOver = false;
  depNameEnOver = false;

  // Location modal
  location: any = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    // Constructor should not contain ngOnInit or initialization logic
  }

  onSave() {
    if (this.basicInfoForm.invalid) return;
    const asset = this.basicInfoForm.value;
    let assets = JSON.parse(localStorage.getItem('assets') || '[]');
    if (this.editMode && typeof this.assetId === 'number' && assets[this.assetId]) {
      assets[this.assetId] = asset;
    } else {
      assets.push(asset);
    }
    localStorage.setItem('assets', JSON.stringify(assets));
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Asset saved successfully!' });
    setTimeout(() => {
      this.router.navigate(['/assets']);
    }, 1000);
  }


  // Navigation between sections
  goToAcquisitionInfo() {
    this.isSubmitbasicInfoForm = true;
    if (this.basicInfoForm.invalid) return;
    this.BasicInfoSection = false;
    this.AcquisitionInfoSection = true;
  }
  backToBasicInfo() {
    this.AcquisitionInfoSection = false;
    this.BasicInfoSection = true;
  }
  goToAccountingInfo() {
    this.isSubmitacquisitionInfoForm = true;
    if (this.acquisitionInfoForm.invalid) return;
    this.AcquisitionInfoSection = false;
    this.AccountingInfoSection = true;
  }
  backToAcquisitionInfo() {
    this.AccountingInfoSection = false;
    this.AcquisitionInfoSection = true;
  }
  goToValuationInfoInfo() {
    this.isSubmitaccoumtinginfoForm = true;
    if (this.accountingInfoForm.invalid) return;
    this.AccountingInfoSection = false;
    this.ValuationInfoSection = true;
  }
  backToAccountingInfo() {
    this.ValuationInfoSection = false;
    this.AccountingInfoSection = true;
  }
  goToAttachmentInfoInfo() {
    this.isSubmitvaluationInfoForm = true;
    if (this.valuationInfoForm.invalid) return;
    this.ValuationInfoSection = false;
    this.AttachmentInfoSection = true;
  }
  backToValuationInfoInfo() {
    this.AttachmentInfoSection = false;
    this.ValuationInfoSection = true;
  }

  // File/image upload handlers
  onAssetImageSelect(event: any) {
    const file = event.files && event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.assetPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  ngOnInit() {
    // Simple mock data for dropdowns (replace with service calls)
    this.assetTypes = [
      { id: 1, name: 'Type 1' },
      { id: 2, name: 'Type 2' }
    ];
    this.assetStatus = [
      { id: 1, name: 'Active' },
      { id: 2, name: 'Inactive' }
    ];
    this.companies = [
      { id: 1, name: 'Company A' },
      { id: 2, name: 'Company B' }
    ];

    // Initialize forms
    this.basicInfoForm = this.fb.group({
      assetName: ['', Validators.required],
      serialNo: [''],
      assetTypeId: [null, Validators.required],
      assetStatusId: [null, Validators.required],
      companyId: [null, Validators.required],
      locationId: [null],
      inspectionDate: ['', Validators.required],
      manufacturer: ['', Validators.required],
      quantity: [null]
    });
    this.acquisitionInfoForm = this.fb.group({
      acquisitionMethodId: [null],
      acquisitionCost: [null],
      acquisitionDate: ['']
    });
    this.accountingInfoForm = this.fb.group({
      accountingGroupCode: [''],
      usefulLife: [null],
      accountingGroupDescription: ['']
    });
    this.valuationInfoForm = this.fb.group({
      valuationMethodId: [null],
      valuationDate: [''],
      openingBalanceDate: [''],
      assetOpeningValue: [null],
      valuationReportReference: ['']
    });
    this.departmentForm = this.fb.group({
      nameAr: ['', Validators.required],
      nameEn: ['', Validators.required]
    });
    this.locationForm = this.fb.group({
      countryId: [null, Validators.required],
      regionId: [null, Validators.required],
      cityId: [null, Validators.required],
      buildingNumber: [null, Validators.required],
      floorNumber: [null, Validators.required],
      roomOfficeNumber: [null, Validators.required],
      latitude: [null],
      longitude: [null]
    });

    // Determine if edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const idx = +id;
      const assets = JSON.parse(localStorage.getItem('assets') || '[]');
      if (assets[idx]) {
        this.basicInfoForm.patchValue(assets[idx]);
        this.assetId = idx;
        this.editMode = true;
      }
    }
    // TODO: Load dropdown data from services
    // TODO: Set viewOnly if needed
  }
    
  }





