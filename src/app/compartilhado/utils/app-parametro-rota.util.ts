import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap } from '@angular/router';

// Modelo
import { ParametroRota } from 'src/app/compartilhado/modelo/parametro-rota.dto';

// Utilitario
import { AppCriptografiaUtil } from 'src/app/compartilhado/utils/app-criptografia.util';

export class AppParametroRotaUtil {

  static readonly NOME_PARAMETRO: string = 'parametro';

  private static readonly NOME_REDIRECIONAR: string = 'redirecionar';

  private constructor() {
    // somente metodos estaticos
  }

  public static gerarParametro(parametro: ParametroRota): any {
    const parametroCriptografado = AppCriptografiaUtil.criptografar(JSON.stringify(parametro));
    const parametrpCodificado = encodeURIComponent(parametroCriptografado);
    const retorno: any = {};

    retorno[AppParametroRotaUtil.NOME_PARAMETRO] = parametrpCodificado;

    return retorno;
  }

  public static recuperarParametro(rotaAtiva: ActivatedRoute): ParametroRota {
    const parametroCodificado = rotaAtiva.snapshot.paramMap.get(AppParametroRotaUtil.NOME_PARAMETRO);

    if (parametroCodificado !== null) {
      const parametroCriptografado: string = decodeURIComponent(parametroCodificado);

      return JSON.parse(JSON.stringify(AppCriptografiaUtil.descriptografar(parametroCriptografado)));
    }

    return ({ dado: null, redirecionar: '' });
  }

  public static gerarUrlRedirecionamento(baseUrl: string, rotaRedirecionar: string): string {
    const urlCriptografada: string = AppCriptografiaUtil.criptografar(rotaRedirecionar);

    return `${baseUrl}?${AppParametroRotaUtil.NOME_REDIRECIONAR}=${encodeURIComponent(urlCriptografada)}`;
  }

  public static recuperarRotaRedirecionamento(rotaAtiva: ActivatedRoute): string {
    return this.recuperarRotaRedirecionamentoPorParametro(rotaAtiva.snapshot.queryParamMap);
  }

  public static recuperarRotaRedirecionamentoSnapshot(rotaAtivaSnapshot: ActivatedRouteSnapshot): string {
    return this.recuperarRotaRedirecionamentoPorParametro(rotaAtivaSnapshot.queryParamMap);
  }

  private static recuperarRotaRedirecionamentoPorParametro(parametro: ParamMap): string {
    const urlCriptografada = parametro.get(AppParametroRotaUtil.NOME_REDIRECIONAR);

    return urlCriptografada != null ? AppCriptografiaUtil.descriptografar(urlCriptografada) : '';
  }
}
