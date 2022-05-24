import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-loader',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {

  @Input() isLoader: boolean = true;
  
  constructor(private _spinner: NgxSpinnerService) { }

  ngOnInit() {
    this._spinner.hide();
    if(!this.isLoader){
      this._spinner.show();
    }
  }

}
