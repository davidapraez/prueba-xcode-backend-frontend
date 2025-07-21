import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatsService } from '../../services/cats.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cat-breeds',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './cat-breeds.html',
  styleUrl: './cat-breeds.css',
})
export class CatBreedsComponent {
  breeds = signal<any[]>([]);
  selected = signal<any | null>(null);
  pictures = signal<any[]>([]);
  current = signal(0);
  loading = signal(false);

  constructor(private cats: CatsService) {
    this.cats.listBreeds().subscribe((b) => this.breeds.set(b));
  }

  onSelect(id: string) {
    const breed = this.breeds().find((b) => b.id === id);
    this.selected.set(breed);
    this.loading.set(true);
    this.cats.imagesByBreed(id).subscribe({
      next: (imgs) => this.pictures.set(imgs),
      complete: () => {
        this.current.set(0);
        this.loading.set(false);
      },
    });
  }

  prev() {
    this.current.set(
      (this.current() - 1 + this.pictures().length) % this.pictures().length
    );
  }

  next() {
    this.current.set((this.current() + 1) % this.pictures().length);
  }
}
