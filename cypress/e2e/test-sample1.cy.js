import { validateSchemaZod } from '../../src/index.js'
import schema from '../fixtures/schemas/zod-schema-sample1.js'

import dataPass from '../fixtures/mock-data/sample1-pass.json'
import dataFail from '../fixtures/mock-data/sample1-fail.json'


it('Test Zod Schema - Sample 1 - Pass', () => {
    const result = validateSchemaZod(dataPass, schema)
    console.log('*********** Results Test Simple Zod Schema Pass')
    console.log(result.errors)
    console.log(result.dataMismatches)

    expect(result.errors).to.be.null

});


it('Test Zod Schema - Sample 1 - Fail default Style', () => {
    const result = validateSchemaZod(dataFail, schema)
    console.log('*********** Results Test Simple Zod Schema Fail default Style')
    console.log(result.errors)
    console.log(result.dataMismatches)

    expect(result.errors).not.to.be.null
});


it('Test Zod Schema - Sample 1 - Fail custom Style', () => {
    const result = validateSchemaZod(dataFail, schema, { iconPropertyError: '⛔', iconPropertyMissing: '❓' })
    console.log('*********** Results Test Simple Zod Schema Fail custom Style')
    console.log(result.errors)
    console.log(result.dataMismatches)

    expect(result.errors).not.to.be.null
});