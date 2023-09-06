import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { myValidator } from './myValidator.validator';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent {
  test = false;
  // test = true;

  obj = [{ value: "Courss 1", key: 1 }, { value: "Courss 2", key: 2 }, { value: "Courss 3", key: 3 }]

  log(a: any) {console.log(a);}

  form3 = new FormGroup({
    list: new FormArray([new FormControl('ddfsf')])
  })

  list = (this.form3.get('list') as FormArray)

  addInput(input: HTMLInputElement){
    this.list.controls.push(new FormControl(input.value))
    input.value = ''
  }
  form2 = new FormGroup({
    name: new FormControl("", [myValidator.myRequired]),
    age: new FormControl("", [myValidator.myRequired, myValidator.myPattern])
  })

  get name2() {
    return this.form2.get('name')
  }
  accessFrom2 = {
    name: this.form2.get('name') as FormControl,
    age: this.form2.get('age') as FormControl,
  }



}
