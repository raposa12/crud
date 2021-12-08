import { PeriodicElement } from './../../views/home/home.component';
import {Component, Inject,  OnInit} from '@angular/core';//tudo importado
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-elemet-dialog',
  templateUrl: './elemet-dialog.component.html',
  styleUrls: ['./elemet-dialog.component.scss']
})
export class ElemetDialogComponent implements OnInit {
  element!: PeriodicElement;//variavel de elememto a ser prenchida - criar
  isChange!: boolean;//varivael para editar elementos

  constructor(
    @Inject(MAT_DIALOG_DATA) 
      public data:  PeriodicElement,
      public dialogRef: MatDialogRef<ElemetDialogComponent>,
      
    ) {}

  //metodo para editar elementos
  ngOnInit(): void {
    if (this.data != null){
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  //metodo para cancelar elemento
  onCancel(): void {
    this.dialogRef.close();
  }

}
