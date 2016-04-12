
function summarizeSequence(sequence) {

    var encoding = mapEncoding(sequence.encoding) || sequence.encoding

    var elements = sequence.elements

    return {
        type: encoding,
        length: sequence.elements.length,
        lengthUnits: lengthUnits(encoding),
        elements: elements
    }
}

function mapEncoding(encoding) {

    return ({
        'http://www.chem.qmul.ac.uk/iupac/AminoAcid/': 'AminoAcid',
        'http://www.chem.qmul.ac.uk/iubmb/misc/naseq.html': 'NucleicAcid'
    })[encoding]

}

function lengthUnits(encoding) {

    return ({
        'AminoAcid': 'aa',
        'NucleicAcid': 'bp'
    })[encoding]

}

module.exports = summarizeSequence

