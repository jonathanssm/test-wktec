import { Injectable } from '@angular/core';

// Material
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// Componentes
import { ConfirmacaoComponent } from 'src/app/compartilhado/componentes/modal/confirmacao/confirmacao.component';
import { MensagemComponent } from 'src/app/compartilhado/componentes/modal/mensagem/mensagem.component';

@Injectable()
export class ModalServico {

  constructor(private dialog: MatDialog) { }

  exibirMensagem(mensagem: string): void {
    this.configurarModalMensagem(mensagem);
  }

  exibirConfirmacao(mensagem: string, funcaoConfirmado: () => void, funcaoNaoConfirmado?: () => void): void {
    this.configurarModalConfirmacao(mensagem, funcaoConfirmado, funcaoNaoConfirmado);
  }

  private exibir(mensagem: string, modalComponent: any): MatDialogRef<any> {
    const dialogRef: MatDialogRef<any> = this.dialog.open(modalComponent, {
      disableClose: true,
      position: { top: '100px' },
      maxWidth: '95vw',
      maxHeight: '50vw',
      data: { mensagem: `${mensagem}` }
    });

    return dialogRef;
  }

  private configurarModalMensagem(mensagem: string): void {
    const modal = this.exibir(mensagem, MensagemComponent);
  }

  private configurarModalConfirmacao(mensagem: string, funcaoConfirmado: () => void, funcaoNaoConfirmado?: () => void): void {
    const modal = this.exibir(mensagem, ConfirmacaoComponent);

    modal.componentInstance.eventoConfirmado.subscribe(funcaoConfirmado);

    if (funcaoNaoConfirmado) {
      modal.componentInstance.eventoNaoConfirmado.subscribe(funcaoNaoConfirmado);
    }
  }
}
