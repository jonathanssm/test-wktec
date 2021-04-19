import { FormGroup, FormControl } from '@angular/forms';

export class AppFormularioUtil {

    /*
    * A partir do FormControl passado por parametro e recuperado o nome do mesmo
    *
    * @param control
    */
    public static getNomeFormControl(control: FormControl): string {
        let nomeFormControl = '';
        const parent = control.parent;

        // somente o 'parent' do tipo FormGroup e q possui as informacoes sobre o nome do FormControl
        if (parent instanceof FormGroup) {
            // interacao nas chaves q no caso sao os nomes do FormControl
            Object.keys(parent.controls).forEach((nomeFormControlIteracao) => {
                if (control === parent.controls[nomeFormControlIteracao]) {
                    nomeFormControl = nomeFormControlIteracao;
                }
            });
        }

        return nomeFormControl;
    }
}
