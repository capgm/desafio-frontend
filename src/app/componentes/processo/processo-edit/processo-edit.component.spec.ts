import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoEditComponent } from './processo-edit.component';

describe('ProcessoEditComponent', () => {
  let component: ProcessoEditComponent;
  let fixture: ComponentFixture<ProcessoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
