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
import {
    Shift,
    ShiftFromJSON,
    ShiftFromJSONTyped,
    ShiftToJSON,
} from './';

/**
 * 
 * @export
 * @interface IndividualShiftPutRequest
 */
export interface IndividualShiftPutRequest {
    /**
     * 
     * @type {Shift}
     * @memberof IndividualShiftPutRequest
     */
    shift?: Shift;
}

export function IndividualShiftPutRequestFromJSON(json: any): IndividualShiftPutRequest {
    return IndividualShiftPutRequestFromJSONTyped(json, false);
}

export function IndividualShiftPutRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): IndividualShiftPutRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'shift': !exists(json, 'shift') ? undefined : ShiftFromJSON(json['shift']),
    };
}

export function IndividualShiftPutRequestToJSON(value?: IndividualShiftPutRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'shift': ShiftToJSON(value.shift),
    };
}


