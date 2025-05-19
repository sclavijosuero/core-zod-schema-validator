import { validateSchemaZod } from '../../src/index.js'
import errorSchema from '../fixtures/schemas/zod-schema-error-sample2.js'


it('Test Zod Schema - Sample 2 - Error Schema', () => {
    const findByStatusReq = {
        url: 'https://petstore.swagger.io/v2/pet/findByStatus?status=pending',
        headers: { 'Content-Type': 'application/json' }
    }

    cy.request(findByStatusReq).then((response) => {
        const result = validateSchemaZod(response.body, errorSchema)

        console.log('*********** Results Test Zod Schema - Sample 2 - Error Schema')
        console.log(result.errors)
        console.log(result.dataMismatches)

        expect(result.errors).not.to.be.null

    });
})
