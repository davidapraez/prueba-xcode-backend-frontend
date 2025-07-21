import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatBreeds } from './cat-breeds';

describe('CatBreeds', () => {
  let component: CatBreeds;
  let fixture: ComponentFixture<CatBreeds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatBreeds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatBreeds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
