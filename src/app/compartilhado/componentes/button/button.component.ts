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

  @Output()
  public eventoClick: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.nomeBotao = '';
    this.bloquear = false;
  }

  ngOnInit(): void {
  }

  emitirEventoClick(evento: Event): void {
    this.eventoClick.emit(evento);
  }
}
