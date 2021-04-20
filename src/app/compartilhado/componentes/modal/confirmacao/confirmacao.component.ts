import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss']
})
export class ConfirmacaoComponent implements OnInit {

  public eventoConfirmado = new EventEmitter<any>();
  public eventoNaoConfirmado = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmacaoComponent>) { }

  ngOnInit(): void { }

  emitirEventoConfirmado(evento: Event): void {
    this.eventoConfirmado.emit(evento);
    this.dialogRef.close();
  }

  emitirEventoNaoConfirmado(evento: Event): void {
    this.eventoNaoConfirmado.emit(evento);
    this.dialogRef.close();
  }
}
