import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
declare var require: any;

const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.scss']
})
export class PrintPreviewComponent implements OnInit {
  closeResult: string = '';
  //Declaration Output
  @Output() onPreview      = new EventEmitter();
  @Input() printData : any = [];
  @Input() printType : string = ''; 

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public downloadAsPDF() {
    let pdfTable: any = document.getElementById('pdfTable')?.innerHTML;
    var htmlContent = htmlToPdfmake(pdfTable);
    console.log(pdfTable, " :: ", htmlContent)
    const documentDefinition = { content: htmlContent };
    pdfMake.createPdf(documentDefinition).download();     
  }

  previewClick(e: any){
    this.onPreview.emit('');
    setTimeout(() => {
      this.open(e);
    },1000)
  }

  // Open Modal
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
