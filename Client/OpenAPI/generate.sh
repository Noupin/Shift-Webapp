npx @openapitools/openapi-generator-cli generate -i Client/OpenAPI/shift.yaml -g typescript-fetch -o src/Client/Swagger --additional-properties="typescriptThreePlus=true,supportsES6=true" --skip-validate-spec