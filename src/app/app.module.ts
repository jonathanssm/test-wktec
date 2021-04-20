
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// NGX Mask
import { NgxMaskModule, IConfig } from 'ngx-mask';

// Angular Material Module
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/app/material-module';

// Servicos
import { ModalServico } from './compartilhado/componentes/modal/modal.servico';
import { AppServico } from './compartilhado/servico/app-servico.service';

// Componentes compartilhado
import { ToolbarComponent } from './compartilhado/componentes/toolbar/toolbar.component';
import { InputComponent } from './compartilhado/componentes/input/input.component';
import { DatepickerComponent } from './compartilhado/componentes/datepicker/datepicker.component';
import { RadioComponent } from './compartilhado/componentes/radio/radio.component';
import { ButtonComponent } from './compartilhado/componentes/button/button.component';
import { ConfirmacaoComponent } from './compartilhado/componentes/modal/confirmacao/confirmacao.component';
import { MensagemComponent } from './compartilhado/componentes/modal/mensagem/mensagem.component';

// Paginas
import { HomeComponent } from './paginas/home/home.component';
import { ConsultaClienteComponent } from './paginas/cliente/consulta/consulta-cliente.component';
import { ConsultaProdutoComponent } from './paginas/produto/consulta/consulta-produto.component';
import { VendaComponent } from './paginas/venda/venda.component';

// Permissao Rota
import { PermissaoRota } from 'src/app/permissao-rota';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = ({});

const MODULO_ANGULAR_MATERIAL = [
  MaterialModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    ConsultaClienteComponent,
    ConsultaProdutoComponent,
    VendaComponent,
    InputComponent,
    DatepickerComponent,
    RadioComponent,
    ButtonComponent,
    ConfirmacaoComponent,
    MensagemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ...MODULO_ANGULAR_MATERIAL,
    NgxMaskModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    PermissaoRota, ModalServico, AppServico
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
