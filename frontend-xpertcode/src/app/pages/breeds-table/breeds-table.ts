import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatsService } from '../../services/cats.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-breeds-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './breeds-table.html',
  styleUrl: './breeds-table.css',
})
export class BreedsTableComponent {
  breeds = signal<any[]>([]);
  query = signal('');
  loading = signal(false);

  filtered = computed(() =>
    this.breeds().filter((b) =>
      b.name.toLowerCase().includes(this.query().toLowerCase())
    )
  );

  displayedColumns = ['name', 'origin', 'life_span', 'temperament'];

  constructor(private cats: CatsService) {
    this.loading.set(true);
    this.cats.listBreeds().subscribe({
      next: (b) => this.breeds.set(b),
      complete: () => this.loading.set(false),
    });
  }
}
