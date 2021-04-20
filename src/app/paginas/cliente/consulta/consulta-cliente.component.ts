import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// Constante
import { Constante } from 'src/app/compartilhado/constante';

// Modelo
import { Opcao } from 'src/app/compartilhado/modelo/opcao';
import { Validacao } from 'src/app/compartilhado/modelo/validacao';

// Util
import { AppDocumentoUtil } from 'src/app/compartilhado/utils/app-documento.util';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.scss']
})
export class ConsultaClienteComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public tipoPessoaControl: FormControl = new FormControl({});
  public documentoControl: FormControl = new FormControl({});

  public listaOpcao: Array<Opcao> = [];
  public msgErro: string;
  public mascara: string;
  public label: string;

  private mapaValidacao: Map<string, Validacao>;

  constructor(private formBuilder: FormBuilder) {
    this.mapaValidacao = AppDocumentoUtil.getMapCPFCNPJValidacao();
    this.msgErro = AppDocumentoUtil.MSG_ERRO_OPCAO_PESSOA_FISICA;
    this.mascara = Constante.MASCARA_CPF;
    this.label = AppDocumentoUtil.LABEL_OPCAO_PESSOA_FISICA;
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.listaOpcao = AppDocumentoUtil.getListaOpcaoCPFCNPJ();
  }

  selecionarOpcao(opcaoSelecionada: string): void {
    const validacao: any = this.mapaValidacao.get(opcaoSelecionada);
    this.mascara = validacao.mascara;
    this.msgErro = validacao.msgErro;
    this.label = validacao.placehold;

    this.configurarDocumentoControl(validacao);
  }

  consultar(): void {
    console.log('consultado');
  }

  private configurarDocumentoControl(validacao: Validacao): void {
    this.documentoControl.reset();
    this.documentoControl.clearValidators();
    this.documentoControl.setValidators([Validators.required, Validators.pattern(validacao.regex)]);
    this.documentoControl.updateValueAndValidity();
  }

  private iniciarForm(): void {
    this.tipoPessoaControl = this.formBuilder.control(AppDocumentoUtil.OPCAO_PESSOA_FISICA, Validators.required);
    this.documentoControl = this.formBuilder.control('', [
      Validators.required, Validators.pattern(Constante.REGEX_VALIDACAO_CPF_SEM_MASCARA)
    ]);

    this.form = this.formBuilder.group({
      tipoPessoa: this.tipoPessoaControl,
      documento: this.documentoControl
    });
  }
}
