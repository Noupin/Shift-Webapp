/* tslint:disable */
/* eslint-disable */
/**
 * Shift
 * Shift Server API documentation
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InferenceStatusReponse
 */
export interface InferenceStatusReponse {
    /**
     * 
     * @type {string}
     * @memberof InferenceStatusReponse
     */
    baseMediaFilename?: string | null;
    /**
     * 
     * @type {string}
     * @memberof InferenceStatusReponse
     */
    maskMediaFilename?: string | null;
    /**
     * 
     * @type {string}
     * @memberof InferenceStatusReponse
     */
    mediaFilename?: string | null;
    /**
     * 
     * @type {string}
     * @memberof InferenceStatusReponse
     */
    msg?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof InferenceStatusReponse
     */
    stopped?: boolean | null;
}

export function InferenceStatusReponseFromJSON(json: any): InferenceStatusReponse {
    return InferenceStatusReponseFromJSONTyped(json, false);
}

export function InferenceStatusReponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): InferenceStatusReponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'baseMediaFilename': !exists(json, 'baseMediaFilename') ? undefined : json['baseMediaFilename'],
        'maskMediaFilename': !exists(json, 'maskMediaFilename') ? undefined : json['maskMediaFilename'],
        'mediaFilename': !exists(json, 'mediaFilename') ? undefined : json['mediaFilename'],
        'msg': !exists(json, 'msg') ? undefined : json['msg'],
        'stopped': !exists(json, 'stopped') ? undefined : json['stopped'],
    };
}

export function InferenceStatusReponseToJSON(value?: InferenceStatusReponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'baseMediaFilename': value.baseMediaFilename,
        'maskMediaFilename': value.maskMediaFilename,
        'mediaFilename': value.mediaFilename,
        'msg': value.msg,
        'stopped': value.stopped,
    };
}


