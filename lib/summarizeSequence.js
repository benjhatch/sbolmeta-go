
function summarizeSequence(sequence) {

    var encoding = mapEncoding(sequence.encoding) || sequence.encoding

    return {
        type: encoding,
        length: sequence.elements.length,
        elements: sequence.elements
    }
}

function mapEncoding(encoding) {

    return ({
        'http://www.chem.qmul.ac.uk/iupac/AminoAcid/': 'AminoAcid'
    })[encoding]

}

module.exports = summarizeSequence

