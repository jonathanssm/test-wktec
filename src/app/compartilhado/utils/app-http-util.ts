import { HttpRequest, HttpParams } from '@angular/common/http';
import { TipoResposta } from 'src/app/compartilhado/enumerador/tipo-resposta.enum';

/*
* Esta classe deve conter somente metodos utilitarios para consumir api rest
*/
export class AppHttpUtil {
  private constructor() {
    // somente metodos estaticos
  }

  /*
  * A partir do obj passado ira ser criado um HttpParams que sera preenchido com os valores de obj inicialmente foi
  * criado para facilitar a requisicao GET para objetos complexos
  */
  public static addParametroRequisicao(obj: any): HttpParams {
    let parametros = new HttpParams();

    obj.forEach((atributo: any) => {
      parametros = parametros.append(atributo, obj[atributo]);
    });

    return parametros;
  }

  /*
  * Cria uma instancia de HttpRequest<FormData> com o metodo POST para requisicoes q precisem fazer upload de arquivo.
  * Caso seja preciso enviar alem do arquivo dados de um formulario basta passar o parametro dadosExtras q sera add ao
  * corpo da requisicao
  *
  * O parâmetro tipo resposta foi adicionado para, pois pode haver casos em que a resposta seja diferente de json
  */
  public static criarHttpRequest(
    arquivo: Array<File>, url: string, dadosExtras?: object, tipoResposta: TipoResposta = TipoResposta.JSON
  ): HttpRequest<FormData> {
    const corpoRequisicao: FormData = new FormData();

    arquivo.forEach((arqv: File, index: number) => corpoRequisicao.append('arquivo', arqv, arqv.name));

    if (dadosExtras) {
      const blobDadosExtras = new Blob([JSON.stringify(dadosExtras)], { type: 'application/json', });
      corpoRequisicao.append('dados', blobDadosExtras, 'dadosFormJson');
    }

    return new HttpRequest('POST', url, corpoRequisicao, { reportProgress: true, responseType: tipoResposta });
  }
}
