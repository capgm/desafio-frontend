import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoViewComponent } from './processo-view.component';

describe('ProcessoViewComponent', () => {
  let component: ProcessoViewComponent;
  let fixture: ComponentFixture<ProcessoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
