import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelActionComponent } from './panel-action.component';

describe('PanelActionComponent', () => {
  let component: PanelActionComponent;
  let fixture: ComponentFixture<PanelActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
