import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Servicos
import { ModalServico } from 'src/app/compartilhado/componentes/modal/modal.servico';

// Modelo
import { ParametroRota } from 'src/app/compartilhado/modelo/parametro-rota.dto';

// Util
import { AppParametroRotaUtil } from 'src/app/compartilhado/utils/app-parametro-rota.util';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public codigoProdutoControl: FormControl = new FormControl({});
  public nomeProdutoControl: FormControl = new FormControl({});
  public valorProdutoControl: FormControl = new FormControl({});

  private parametroRota: ParametroRota;

  constructor(
    private formBuilder: FormBuilder,
    private modalServico: ModalServico,
    private router: Router,
    private rotaAtiva: ActivatedRoute
  ) {
    this.parametroRota = AppParametroRotaUtil.recuperarParametro(this.rotaAtiva);
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.carregarDadoParametro();
  }

  cadastrar(): void {
    const parametroRetorno: ParametroRota = {
      redirecionar: '', dado: {
        codigoProduto: this.form.controls.codigoProduto.value
      }
    };

    this.router.navigate([
      this.parametroRota.redirecionar, AppParametroRotaUtil.gerarParametro(parametroRetorno)]);

    this.modalServico.exibirMensagem('Produto cadastrado com sucesso.');
  }

  private carregarDadoParametro(): void {
    if (this.parametroRota !== null) {
      this.form.controls.codigoProduto.setValue(this.parametroRota.dado.codigoProduto);
    }
  }

  private iniciarForm(): void {
    this.codigoProdutoControl = this.formBuilder.control('', [
      Validators.required, Validators.pattern('[0-9]{1,20}')
    ]);

    this.nomeProdutoControl = this.formBuilder.control('', [
      Validators.required
    ]);

    this.valorProdutoControl = this.formBuilder.control('', [
      Validators.required, Validators.pattern('[0-9]*[\.][0-9]{2}')
    ]);

    this.form = this.formBuilder.group({
      codigoProduto: this.codigoProdutoControl,
      nomeProduto: this.nomeProdutoControl,
      valorProduto: this.valorProdutoControl
    });
  }
}
