import _ from 'lodash';


// ------------------------------------
// MESSAGES & ICONS
// ------------------------------------

const issuesStylesDefault = {
    iconPropertyError: '⚠️',
    iconPropertyMissing: '❌'
}

const errorInvalidSchema = `You must provide a valid schema!`


// ------------------------------------
// PUBLIC FUNCTIONS
// ------------------------------------

/**
 * Function that validates the given JSON data against the provided Zod schema.
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
 * @throws {Error} - If any of the required parameters are missing.
 *
 * @example
 * import { z } from "zod";
 * 
 * const zodSchema = z.array(
 *   z.object({
 *     id: z.string().uuid(),
 *     name: z.string(),
 *     age: z.number().int(), // Zod uses `number()` for integers, and `int()` ensures it's an integer.
 *     email: z.string().email(),
 *     created_at: z.string().datetime(), // Zod provides `.datetime()` for ISO datetime strings.
 *     is_active: z.boolean(),
 *     tags: z.array(z.string()),
 *     address: z.object({
 *       street: z.string(),
 *       city: z.string(),
 *       postal_code: z.string(),
 *     }),
 *     preferences: z
 *       .object({
 *         notifications: z.boolean(),
 *         theme: z.string().optional(), // Optional as it is not marked as required in JSON Schema.
 *         items_per_page: z.number().int().optional(), // Optional as it is not marked as required.
 *       })
 *       .strict(),
 *   }).strict()
 * );
 *
 * const response = ... (is the response object from the API request)
 * const data = response.body
 * const issuesStyles = { iconPropertyError: '⚠️', iconPropertyMissing: '❌' }; // Custom icons for issues
 * 
 * const validationResult = validateSchemaZod(data, zodSchema, issuesStyles);
 * console.log(validationResult.errors); // Array of validation errors, or null if not found
 * console.log(validationResult.dataMismatches); // Data with mismatches flagged
 */
export const validateSchemaZod = (data, schema,  issuesStyles = {}) => {

    if (schema == null) {
        console.log(errorInvalidSchema)
        throw new Error(errorInvalidSchema)
    }

    issuesStyles = { ...issuesStylesDefault, ...issuesStyles }

    // Validate the response body against the schema
    const { errors, dataMismatches } = _validateSchemaZOD(schema, data, issuesStyles)

    return { errors, dataMismatches, issuesStyles }
}

// ------------------------------------
// PRIVATE FUNCTIONS
// ------------------------------------

/**
 * Validates JSON data against a ZOD schema using ZOD Schema validator.
 * @private
 *
 * @param {object} schema - The ZOD schema to validate against.
 * @param {object} data - The data to be validated.
 * @param {object} issuesStyles - An object with the icons used to flag the issues. Contains: iconPropertyError, iconPropertyMissing.
 * 
 * @returns {object} - An object containing the validation result and any errors: { valid, errors, dataMismatches }.
 * 
 * @example
 * const zodSchema = {
 *   // ... Zod schema definition
 * }
 *
 * const data = {
 *   name: 'John Wick',
 *   age: 49
 * }
 *
 * const validationResult = _validateSchemaAJV(schema, data, issuesStyles)
 * console.log(validationResult.valid) // true
 * console.log(validationResult.errors) // null if no errors, or an array of errors
 * console.log(validationResult.dataMismatches) // Data with mismatches flagged
 */
const _validateSchemaZOD = (schema, data, issuesStyles) => {

    const { iconPropertyError, iconPropertyMissing } = issuesStyles

    const result = schema.safeParse(data)

    const valid = result.success
    const errors = valid ? null : result.error.issues

    // Create a copy of the data validated to show the mismatches
    const dataMismatches = _.cloneDeep(data)

    if (!valid) {
        errors.forEach(error => {
            let instancePath = error.path.join('.')

            let errorDescription
            let value = _.get(data, instancePath)

            if (error.message === 'Required') {
                errorDescription = `${iconPropertyMissing} Missing property`
            } else {
                const message = error.message
                const valueDisplay = String(JSON.stringify(value)).replaceAll("\"", "'") // We also use String() to handle the case of undefined values
                errorDescription = ` ${iconPropertyError} ${valueDisplay} ${message}`
            }
            _.set(dataMismatches, instancePath, errorDescription)
        })
    }

    return { 
        valid, 
        errors, 
        dataMismatches 
    }
}

