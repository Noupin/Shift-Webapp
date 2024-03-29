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
 * @interface TrainRequest
 */
export interface TrainRequest {
    /**
     * 
     * @type {string}
     * @memberof TrainRequest
     */
    prebuiltShiftModel?: string;
    /**
     * 
     * @type {string}
     * @memberof TrainRequest
     */
    shiftTitle?: string;
    /**
     * 
     * @type {string}
     * @memberof TrainRequest
     */
    shiftUUID: string;
    /**
     * 
     * @type {string}
     * @memberof TrainRequest
     */
    trainType?: string;
    /**
     * 
     * @type {boolean}
     * @memberof TrainRequest
     */
    usePTM?: boolean;
}

export function TrainRequestFromJSON(json: any): TrainRequest {
    return TrainRequestFromJSONTyped(json, false);
}

export function TrainRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrainRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'prebuiltShiftModel': !exists(json, 'prebuiltShiftModel') ? undefined : json['prebuiltShiftModel'],
        'shiftTitle': !exists(json, 'shiftTitle') ? undefined : json['shiftTitle'],
        'shiftUUID': json['shiftUUID'],
        'trainType': !exists(json, 'trainType') ? undefined : json['trainType'],
        'usePTM': !exists(json, 'usePTM') ? undefined : json['usePTM'],
    };
}

export function TrainRequestToJSON(value?: TrainRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'prebuiltShiftModel': value.prebuiltShiftModel,
        'shiftTitle': value.shiftTitle,
        'shiftUUID': value.shiftUUID,
        'trainType': value.trainType,
        'usePTM': value.usePTM,
    };
}


