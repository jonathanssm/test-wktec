import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

// Modelo
import { Opcao } from '../../modelo/opcao';

export const RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioComponent),
  multi: true
};

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [RADIO_CONTROL_VALUE_ACCESSOR]
})
export class RadioComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  private static idRadioContador = 0;

  @Input()
  public id: string;

  @Input()
  public listaOpcao: Array<Opcao> = [];

  @Input()
  public control: FormControl = new FormControl({});

  @Input()
  public somenteLeitura?: boolean;

  @Output()
  public selecionarOpcao: EventEmitter<any> = new EventEmitter();

  public opcaoSelecionada: any;
  public complementoId: string;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.id = '';
    this.opcaoSelecionada = null;
    this.complementoId = '';
    this.somenteLeitura = false;
  }

  ngOnInit(): void {
    this.complementoId = `${++RadioComponent.idRadioContador}`;
  }

  ngAfterViewInit(): void {
    this.complementoId += `${this.id}`;
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    RadioComponent.idRadioContador--;
  }

  // Inicio - Metodos da interface ControlValueAccessor
  writeValue(value: any): void {
    this.opcaoSelecionada = value;
    if (value !== null) {
      this.control.markAsTouched();
      this.onChanges(new Event('change'), value);
    }
  }

  registerOnChange(fn: any): void {
    this.propagarAlteracaoValor = fn;
  }

  registerOnTouched(fn: any): void {
    // noop
  }
  // Fim

  onChanges(e: any, value: any): void {
    this.opcaoSelecionada = value;

    this.selecionarOpcao.emit(this.opcaoSelecionada);
    this.propagarAlteracaoValor(this.opcaoSelecionada);
  }

  isOpcaoSelecionada(opcaoSelecionada: any): boolean {
    return this.opcaoSelecionada != null && (this.opcaoSelecionada === opcaoSelecionada);
  }

  private propagarAlteracaoValor = (_: any) => { };
}
