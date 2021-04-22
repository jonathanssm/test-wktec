import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

// Pipes
import { CnpjPipe } from 'src/app/compartilhado/pipe/cnpj.pipe';
import { CpfPipe } from 'src/app/compartilhado/pipe/cpf.pipe';

// Servicos
import { ModalServico } from 'src/app/compartilhado/componentes/modal/modal.servico';
import { AppServico } from 'src/app/compartilhado/servico/app-servico.service';

// Constante
import { Constante } from 'src/app/compartilhado/constante';

// Modelo
import { Opcao } from 'src/app/compartilhado/modelo/opcao';
import { ParametroRota } from 'src/app/compartilhado/modelo/parametro-rota.dto';
import { Validacao } from 'src/app/compartilhado/modelo/validacao';
import { Venda } from './venda.modelo';
import { Produto } from '../produto/produto.modelo';

// Util
import { AppDocumentoUtil } from 'src/app/compartilhado/utils/app-documento.util';
import { AppParametroRotaUtil } from 'src/app/compartilhado/utils/app-parametro-rota.util';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {

  @ViewChild(MatPaginator) private paginator: any;

  public form: FormGroup = new FormGroup({});
  public tipoPessoaControl: FormControl = new FormControl({});
  public documentoControl: FormControl = new FormControl({});

  public listaOpcao: Array<Opcao> = [];
  public msgErro: string;
  public mascara: string;
  public label: string;
  public displayedColumns: string[] = ['documentoCliente', 'dataHora', 'total', 'produto', 'excluir'];
  public dataSource = new MatTableDataSource<Venda>();
  public listaProduto: Array<Produto> = [];

  private listaVenda: Array<Venda> = [];
  private mapaValidacao: Map<string, Validacao>;
  private listaVendaTemporaria: Array<Venda> = [];
  private parametroRota: ParametroRota;

  constructor(
    private formBuilder: FormBuilder,
    private modalServico: ModalServico,
    private rotaAtiva: ActivatedRoute,
    private appServico: AppServico
  ) {
    this.mapaValidacao = AppDocumentoUtil.getMapCPFCNPJValidacao();
    this.msgErro = AppDocumentoUtil.MSG_ERRO_OPCAO_PESSOA_FISICA;
    this.mascara = Constante.MASCARA_CPF;
    this.label = AppDocumentoUtil.LABEL_OPCAO_PESSOA_FISICA;
    this.parametroRota = AppParametroRotaUtil.recuperarParametro(this.rotaAtiva);
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.carregarDadoParametro();
    this.carregarListaVenda();

    this.listaOpcao = AppDocumentoUtil.getListaOpcaoCPFCNPJ();
  }

  selecionarOpcao(opcaoSelecionada: string): void {
    const validacao: any = this.mapaValidacao.get(opcaoSelecionada);
    this.mascara = validacao.mascara;
    this.msgErro = validacao.msgErro;
    this.label = validacao.placehold;

    this.configurarDocumentoControl(validacao);
  }

  consultarVenda(): void {
    this.listaVendaTemporaria = this.listaVenda.filter(venda => venda.documentoCliente === this.form.controls.documento.value);
    this.dataSource = new MatTableDataSource<Venda>(this.listaVendaTemporaria);
    this.dataSource.paginator = this.paginator;
    this.listaProduto = [];
  }

  excluirVenda(documento: number): void {
    this.modalServico.exibirConfirmacao('Realmente deseja excluir esta venda?', () => {
      this.appServico.excluirVenda(documento);
      this.listaProduto = [];
    });
  }

  formatarDocumento(documento: string): string {
    return AppDocumentoUtil.isDocumentoCPF(documento) ? new CpfPipe().transform(documento) : new CnpjPipe().transform(documento);
  }

  carregarListaProduto(documento: number): void {
    let listaVendaTemporaria: Array<Venda> = [];

    listaVendaTemporaria = this.listaVenda.filter(venda => venda.documentoCliente === documento);

    listaVendaTemporaria.map(venda => {
      this.listaProduto = venda.listaProduto;
    });
  }

  exibirCardDetalheVenda(): boolean {
    return this.listaProduto.length > 0;
  }

  resetarDadoDetalheProduto(): void {
    this.listaProduto = [];
  }

  private configurarDocumentoControl(validacao: Validacao): void {
    this.documentoControl.reset();
    this.documentoControl.clearValidators();
    this.documentoControl.setValidators([Validators.required, Validators.pattern(validacao.regex)]);
    this.documentoControl.updateValueAndValidity();
  }

  private carregarListaVenda(): void {
    this.appServico.getListaVenda().subscribe(data => {
      this.listaVenda = data.map((e: any) => (e.payload.doc.data()));
      this.dataSource = new MatTableDataSource<Venda>(this.listaVenda);
      this.dataSource.paginator = this.paginator;
      this.listaVendaTemporaria = this.listaVenda;
    });
  }

  private carregarDadoParametro(): void {
    if (this.parametroRota.dado !== null && this.parametroRota.dado.documentoCliente) {
      this.form.controls.documento.setValue(this.parametroRota.dado.documentoCliente);
    }
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
