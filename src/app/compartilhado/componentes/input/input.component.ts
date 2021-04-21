// Angular
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

// Util
import { AppFormularioUtil } from '../../utils/app-formulario.util';

export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

/*
* tipo="color | date | datetime-local | email | month | number | password | search | tel | text |
        time | url | week"
*/
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, ControlValueAccessor {
  private static idInputContador = 0;

  @Input()
  public isCampoOpicional: boolean;

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

  @Input()
  public tipo: string;

  @Input()
  public tamanhoMaximo?: number;

  @Input()
  public droparCaracterSpecial: boolean;

  @ViewChild('input') private refInput: ElementRef = new ElementRef({});

  public isCampoObrigatorio: boolean;
  public exbibirMsgErro: boolean;
  public complementoId: string;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.isCampoOpicional = false;
    this.label = '';
    this.placeHolder = '';
    this.msgErro = '';
    this.isCampoObrigatorio = !this.isCampoOpicional;
    this.exbibirMsgErro = true;
    this.mascara = '';
    this.somenteLeitura = false;
    this.complementoId = '';
    this.tipo = 'text';
    this.tamanhoMaximo = 524288;
    this.droparCaracterSpecial = true;
  }

  ngOnInit(): void {
    this.complementoId = `${++InputComponent.idInputContador}`;
  }

  ngOnChanges(): void {
    this.changeDetector.detectChanges();
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
    this.propagarAlteracaoValor = fn;
  }

  registerOnTouched(fn: any): void {
    // noop - verificar pq o touched n esta funcionando corretamente
  }

  ngOnDestroy(): void {
    InputComponent.idInputContador--;
  }

  campoInvalido(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched || this.control.errors !== null);
  }

  limpar(): void {
    this.control.setValue('');
  }

  private propagarAlteracaoValor = (_: any) => { };
}
