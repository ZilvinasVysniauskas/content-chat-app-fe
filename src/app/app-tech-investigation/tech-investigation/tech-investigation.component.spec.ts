import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechInvestigationComponent } from './tech-investigation.component';

describe('TechInvestigationComponent', () => {
  let component: TechInvestigationComponent;
  let fixture: ComponentFixture<TechInvestigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TechInvestigationComponent]
    });
    fixture = TestBed.createComponent(TechInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
