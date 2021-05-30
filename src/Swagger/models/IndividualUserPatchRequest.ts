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
 * @interface IndividualUserPatchRequest
 */
export interface IndividualUserPatchRequest {
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof IndividualUserPatchRequest
     */
    data: { [key: string]: object; };
}

export function IndividualUserPatchRequestFromJSON(json: any): IndividualUserPatchRequest {
    return IndividualUserPatchRequestFromJSONTyped(json, false);
}

export function IndividualUserPatchRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): IndividualUserPatchRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': json['data'],
    };
}

export function IndividualUserPatchRequestToJSON(value?: IndividualUserPatchRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data,
    };
}


