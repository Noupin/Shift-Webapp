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
 * @interface VerifyEmailChangeResponse
 */
export interface VerifyEmailChangeResponse {
    /**
     * 
     * @type {boolean}
     * @memberof VerifyEmailChangeResponse
     */
    confirmed?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VerifyEmailChangeResponse
     */
    msg?: string | null;
    /**
     * 
     * @type {string}
     * @memberof VerifyEmailChangeResponse
     */
    nextEmail?: string;
}

export function VerifyEmailChangeResponseFromJSON(json: any): VerifyEmailChangeResponse {
    return VerifyEmailChangeResponseFromJSONTyped(json, false);
}

export function VerifyEmailChangeResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): VerifyEmailChangeResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'confirmed': !exists(json, 'confirmed') ? undefined : json['confirmed'],
        'msg': !exists(json, 'msg') ? undefined : json['msg'],
        'nextEmail': !exists(json, 'nextEmail') ? undefined : json['nextEmail'],
    };
}

export function VerifyEmailChangeResponseToJSON(value?: VerifyEmailChangeResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'confirmed': value.confirmed,
        'msg': value.msg,
        'nextEmail': value.nextEmail,
    };
}


