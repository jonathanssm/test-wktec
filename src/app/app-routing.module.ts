import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Rotas
import { ROTAS } from 'src/app/app.rotas';

@NgModule({
  imports: [RouterModule.forRoot(ROTAS)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
