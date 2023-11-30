import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContextMenuComponent } from "./context-menu.component";

describe("ContextMenuComponent", () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextMenuComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{  useValue: {} }],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ContextMenu Component', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
    it('should emit Edit', () => {
      const idSend="TRJ-0204";
      let id="";
      component.id=idSend;
      component.edit.subscribe(data=>(id=data));
      component.editEvent();
      expect(id).toEqual(idSend);
    });  });
    it('should delete Edit', () => {
      const idSend="TRJ-0204";
      let id="";
      component.id=idSend;
      component.delete.subscribe(data=>(id=data));
      component.deleteEvent();
      expect(id).toEqual(idSend);
    }); 

})