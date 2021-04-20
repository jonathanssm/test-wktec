/*
 * Enumerador resposável
 * por informar o tipo de resposta da requisição HttpClient.
*/
export enum TipoResposta {
    JSON = 'json',
    TEXT = 'text',
    BLOB = 'blob',
    ARRAY_BUFFER = 'arraybuffer'
}
