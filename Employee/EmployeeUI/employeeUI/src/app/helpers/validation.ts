import { AbstractControl, FormGroup } from '@angular/forms';

export function numberValidator(el: AbstractControl) {
    if(el.hasError('required')) return null;
  
    if(el.value < 0 || isNaN(el.value)) {
      return {
        symbol: true
      }
    }
  
    return null;
  }

