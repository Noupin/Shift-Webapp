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
 * @interface IndividualShiftDeleteResponse
 */
export interface IndividualShiftDeleteResponse {
    /**
     * 
     * @type {string}
     * @memberof IndividualShiftDeleteResponse
     */
    msg?: string | null;
}

export function IndividualShiftDeleteResponseFromJSON(json: any): IndividualShiftDeleteResponse {
    return IndividualShiftDeleteResponseFromJSONTyped(json, false);
}

export function IndividualShiftDeleteResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): IndividualShiftDeleteResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'msg': !exists(json, 'msg') ? undefined : json['msg'],
    };
}

export function IndividualShiftDeleteResponseToJSON(value?: IndividualShiftDeleteResponse | null): any {
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

