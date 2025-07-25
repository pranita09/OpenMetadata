/*
 *  Copyright 2025 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * Custom MlModel Service connection to build a source that is not supported by OpenMetadata
 * yet.
 */
export interface CustomMlModelConnection {
    connectionOptions?: { [key: string]: string };
    /**
     * Regex to only fetch MlModels with names matching the pattern.
     */
    mlModelFilterPattern?: FilterPattern;
    /**
     * Source Python Class Name to instantiated by the ingestion workflow
     */
    sourcePythonClass?:          string;
    supportsMetadataExtraction?: boolean;
    /**
     * Custom Ml model service type
     */
    type: ServiceType;
}

/**
 * Regex to only fetch MlModels with names matching the pattern.
 *
 * Regex to only fetch entities that matches the pattern.
 */
export interface FilterPattern {
    /**
     * List of strings/regex patterns to match and exclude only database entities that match.
     */
    excludes?: string[];
    /**
     * List of strings/regex patterns to match and include only database entities that match.
     */
    includes?: string[];
}

/**
 * Custom Ml model service type
 */
export enum ServiceType {
    CustomMlModel = "CustomMlModel",
}
