import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Servicos
import { ModalServico } from 'src/app/compartilhado/componentes/modal/modal.servico';
import { AppServico } from 'src/app/compartilhado/servico/app-servico.service';

// Modelos
import { ParametroRota } from 'src/app/compartilhado/modelo/parametro-rota.dto';
import { Produto } from '../produto.modelo';

// Util
import { AppParametroRotaUtil } from 'src/app/compartilhado/utils/app-parametro-rota.util';

@Component({
  selector: 'app-consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.scss']
})
export class ConsultaProdutoComponent implements OnInit {

  @ViewChild(MatPaginator) private paginator: any;

  public form: FormGroup = new FormGroup({});
  public codigoControl: FormControl = new FormControl({});
  public listaProduto: Array<Produto> = [];
  public displayedColumns: string[] = ['codigo', 'nome', 'valor', 'acao'];
  public dataSource = new MatTableDataSource<Produto>();

  private parametroRota: ParametroRota;
  private listaProdutoTemporaria: Array<Produto> = [];

  constructor(
    private formBuilder: FormBuilder,
    private modalServico: ModalServico,
    private router: Router,
    private rotaAtiva: ActivatedRoute,
    private appServico: AppServico
  ) {
    this.parametroRota = AppParametroRotaUtil.recuperarParametro(this.rotaAtiva);
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.carregarDadoParametro();
    this.carregarListaProdutos();
  }

  excluirProduto(idProduto: number): void {
    this.modalServico.exibirConfirmacao('Realmente deseja excluir este produto?', () => {
      this.appServico.excluirProduto(idProduto);
    });
  }

  consultarProduto(): void {
    this.listaProdutoTemporaria = this.listaProduto.filter(produto => produto.codigo === this.form.controls.codigoProduto.value);
    this.dataSource = new MatTableDataSource<Produto>(this.listaProdutoTemporaria);
    this.dataSource.paginator = this.paginator;
  }

  redirecionarParaCadastro(): void {
    const parametroRetorno: ParametroRota = {
      redirecionar: '/produto/consulta', dado: {
        codigoProduto: this.form.controls.codigoProduto.value
      }
    };

    this.router.navigate([
      '/produto/cadastro', AppParametroRotaUtil.gerarParametro(parametroRetorno)]);
  }

  private carregarListaProdutos(): void {
    if (this.form.controls.codigoProduto.value === '') {
      this.appServico.getListaProduto().subscribe(data => {
        this.listaProduto = data.map((e: any) => (e.payload.doc.data()));
        this.dataSource = new MatTableDataSource<Produto>(this.listaProduto);
        this.dataSource.paginator = this.paginator;
        this.listaProdutoTemporaria = this.listaProduto;
      });
    }
  }

  private carregarDadoParametro(): void {
    if (this.parametroRota.dado !== null) {
      this.form.controls.codigoProduto.setValue(this.parametroRota.dado.codigoProduto);
    }
  }

  private iniciarForm(): void {
    this.codigoControl = this.formBuilder.control('', [
      Validators.required, Validators.pattern('[0-9]{1,20}')
    ]);

    this.form = this.formBuilder.group({
      codigoProduto: this.codigoControl
    });
  }
}
