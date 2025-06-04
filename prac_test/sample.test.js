const { calculatTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('./math'); 


test('Should calculate total with tip', () => {
    const total = calculatTip(10, 0.3);
    expect(total).toBe(13);
})

test('Should convert 32 F to 0 C', () => {
    const converted = fahrenheitToCelsius(32);
    expect(converted).toBe(0);

})

test('Should convert 0 C to 32 F', () => {
    const converted = celsiusToFahrenheit(0);
    expect(converted).toBe(32);
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         try {
//             expect(1).toBe(1); // This expectation will fail
//             done(); // Call done() if the expectation passes
//         } catch (error) {
//             console.log(error);
//             done(); // Pass the error to done() if the expectation fails
//         }
//     }, 1000);
// });

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {

            expect(sum).toBe(5); // This expectation will fail
            done(); // Call done() if the expectation passes
        


    })

})

test('Should add two numbers async/await', async () => {
    const sum = await add(2, 2);
    expect(sum).toBe(3);
})






