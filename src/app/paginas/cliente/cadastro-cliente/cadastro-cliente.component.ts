import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Terceiros
import * as moment from 'moment';

// Servicos
import { ModalServico } from 'src/app/compartilhado/componentes/modal/modal.servico';
import { AppServico } from 'src/app/compartilhado/servico/app-servico.service';

// Modelos
import { ParametroRota } from 'src/app/compartilhado/modelo/parametro-rota.dto';
import { Cliente } from 'src/app/paginas/cliente/cliente.modelo';
import { Constante } from 'src/app/compartilhado/constante';
import { Opcao } from 'src/app/compartilhado/modelo/opcao';
import { Validacao } from 'src/app/compartilhado/modelo/validacao';

// Util
import { AppParametroRotaUtil } from 'src/app/compartilhado/utils/app-parametro-rota.util';
import { AppDocumentoUtil } from 'src/app/compartilhado/utils/app-documento.util';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {

  public form: FormGroup = new FormGroup({});

  public codigoClienteControl: FormControl = new FormControl({});
  public nomeClienteControl: FormControl = new FormControl({});
  public documentoClienteControl: FormControl = new FormControl({});
  public tipoPessoaControl: FormControl = new FormControl({});
  public dataNascimentoControl: FormControl = new FormControl({});
  public emailControl: FormControl = new FormControl({});
  public bairroControl: FormControl = new FormControl({});
  public cepControl: FormControl = new FormControl({});
  public cidadeControl: FormControl = new FormControl({});
  public complementoControl: FormControl = new FormControl({});
  public logradouroControl: FormControl = new FormControl({});
  public numeroControl: FormControl = new FormControl();

  public listaOpcao: Array<Opcao> = [];
  public msgErro: string;
  public mascara: string;
  public label: string;

  private parametroRota: ParametroRota;
  private mapaValidacao: Map<string, Validacao>;

  constructor(
    private formBuilder: FormBuilder,
    private modalServico: ModalServico,
    private router: Router,
    private rotaAtiva: ActivatedRoute,
    private appServico: AppServico
  ) {
    this.parametroRota = AppParametroRotaUtil.recuperarParametro(this.rotaAtiva);
    this.mapaValidacao = AppDocumentoUtil.getMapCPFCNPJValidacao();
    this.msgErro = AppDocumentoUtil.MSG_ERRO_OPCAO_PESSOA_FISICA;
    this.mascara = Constante.MASCARA_CPF;
    this.label = AppDocumentoUtil.LABEL_OPCAO_PESSOA_FISICA;
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.carregarDadoParametro();

    this.listaOpcao = AppDocumentoUtil.getListaOpcaoCPFCNPJ();
  }

  selecionarOpcao(opcaoSelecionada: string): void {
    const validacao: any = this.mapaValidacao.get(opcaoSelecionada);
    this.mascara = validacao.mascara;
    this.msgErro = validacao.msgErro;
    this.label = validacao.placehold;

    this.configurarDocumentoControl(validacao);
  }

  cadastrarCliente(): void {
    const cliente: Cliente = {
      codigo: this.form.controls.codigoCliente.value,
      nome: this.form.controls.nomeCliente.value,
      documento: this.form.controls.documentoCliente.value,
      dataNascimento: moment(this.form.controls.dataNascimento.value).format(Constante.MASCARA_DATA),
      email: this.form.controls.email.value,
      endereco: {
        bairro: this.form.controls.bairro.value,
        cep: this.form.controls.cep.value,
        cidade: this.form.controls.cidade.value,
        compplemento: this.form.controls.complemento.value,
        logradouro: this.form.controls.logradouro.value,
        numero: this.form.controls.numero.value
      }
    };

    this.appServico.inserirAtualizarCliente(cliente).then(() => {
      this.redirecionarPaginaConsulta();
    })
      .catch(error => {
        this.modalServico.exibirMensagem(error);
      });
  }

  private configurarDocumentoControl(validacao: Validacao): void {
    this.documentoClienteControl.clearValidators();
    this.documentoClienteControl.setValidators([Validators.required, Validators.pattern(validacao.regex)]);
    this.documentoClienteControl.updateValueAndValidity();
  }

  private redirecionarPaginaConsulta(): void {
    const parametroRetorno: ParametroRota = {
      redirecionar: '', dado: {
        tipoPessoa: this.form.controls.tipoPessoa.value, documentoCliente: this.form.controls.documentoCliente.value,
        itensCarrinho: this.parametroRota.dado.itensCarrinho
      }
    };

    this.router.navigate([
      this.parametroRota.redirecionar, AppParametroRotaUtil.gerarParametro(parametroRetorno)]);

    this.modalServico.exibirMensagem('Cliente cadastrado com sucesso.');
  }

  private carregarDadoParametro(): void {
    if (this.parametroRota !== null) {
      this.form.controls.documentoCliente.setValue(this.parametroRota.dado.documentoCliente);
      this.form.controls.tipoPessoa.setValue(this.parametroRota.dado.tipoPessoa);
    }
  }

  private iniciarForm(): void {
    this.codigoClienteControl = this.formBuilder.control('', [
      Validators.required, Validators.pattern('[0-9]{1,20}')
    ]);

    this.nomeClienteControl = this.formBuilder.control('', [
      Validators.required
    ]);

    this.documentoClienteControl = this.formBuilder.control('', [
      Validators.required, Validators.pattern(Constante.REGEX_VALIDACAO_CPF_SEM_MASCARA)
    ]);

    this.tipoPessoaControl = this.formBuilder.control(AppDocumentoUtil.OPCAO_PESSOA_FISICA, [
      Validators.required
    ]);

    this.dataNascimentoControl = this.formBuilder.control('', [
      Validators.required
    ]);

    this.emailControl = this.formBuilder.control('', [
      Validators.required, Validators.pattern(Constante.REGEX_EMAIL)
    ]);

    this.bairroControl = this.formBuilder.control('', [
      Validators.required
    ]);

    this.cepControl = this.formBuilder.control('', [
      Validators.required, Validators.pattern(Constante.REGEX_VALIDACAO_NUMERO)
    ]);

    this.cidadeControl = this.formBuilder.control('', [
      Validators.required
    ]);

    this.complementoControl = this.formBuilder.control('', [
      Validators.required
    ]);

    this.logradouroControl = this.formBuilder.control('', [
      Validators.required
    ]);

    this.numeroControl = this.formBuilder.control('', [
      Validators.required
    ]);

    this.form = this.formBuilder.group({
      codigoCliente: this.codigoClienteControl,
      nomeCliente: this.nomeClienteControl,
      documentoCliente: this.documentoClienteControl,
      dataNascimento: this.dataNascimentoControl,
      email: this.emailControl,
      bairro: this.bairroControl,
      cep: this.cepControl,
      cidade: this.cidadeControl,
      complemento: this.complementoControl,
      logradouro: this.logradouroControl,
      numero: this.numeroControl,
      tipoPessoa: this.tipoPessoaControl
    });
  }
}
