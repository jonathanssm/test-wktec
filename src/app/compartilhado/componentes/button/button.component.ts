import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  public nomeBotao: string;

  @Input()
  public bloquear: boolean;

  @Input()
  public iconeBotao?: string;

  @Input()
  public tipoBotao?: string;

  @Output()
  public eventoClick: EventEmitter<any> = new EventEmitter();

  public exibirInconeBotao: boolean;

  constructor() {
    this.nomeBotao = '';
    this.bloquear = false;
    this.iconeBotao = '';
    this.exibirInconeBotao = false;
    this.tipoBotao = 'button';
  }

  ngOnInit(): void {
    this.exibirInconeBotao = this.iconeBotao !== undefined && this.iconeBotao.length > 0;
  }

  emitirEventoClick(evento: Event): void {
    this.eventoClick.emit(evento);
  }
}
