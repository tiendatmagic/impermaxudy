import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-modal',
  standalone: false,
  templateUrl: './welcome-modal.component.html',
  styleUrl: './welcome-modal.component.scss'
})
export class WelcomeModalComponent {
  datas: any = [];
  constructor(public dialogRef: MatDialogRef<WelcomeModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.datas = this.data;
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
