import { Pipe, PipeTransform } from '@angular/core';

/*
* Ira exibir o CNPJ somente numero com a mascara

* Como usar:
*   valor | cnpj
*
* Exemplo:
*   {{ '24418030000180' | cnpj }}
*   resultado: 24.418.030/0001-80
*/
@Pipe({ name: 'cnpj' })
export class CnpjPipe implements PipeTransform {

  transform(cnpj: string): string {

    if (cnpj.length !== 14) {
      throw new Error(`O pipe de cnpj deve receber um valor de 14 dígitos. O valor informado, [ ${cnpj} ], contém ${cnpj.length} dígitos.`);
    }

    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
  }
}
