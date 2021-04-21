import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Servicos
import { ModalServico } from 'src/app/compartilhado/componentes/modal/modal.servico';
import { AppServico } from 'src/app/compartilhado/servico/app-servico.service';

// Modelo
import { ParametroRota } from 'src/app/compartilhado/modelo/parametro-rota.dto';

// Util
import { AppParametroRotaUtil } from 'src/app/compartilhado/utils/app-parametro-rota.util';
import { Produto } from '../produto.modelo';

@Component({
  selector: 'app-consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.scss']
})
export class ConsultaProdutoComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public codigoControl: FormControl = new FormControl({});
  public listaProduto: Array<Produto> = [];

  private parametroRota: ParametroRota;

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

  consultar(): void {
    this.modalServico.exibirMensagem(`Consultado com sucesso.`);
  }

  cadastrar(): void {
    const parametroRetorno: ParametroRota = {
      redirecionar: '/produto/consulta', dado: {
        codigoProduto: this.form.controls.codigoProduto.value
      }
    };

    this.router.navigate([
      '/produto/cadastro', AppParametroRotaUtil.gerarParametro(parametroRetorno)]);
  }

  private carregarListaProdutos(): void {
    this.appServico.getListaProduto().subscribe(data => {
      this.listaProduto = data.map((e: any) => {
        return e.payload.doc.data();
      });

      this.listaProduto.forEach(dado => {
        console.log(dado.codigo);
      });
    });
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
