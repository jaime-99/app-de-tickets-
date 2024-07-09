import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'changeBoolean',
    standalone: true

})

export class changeBoolean implements PipeTransform {
    transform(value: number): any {
        const value1 = ''
        if(value===0){
            return 'No'
        }else{
            return 'Si'
        }
    }
}