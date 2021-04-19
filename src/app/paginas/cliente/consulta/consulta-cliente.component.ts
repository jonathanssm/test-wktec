import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.scss']
})
export class ConsultaClienteComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public cpfControl: FormControl = new FormControl();

  public esconderMarcaCampoObrigatorio: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.esconderMarcaCampoObrigatorio = false;
  }

  ngOnInit(): void {
    this.iniciarForm();
  }

  private iniciarForm(): void {
    this.cpfControl = this.formBuilder.control('', [Validators.required, Validators.pattern('[0-9]{11}')]);

    this.form = this.formBuilder.group({
      cpf: this.cpfControl
    });
  }
}
