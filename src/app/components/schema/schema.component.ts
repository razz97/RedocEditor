import { Component, OnInit, Input, Output, ViewChild, QueryList, EventEmitter } from '@angular/core';
import { SchemaType } from '../../model/Schema';
import { Schema } from 'src/app/modelV2/openapi-model/schema.model';

@Component({
  selector: 'schemaform',
  templateUrl: './schema.component.html'
})
export class SchemaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (this.isParam) {
      this.schemaTypes = this.schemaTypesParam;
    }
  }
  private schemaTypesParam: SchemaType[] = ["string", "number", "boolean"];
  public schemaTypes: SchemaType[] = ["string", "array", "object", "number", "boolean"];

  @Input()
  public schema: Schema;
  @Input()
  public isParam: boolean;

  typeChanged() {
    switch (this.schema.type) {
      case "string":
      case "number":
        this.removeNestedSchemas();
        break;
      case "boolean":
        this.removeNestedSchemas();
        break;
      case "object":
        this.removeItems();
        this.schema.properties = [new Schema()];
        break;
      case "array":
        this.removeProperties();
        this.schema.items = new Schema();
        break;
    }
  }

  removeNestedSchemas() {
    this.removeItems();
    this.removeProperties();
  }

  removeProperties() {
    this.schema.properties = undefined;
  }

  removeItems() {
    this.schema.items = undefined;
  }

  addProperty() {
    this.schema.properties.push(new Schema());
  }

  removeProperty(property: Schema) {
    this.schema.properties.splice(this.schema.properties.indexOf(property), 1);
  }


}
