// Modelo
import { Opcao } from 'src/app/compartilhado/modelo/opcao';
import { Validacao } from 'src/app/compartilhado/modelo/validacao';

// Utilitario
import { Constante } from 'src/app/compartilhado/constante';

/**
 * Esta classe deve conter somente metodos utilitarios para manipular Documento(CPF,CNPJ)
 */
export class AppDocumentoUtil {


  public static readonly OPCAO_PESSOA_FISICA: string = 'PF';
  public static readonly OPCAO_PESSOA_JURIDICA: string = 'PJ';
  public static readonly MSG_ERRO_OPCAO_PESSOA_FISICA = 'Campo obrigatório e deve conter 11 dígitos.';
  public static readonly MSG_ERRO_OPCAO_PESSOA_JURIDICA = 'Campo obrigatório e deve conter 14 dígitos.';
  public static readonly LABEL_OPCAO_PESSOA_FISICA = 'CPF';
  public static readonly LABEL_OPCAO_PESSOA_JURIDICA = 'CNPJ';

  private constructor() {
    // somente metodos estaticos
  }

  public static getListaOpcaoCPFCNPJ(): Array<Opcao> {
    return [
      { id: AppDocumentoUtil.OPCAO_PESSOA_FISICA, descricao: 'CPF' },
      { id: AppDocumentoUtil.OPCAO_PESSOA_JURIDICA, descricao: 'CNPJ' }
    ];
  }

  public static getMapCPFCNPJValidacao(): Map<string, Validacao> {
    const mapDocumentoValidacao = new Map<string, Validacao>();

    mapDocumentoValidacao.set(AppDocumentoUtil.OPCAO_PESSOA_FISICA, {
      regex: Constante.REGEX_VALIDACAO_CPF_SEM_MASCARA,
      mascara: Constante.MASCARA_CPF,
      msgErro: this.MSG_ERRO_OPCAO_PESSOA_FISICA,
      placehold: this.LABEL_OPCAO_PESSOA_FISICA
    });

    mapDocumentoValidacao.set(AppDocumentoUtil.OPCAO_PESSOA_JURIDICA, {
      regex: Constante.REGEX_VALIDACAO_CNPJ_SEM_MASCARA,
      mascara: Constante.MASCARA_CNPJ,
      msgErro: this.MSG_ERRO_OPCAO_PESSOA_JURIDICA,
      placehold: this.LABEL_OPCAO_PESSOA_JURIDICA
    });

    return mapDocumentoValidacao;
  }

  public static isDocumentoCPF(documento: string): boolean {
    return documento.length === 11;
  }

  public static getTipoDocumento(documento: string): string {
    return AppDocumentoUtil.isDocumentoCPF(documento) ? AppDocumentoUtil.OPCAO_PESSOA_FISICA : AppDocumentoUtil.OPCAO_PESSOA_JURIDICA;
  }
}
