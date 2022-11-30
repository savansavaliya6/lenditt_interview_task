import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/service/Api-service';
import { first } from 'rxjs/operators';
import { LoaderService } from 'src/service/loader.service';

export interface PeriodicElement {
  name: string;
  id: number;
  country: string;
  website: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading$ = this.loader.isLoading;
  displayedColumns: string[] = ['id', 'name', 'country', 'website'];
  dataSource!: MatTableDataSource<any[]>;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  public ViewTableData = new MatTableDataSource<any>([]);


  constructor(private apiservice: ApiService, public loader: LoaderService) {
    this.ViewTableData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getdata();

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ViewTableData.filter = filterValue.trim().toLowerCase();
  }

  getdata() {
    this.loader.show();
    this.apiservice.getdata()
      .pipe(first())
      .subscribe(res => {
        console.log(res);
        this.loader.hide();
        this.ViewTableData = res;
        console.log(this.ViewTableData);
        const payload = res.map((y: any) => {
          return { ...y };
        });
        this.ViewTableData = new MatTableDataSource(payload || []);
        this.ViewTableData.paginator = this.paginator;
        this.ViewTableData.sort = this.sort;

        console.log(this.ViewTableData);


      },
        error => {

          alert('no data found')
        })
  }
  selectedTabChange(event: any) {
    this.ViewTableData.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
}
