import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Remote } from 'electron';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';
import { AppPath } from 'src/app/modelV2/app-model/AppPath.model';
import { AppOperation } from 'src/app/modelV2/app-model/AppOperation.model';


@Component({
  selector: 'app-editor',
  templateUrl: './path.component.html'
})
export class PathComponent {
  
  constructor(private router: Router, dataService: DataService) {
    this.remote = (<any>window).require('electron').remote;
    dataService.observePath(path => this.path = path)
  }

  @ViewChild('redoc', { static: true }) 
  redoc: ElementRef;

  remote: Remote;

  methods: string[] = ["GET", "POST", "PUT", "DELETE"];

  methodSelected: string = this.methods[0];

  path: AppPath;

  removeOperation(operation: AppOperation) {
    this.path.operations.splice(this.path.operations.indexOf(operation), 1);
    this.methods.push(operation.method);
  }

  addOperation() {
    const method = this.methodSelected.toLowerCase();
    this.methods.splice(this.methods.indexOf(this.methodSelected), 1);
    this.methodSelected = this.methods[0];
    this.path.operations.push(new AppOperation(method));
  }

  back() {
    this.router.navigateByUrl('root');
  }

}
