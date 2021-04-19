
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
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/material-module';

// Componentes compartilhado
import { ToolbarComponent } from './compartilhado/componentes/toolbar/toolbar.component';
import { InputComponent } from './compartilhado/componentes/input/input.component';

// Paginas
import { HomeComponent } from './paginas/home/home.component';
import { ClienteComponent } from './paginas/cliente/cliente.component';
import { ProdutoComponent } from './paginas/produto/produto.component';
import { VendaComponent } from './paginas/venda/venda.component';

// Permissao Rota
import { PermissaoRota } from 'src/app/permissao-rota';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

const MODULO_ANGULAR_MATERIAL = [
  MaterialModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    ClienteComponent,
    ProdutoComponent,
    VendaComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    ...MODULO_ANGULAR_MATERIAL
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [PermissaoRota, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearence: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
