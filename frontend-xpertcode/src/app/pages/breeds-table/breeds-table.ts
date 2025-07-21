import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatsService } from '../../services/cats.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-breeds-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './breeds-table.html',
  styleUrl: './breeds-table.css',
})
export class BreedsTableComponent implements AfterViewInit {
  displayedColumns = ['name', 'origin', 'life_span', 'temperament'];
  dataSource = new MatTableDataSource<any>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cats: CatsService) {
    this.cats.listBreeds().subscribe({
      next: (b) => (this.dataSource.data = b),
      complete: () => (this.loading = false),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
