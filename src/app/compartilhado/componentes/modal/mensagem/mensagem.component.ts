import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent implements OnInit {

  public eventoConfirmado = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MensagemComponent>) { }

  ngOnInit(): void { }

  emitirEventoConfirmado(evento: Event): void {
    this.eventoConfirmado.emit(evento);
    this.dialogRef.close();
  }
}
