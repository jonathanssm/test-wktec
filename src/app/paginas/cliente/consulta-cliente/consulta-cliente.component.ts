import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Cliente, Endereco } from 'src/app/paginas/cliente/cliente.modelo';

// Util
import { AppDocumentoUtil } from 'src/app/compartilhado/utils/app-documento.util';
import { AppParametroRotaUtil } from 'src/app/compartilhado/utils/app-parametro-rota.util';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.scss']
})
export class ConsultaClienteComponent implements OnInit {

  @ViewChild(MatPaginator) private paginator: any;

  public form: FormGroup = new FormGroup({});
  public tipoPessoaControl: FormControl = new FormControl({});
  public documentoControl: FormControl = new FormControl({});

  public listaOpcao: Array<Opcao> = [];
  public msgErro: string;
  public mascara: string;
  public label: string;
  public listaCliente: Array<Cliente> = [];
  public displayedColumns: string[] = ['codigo', 'nome', 'documento', 'endereco', 'email', 'dataNascimento', 'excluir'];
  public dataSource = new MatTableDataSource<Cliente>();

  private mapaValidacao: Map<string, Validacao>;
  private listaClienteTemporaria: Array<Cliente> = [];
  private parametroRota: ParametroRota;

  constructor(
    private formBuilder: FormBuilder,
    private modalServico: ModalServico,
    private router: Router,
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

  consultarCliente(): void {
    this.listaClienteTemporaria = this.listaCliente.filter(cliente => cliente.documento === this.form.controls.documento.value);
    this.dataSource = new MatTableDataSource<Cliente>(this.listaClienteTemporaria);
    this.dataSource.paginator = this.paginator;
  }

  redirecionarParaCadastro(): void {
    const parametroRetorno: ParametroRota = {
      redirecionar: '/cliente/consulta', dado: {
        tipoPessoa: this.form.controls.tipoPessoa.value, documentoCliente: this.form.controls.documento.value
      }
    };

    this.router.navigate([
      '/cliente/cadastro', AppParametroRotaUtil.gerarParametro(parametroRetorno)]);
  }

  excluirCliente(documento: number): void {
    this.modalServico.exibirConfirmacao('Realmente deseja excluir este cliente?', () => {
      this.appServico.excluirCliente(documento);
    });
  }

  recuperarEnderecoCompleto(indice: number): string {
    if (this.listaClienteTemporaria.length > 0 && this.listaClienteTemporaria[indice].endereco.logradouro.length > 0) {
      const endereco: Endereco = this.listaClienteTemporaria[indice].endereco;
      const complemento: string = endereco.compplemento.length > 0 ? endereco.compplemento : 'S.C';
      const numero: string = endereco.numero.length > 0 ? endereco.numero : 'S.N';

      return endereco.logradouro.concat(', ').concat(numero).concat(', ').concat(complemento).
        concat(', ').concat(endereco.bairro).concat(', ').concat(endereco.cidade).concat(', ').concat(endereco.cep.toString());
    }

    return '';
  }

  formatarDocumento(documento: string): string {
    return AppDocumentoUtil.isDocumentoCPF(documento) ? new CpfPipe().transform(documento) : new CnpjPipe().transform(documento);
  }

  private configurarDocumentoControl(validacao: Validacao): void {
    this.documentoControl.reset();
    this.documentoControl.clearValidators();
    this.documentoControl.setValidators([Validators.required, Validators.pattern(validacao.regex)]);
    this.documentoControl.updateValueAndValidity();
  }

  private carregarListaCliente(): void {
    this.appServico.getListaCliente().subscribe(data => {
      this.listaCliente = data.map((e: any) => (e.payload.doc.data()));
      this.dataSource = new MatTableDataSource<Cliente>(this.listaCliente);
      this.dataSource.paginator = this.paginator;
      this.listaClienteTemporaria = this.listaCliente;
    });
  }

  private carregarDadoParametro(): void {
    if (this.parametroRota.dado !== null && this.parametroRota.dado.documentoCliente) {
      this.form.controls.documento.setValue(this.parametroRota.dado.documentoCliente);
      this.form.controls.tipoPessoa.setValue(this.parametroRota.dado.tipoPessoa);
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
