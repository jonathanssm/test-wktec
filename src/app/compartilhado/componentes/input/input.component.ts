import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppFormularioUtil } from '../../utils/app-formulario.util';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, AfterViewInit {

  @Input()
  public esconderMarcaCampoObrigatorio: boolean;

  @Input()
  public label: string;

  @Input()
  public placeHolder: string;

  @Input()
  public msgErro: string;

  @Input()
  public control: FormControl = new FormControl();

  @Input()
  public mascara: string;

  public controlName: string;

  public isCampoObrigatorio: boolean;
  public exbibirMsgErro: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.esconderMarcaCampoObrigatorio = false;
    this.label = '';
    this.placeHolder = '';
    this.msgErro = '';
    this.isCampoObrigatorio = !this.esconderMarcaCampoObrigatorio;
    this.exbibirMsgErro = true;
    this.controlName = AppFormularioUtil.getNomeFormControl(this.control);
    this.mascara = '';
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  campoInvalido(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
