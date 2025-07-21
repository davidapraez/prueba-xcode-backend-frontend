import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedsTable } from './breeds-table';

describe('BreedsTable', () => {
  let component: BreedsTable;
  let fixture: ComponentFixture<BreedsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
