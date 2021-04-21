import { Constante } from 'src/app/compartilhado/constante';

// Terceiros
import SimpleCryptoJS from 'simple-crypto-js';

/*
* Esta classe deve conter somente metodos utilitarios para criptografar e descriptografar
*/
export class AppCriptografiaUtil {
  private constructor() {
    // somente metodos estaticos
  }

  public static criptografar(valor: string): string {
    return new SimpleCryptoJS(Constante.CHAVE_CRIPTOGRAFIA).encrypt(valor);
  }

  public static descriptografar(valor: string): any {
    return new SimpleCryptoJS(Constante.CHAVE_CRIPTOGRAFIA).decrypt(valor);
  }
}
