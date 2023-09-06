import { AbstractControl, ValidationErrors } from '@angular/forms';


export class myValidator {
   static myRequired(control: AbstractControl): ValidationErrors | null {
      if (!control.value) {
         return { myRequired: true }
      }
      return null
   }
   static myPattern(control: AbstractControl): ValidationErrors | null {
      let pattern = /[0-9]/g;
      if (control.value && (control.value as string).search(pattern)< 0) {
         return { myPattern: true }
      }
      return null
   }
}