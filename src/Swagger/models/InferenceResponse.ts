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
 * @interface InferenceResponse
 */
export interface InferenceResponse {
    /**
     * 
     * @type {string}
     * @memberof InferenceResponse
     */
    msg?: string | null;
}

export function InferenceResponseFromJSON(json: any): InferenceResponse {
    return InferenceResponseFromJSONTyped(json, false);
}

export function InferenceResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): InferenceResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'msg': !exists(json, 'msg') ? undefined : json['msg'],
    };
}

export function InferenceResponseToJSON(value?: InferenceResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'msg': value.msg,
    };
}

