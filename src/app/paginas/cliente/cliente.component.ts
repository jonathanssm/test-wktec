import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public cpfControl: FormControl = new FormControl();
  public nomeControl: FormControl = new FormControl();
  public esconderMarcaCampoObrigatorio: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.esconderMarcaCampoObrigatorio = false;
  }

  ngOnInit(): void {
    this.iniciarForm();
  }

  private iniciarForm(): void {
    this.cpfControl = this.formBuilder.control('', [Validators.required, Validators.pattern('[0-9]{11}')]);
    this.nomeControl = this.formBuilder.control('', [Validators.required]);

    this.form = this.formBuilder.group({
      cpf: this.cpfControl,
      nome: this.nomeControl
    });
  }
}
