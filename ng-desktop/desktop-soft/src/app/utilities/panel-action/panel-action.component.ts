import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panel-action',
  templateUrl: './panel-action.component.html',
  styleUrls: ['./panel-action.component.scss']
})
export class PanelActionComponent implements OnInit {

  //Declaration Input

  //Declaration Output
  @Output() onSave        = new EventEmitter();
  @Output() onAdd         = new EventEmitter();
  @Output() onEdit        = new EventEmitter();
  @Output() onDelete      = new EventEmitter();
  @Output() onSearch      = new EventEmitter();
  @Output() onPrint       = new EventEmitter();

  @Input() getData : any  = [];
  @Input() type: string   = '';

  constructor() { }

  ngOnInit(): void {
  }

  printPreview(e: any){
    console.log("@data: ", this.getData);
  }

  //Save Handler
  addClick(){
    console.log("@User onAdd handler...");
    this.onAdd.emit();
  }

  //Save Handler
  editClick(){
    console.log("@User onEdit handler...");
    this.onEdit.emit('');
  }

  //Save Handler
  saveClick(){
    console.log("@User onSave handler...");
    this.onSave.emit('');
  }
  //Save Handler
  deleteClick(){
    console.log("@User onDelete handler...");
    this.onDelete.emit('');
  }

  //Save Handler
  searchClick(){
    console.log("@User onSearch handler...");
    this.onSearch.emit('');
  }

  //Save Handler
  printClick(){
    console.log("@User onPrint handler...");
    this.onPrint.emit('');
  }

}
