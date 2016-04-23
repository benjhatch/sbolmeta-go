
function summarizeSequence(sequence) {

    var encodingUri = sequence.encoding + ''

    var encoding = mapEncoding(encodingUri) || encodingUri

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
        'http://www.chem.qmul.ac.uk/iubmb/misc/naseq.html': 'NucleicAcid',
        'http://dx.doi.org/10.1021/bi00822a023': 'NucleicAcid'
    })[encoding]

}

function lengthUnits(encoding) {

    return ({
        'AminoAcid': 'aa',
        'NucleicAcid': 'bp'
    })[encoding]

}

module.exports = summarizeSequence

