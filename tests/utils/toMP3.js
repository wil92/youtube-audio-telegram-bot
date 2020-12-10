const chai = require('chai');
const toMP3 = require('../../lib/utils/toMP3');

const expect = chai.expect;

describe('toMP3', () => {
    it('should correct the file name', () => {
        expect(toMP3('IGNACIO GIMENEZ CUBA. EN JUNIO O JULIO DE 2021 CUBA YA SERÁ LIBRE. MIRA POR QUÉ...-rIbRa0pwfhA.webm'))
            .to.equal('IGNACIO GIMENEZ CUBA. EN JUNIO O JULIO DE 2021 CUBA YA SERÁ LIBRE. MIRA POR QUÉ...-rIbRa0pwfhA.mp3');
    });

    it('should correct the file name', () => {
        const value = '\n \nIGNACIO GIMENEZ CUBA. EN JUNIO O JULIO DE 2021 CUBA YA SERÁ LIBRE. MIRA POR QUÉ...-rIbRa0pwfhA.webm\n\n';
        expect(toMP3(value))
            .to.equal('IGNACIO GIMENEZ CUBA. EN JUNIO O JULIO DE 2021 CUBA YA SERÁ LIBRE. MIRA POR QUÉ...-rIbRa0pwfhA.mp3');
    });
});
