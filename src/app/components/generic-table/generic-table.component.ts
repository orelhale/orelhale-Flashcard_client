import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent {

  @Input() tableData: Array<any>;
  @Input() tableTemplate?: Array<any>;
  @Output() clickGenericTable= new EventEmitter();;

  ngOnInit(){
    // console.log('tableTemplate== ',this.tableTemplate);
    // console.log('tableTemplate== ',this.tableData);

  }
  objectKeys(obj?: Object) {
    
    if (obj) {
      // console.log("Object.keys(obj) == ",Object.keys(obj));
      return Object.keys(obj)
    }
    return []
  }


  copyObj: any = (obj: Object) => {
    let result = JSON.parse(JSON.stringify(obj))
    return result
  }

  onClick(data:any){
    if(this.clickGenericTable){
      this.clickGenericTable.emit(data)
    }
  }
  stop(e:Event){
    e.stopPropagation()
  }
}
