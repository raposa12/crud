import { Component, OnInit, ViewChild } from '@angular/core';//tudo importado
import { ElemetDialogComponent } from 'src/app/shared/elemet-dialog/elemet-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
export interface PeriodicElement {//importado
  
  //variaves a ser prenchidas abaixo
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

//tabela com os elementos já criado
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //chamando de cima
  @ViewChild(MatTable)//pegando component dentro do componente
  table!: MatTable<any>;
  //culuna com os nomes dos elementos
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = ELEMENT_DATA;


  //consttruçao dos elementos
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  //pra criar os  elementos
  openDialog(element: PeriodicElement | null): void{
      const dialogRef = this.dialog.open(ElemetDialogComponent, {
        width: '250px',
        data: element === null ? {//se o elemento for null passa o elemento se nao o propio
          position: null,
          name: '',
          weight: null,
          symbol: '',
        }: {//forma para não editar automaticamente enquanto estiver digitando
          position: element.position,
          name: element.name,
          weight: element.weight,
          symbol: element.symbol,
        }
      });
  
        //forma para criar e editar elementos
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined){
          if (this.dataSource.map(p => p.position).includes(result.position)) {
            this.dataSource[result.position - 1 ] = result;
            this.table.renderRows();
          } else {
            this.dataSource.push(result);
            this.table.renderRows();
          }
        }
     });
  }

  //funçao para editar os elementos praticamente ele ta utlizando os metodods de criar -
  //elementos
  editElement(element: PeriodicElement): void{
    this.openDialog(element);
  }

  //funçao para deletar elementos
  deleteElement(position: number): void{
    this.dataSource = this.dataSource.filter(p => p.position !== position);
  }
}
