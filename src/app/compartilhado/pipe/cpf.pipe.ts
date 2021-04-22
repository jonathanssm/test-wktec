import { Pipe, PipeTransform } from '@angular/core';

/*
* Ira exibir o CPF somente numero com a mascara

* Como usar:
*   valor | cpf
*
* Exemplo:
*   {{ '28142484056' | cpf }}
*   resultado: 281.424.840-56
*/
@Pipe({ name: 'cpf' })
export class CpfPipe implements PipeTransform {

  transform(cpf: string): string {

    if (cpf.length != 11) {
      throw new Error(`O pipe de cpf deve receber um valor com 11 dígitos. O valor informado, [ ${cpf} ], contém ${cpf.length} dígitos.`);
    }

    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
  }
}
