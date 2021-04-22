import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

// Terceiro
import * as moment from 'moment';

// Modelos
import { ParametroRota } from 'src/app/compartilhado/modelo/parametro-rota.dto';
import { Produto } from '../produto/produto.modelo';
import { Venda } from '../venda/venda.modelo';
import { Constante } from 'src/app/compartilhado/constante';
import { Cliente } from '../cliente/cliente.modelo';
import { Opcao } from 'src/app/compartilhado/modelo/opcao';
import { Validacao } from 'src/app/compartilhado/modelo/validacao';

// Util
import { AppParametroRotaUtil } from 'src/app/compartilhado/utils/app-parametro-rota.util';
import { AppDocumentoUtil } from 'src/app/compartilhado/utils/app-documento.util';

// Servicos
import { ModalServico } from 'src/app/compartilhado/componentes/modal/modal.servico';
import { AppServico } from 'src/app/compartilhado/servico/app-servico.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  @ViewChild(MatPaginator) private paginator: any;

  public form: FormGroup = new FormGroup({});

  public documentoClienteControl: FormControl = this.formBuilder.control('', [
    Validators.required, Validators.pattern(Constante.REGEX_VALIDACAO_CPF_SEM_MASCARA)
  ]);

  public tipoPessoaControl: FormControl = this.formBuilder.control(
    AppDocumentoUtil.OPCAO_PESSOA_FISICA, Validators.required
  );

  public listaOpcao: Array<Opcao> = [];
  public msgErro: string;
  public mascara: string;
  public label: string;
  public listaProduto: Array<Produto> = [];
  public valorTotal: number;
  public displayedColumns: string[] = ['codigo', 'nome', 'valor', 'excluir'];
  public dataSource = new MatTableDataSource<Produto>();

  private mapaValidacao: Map<string, Validacao>;
  private parametroRota: ParametroRota;
  private listaCliente: Array<Cliente> = [];

  constructor(
    private rotaAtiva: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalServico: ModalServico,
    private appServico: AppServico
  ) {
    this.mapaValidacao = AppDocumentoUtil.getMapCPFCNPJValidacao();
    this.msgErro = AppDocumentoUtil.MSG_ERRO_OPCAO_PESSOA_FISICA;
    this.mascara = Constante.MASCARA_CPF;
    this.label = AppDocumentoUtil.LABEL_OPCAO_PESSOA_FISICA;
    this.parametroRota = AppParametroRotaUtil.recuperarParametro(this.rotaAtiva);
    this.valorTotal = 0;
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.carregarDadoParametro();
    this.carregarCarrinho();
    this.carregarListaCliente();

    this.listaOpcao = AppDocumentoUtil.getListaOpcaoCPFCNPJ();
  }

  selecionarOpcao(opcaoSelecionada: string): void {
    const validacao: any = this.mapaValidacao.get(opcaoSelecionada);
    this.mascara = validacao.mascara;
    this.msgErro = validacao.msgErro;
    this.label = validacao.placehold;

    this.configurarDocumentoControl(validacao);
  }

  carregarCarrinho(): void {
    if (this.parametroRota.dado !== null) {
      const listaItens: Array<any> = this.parametroRota.dado.itensCarrinho;
      const listaObj: Array<any> = [];

      listaItens.map(item => listaObj.push(localStorage.getItem(item)));

      listaObj.map(obj => {
        this.listaProduto.push(JSON.parse(obj));
      });

      this.listaProduto.forEach(produto => {
        if (produto !== null) {
          this.valorTotal += parseFloat(produto.valor.toString());
          this.dataSource = new MatTableDataSource<Produto>(this.listaProduto.sort((a, b) => a.codigo - b.codigo));
          this.dataSource.paginator = this.paginator;
        }
      });

    }
  }

  registrarVenda(): void {
    if (this.isClienteExiste(this.form.controls.documentoCliente.value)) {
      const venda: Venda = {
        codigo: this.form.controls.documentoCliente.value,
        documentoCliente: this.form.controls.documentoCliente.value,
        dataHora: moment(moment.now()).format(Constante.MASCARA_DATA_HORA),
        listaProduto: this.listaProduto,
        total: this.valorTotal
      };

      this.appServico.inserirAtualizarVenda(venda);

      this.router.navigate(['/venda']);
      this.modalServico.exibirMensagem('Venda registrada com sucesso.');
      localStorage.clear();
    } else {
      this.modalServico.exibirConfirmacao('Cliente não cadastrado, deseja cadastrar?', () => {
        const parametro: ParametroRota = {
          redirecionar: '/carrinho', dado: {
            tipoPessoa: this.form.controls.tipoPessoa.value, documentoCliente: this.form.controls.documentoCliente.value,
            itensCarrinho: this.parametroRota.dado.itensCarrinho
          }
        };

        this.router.navigate(['/cliente/cadastro', AppParametroRotaUtil.gerarParametro(parametro)]);
      });
    }
  }

  removerProdutoCarrinho(codigoProduto: number): void {
    localStorage.removeItem(codigoProduto.toString());

    this.valorTotal -= this.listaProduto.filter(produto => produto.codigo === codigoProduto)[0].valor;
    this.listaProduto = this.listaProduto.filter(produto => produto.codigo !== codigoProduto);
    this.dataSource = new MatTableDataSource<Produto>(this.listaProduto);
    this.dataSource.paginator = this.paginator;
  }

  bloquearBotao(): boolean {
    return this.form.invalid || this.valorTotal === 0;
  }

  private carregarDadoParametro(): void {
    if (this.parametroRota.dado !== null && this.parametroRota.dado.documentoCliente) {
      this.form.controls.documentoCliente.setValue(this.parametroRota.dado.documentoCliente);
      this.form.controls.tipoPessoa.setValue(this.parametroRota.dado.tipoPessoa);
    }
  }

  private configurarDocumentoControl(validacao: Validacao): void {
    this.documentoClienteControl.reset();
    this.documentoClienteControl.clearValidators();
    this.documentoClienteControl.setValidators([Validators.required, Validators.pattern(validacao.regex)]);
    this.documentoClienteControl.updateValueAndValidity();
  }

  private carregarListaCliente(): void {
    this.appServico.getListaCliente().subscribe(data => {
      this.listaCliente = data.map((e: any) => (e.payload.doc.data()));
    });
  }

  private isClienteExiste(documento: number): boolean {
    return this.listaCliente.findIndex(cliente => cliente.documento === documento) !== -1;
  }

  private iniciarForm(): void {
    this.form = this.formBuilder.group({
      tipoPessoa: this.tipoPessoaControl,
      documentoCliente: this.documentoClienteControl
    });
  }
}
