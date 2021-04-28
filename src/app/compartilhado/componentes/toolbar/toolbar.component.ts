import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelo
import { ParametroRota } from '../../modelo/parametro-rota.dto';

// Util
import { AppParametroRotaUtil } from '../../utils/app-parametro-rota.util';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setarFocoMenu();
  }

  ngOnChanges(): void {
    this.setarFocoMenu();
  }

  redirecionarPaginaCarrinho(): void {
    const parametro: ParametroRota = { redirecionar: '', dado: { itensCarrinho: Object.keys(localStorage) } };

    this.router.navigate(['/carrinho', AppParametroRotaUtil.gerarParametro(parametro)]);
  }

  esconderBadge(): boolean {
    return this.recuperarTamanhoBadge() === 0;
  }

  recuperarTamanhoBadge(): number {
    return localStorage.length;
  }

  private setarFocoMenu(): void {
    document.getElementById('#produto')?.focus();
  }
}
