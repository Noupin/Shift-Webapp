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


import * as runtime from '../runtime';
import {
    InferenceRequest,
    InferenceRequestFromJSON,
    InferenceRequestToJSON,
    InferenceResponse,
    InferenceResponseFromJSON,
    InferenceResponseToJSON,
    InferenceStatusResponse,
    InferenceStatusResponseFromJSON,
    InferenceStatusResponseToJSON,
} from '../models';

export interface InferenceOperationRequest {
    body?: InferenceRequest;
}

export interface InferenceStatusRequest {
    body?: InferenceRequest;
}

/**
 * 
 */
export class InferenceApi extends runtime.BaseAPI {

    /**
     * Inferencing based on a specialized pretrained model(PTM) where, the input is the face to be put on the media and inferenced with PTM. Alternativley inferencing with a given base video and shift face with a non specialized PTM.
     */
    async inferenceRaw(requestParameters: InferenceOperationRequest): Promise<runtime.ApiResponse<InferenceResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["session"] = this.configuration.apiKey("session"); // UserAuth authentication
        }

        const response = await this.request({
            path: `/api/inference`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InferenceRequestToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InferenceResponseFromJSON(jsonValue));
    }

    /**
     * Inferencing based on a specialized pretrained model(PTM) where, the input is the face to be put on the media and inferenced with PTM. Alternativley inferencing with a given base video and shift face with a non specialized PTM.
     */
    async inference(requestParameters: InferenceOperationRequest): Promise<InferenceResponse> {
        const response = await this.inferenceRaw(requestParameters);
        return await response.value();
    }

    /**
     * The status of the current shift model while inferencing on the original media and whether or not it has stopped inferencing.
     */
    async inferenceStatusRaw(requestParameters: InferenceStatusRequest): Promise<runtime.ApiResponse<InferenceStatusResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["session"] = this.configuration.apiKey("session"); // UserAuth authentication
        }

        const response = await this.request({
            path: `/api/inferenceStatus`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InferenceRequestToJSON(requestParameters.body),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InferenceStatusResponseFromJSON(jsonValue));
    }

    /**
     * The status of the current shift model while inferencing on the original media and whether or not it has stopped inferencing.
     */
    async inferenceStatus(requestParameters: InferenceStatusRequest): Promise<InferenceStatusResponse> {
        const response = await this.inferenceStatusRaw(requestParameters);
        return await response.value();
    }

}
