import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Util
import { AppHttpUtil } from 'src/app/compartilhado/utils/app-http-util';

@Injectable()
export class AppServico {

    constructor(private httpClient: HttpClient) { }
}
