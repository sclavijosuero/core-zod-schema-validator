/**
 * Validates the given JSON data against the provided schema.
 * 
 * @public
 * 
 * @param {any} data - JSON data to be validated.
 * @param {object} schema - The Zod schema to validate against. See https://zod.dev/ for more information.
 * @param {object} [issuesStyles] - An object with the icons and HEX colors used to flag the issues.
 * @param {string} [issuesStyles.iconPropertyError] - The icon used to flag the property error.
 * @param {string} [issuesStyles.iconPropertyMissing] - The icon used to flag the missing property.
 * 
 * @returns {object} - An object containing:
 *   - errors: An array of validation errors as provided by Zod, or null if the data is valid against the schema.
 *   - dataMismatches: The original response data with all schema mismatches flagged directly.
 *   - issuesStyles: The styles object used for flagging issues.
 *
 * @throws {Error} - If any of the required parameters are missing or if the schema or schema definition is not found.
 */

export declare function validateSchemaZod(
    data: any,
    schema: any,
    issuesStyles?: object
): object;
