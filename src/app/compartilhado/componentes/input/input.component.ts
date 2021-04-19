// Angular
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

// Util
import { AppFormularioUtil } from '../../utils/app-formulario.util';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  private static idInputContador = 0;

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

  @Input()
  public somenteLeitura?: boolean;

  @ViewChild('input') private refInput: ElementRef = new ElementRef({});

  public isCampoObrigatorio: boolean;
  public exbibirMsgErro: boolean;
  public complementoId: string;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.esconderMarcaCampoObrigatorio = false;
    this.label = '';
    this.placeHolder = '';
    this.msgErro = '';
    this.isCampoObrigatorio = !this.esconderMarcaCampoObrigatorio;
    this.exbibirMsgErro = true;
    this.mascara = '';
    this.somenteLeitura = false;
    this.complementoId = '';
  }

  ngOnInit(): void {
    this.complementoId = `${++InputComponent.idInputContador}`;
  }

  ngAfterViewInit(): void {
    this.complementoId += AppFormularioUtil.getNomeFormControl(this.control);

    this.changeDetector.detectChanges();
  }

  // metodos da interface ControlValueAccessor
  writeValue(value: any): void {
    if (this.refInput === undefined) {
      this.changeDetector.detectChanges();
    }

    if (value && value !== null) {
      this.refInput.nativeElement.value = value;
      this.control.markAsTouched();
    } else {
      this.refInput.nativeElement.value = '';
    }
  }

  registerOnChange(fn: any): void {

  }

  registerOnTouched(fn: any): void {
    // noop - verificar pq o touched n esta funcionando corretamente
  }

  ngOnDestroy(): void {
    InputComponent.idInputContador--;
  }

  campoInvalido(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
