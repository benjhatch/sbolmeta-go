
var namespace = require('./namespace')

function summarizeSequence(sequence) {

    var encodingUri = sequence.encoding + ''

    var encoding = mapEncoding(encodingUri) || encodingUri

    var elements = sequence.elements

    return {
        uri: sequence.uri + '',
        name: name(sequence),
        id: id(sequence),
        pid: pid(sequence),
        version: version(sequence),
        wasDerivedFrom: wasDerivedFrom(sequence),
	creator: creator(sequence),
	created: created(sequence),
	modified: modified(sequence),
        igemDescription: igemDescription(sequence),
        igemNotes: igemNotes(sequence),
        source: source(sequence),
        igemResults: igemResults(sequence),
        igemStatus: igemStatus(sequence),
        igemPartStatus: igemPartStatus(sequence),
        description: description(sequence),

        type: encoding,
        length: sequence.elements.length,
        lengthUnits: lengthUnits(encoding),
        elements: elements,

	comments: comments(sequence),
        labels: labels(sequence),
    }
}

function name(sequence) {

    return sequence.name || sequence.displayId

}

function id(sequence) {

    return sequence.displayId /* or last fragment of URI? */

}

function pid(sequence) {

    return sequence.persistentIdentity

}

function version(sequence) {

    return sequence.version

}

function wasDerivedFrom(sequence) {

    return sequence.wasDerivedFrom

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

function description(sequence) {

    if(sequence.description)
        return sequence.description

    var commentAnnotations = comments(sequence)

    if(commentAnnotations)
        return commentAnnotations.join('\n')

    return ''
}

function creator(sequence) {
    
    var creatorStr = sequence.getAnnotations(namespace.dcterms + 'creator')
    return {
	description: creatorStr
    }
    
}

function created(sequence) {
    
    
    var resultStr = sequence.getAnnotations(namespace.dcterms + 'created')
    return {
	name: resultStr,
	description: resultStr.toString().replace('T',' ').replace('Z','')
    }
}

function modified(sequence) {
    
    var resultStr = sequence.getAnnotations(namespace.dcterms + 'modified')
    return {
	name: resultStr,
	description: resultStr.toString().replace('T',' ').replace('Z','')
    }
}

function igemDescription(sequence) {
    
    return sequence.getAnnotations(namespace.igem + 'description')

}

function igemNotes(sequence) {
    
    return sequence.getAnnotations(namespace.igem + 'notes')

}

function source(sequence) {
    
    return sequence.getAnnotations(namespace.dcterms + 'source')

}

function igemResults(sequence) {
    
    var resultUri = sequence.getAnnotations(namespace.igem + 'results')
    return {
	uri: resultUri,
	description: resultUri.toString().replace(namespace.igem + "results/",'')
    }

}

function igemStatus(sequence) {
    
    var statusUri = sequence.getAnnotations(namespace.igem + 'status')
    return {
	uri: statusUri,
	description: statusUri.toString().replace(namespace.igem + "status/",'')
    }

}

function igemPartStatus(sequence) {
    
    var partStatusStr = sequence.getAnnotations(namespace.igem + 'partStatus')
    return {
	description: partStatusStr
    }

}

function labels(sequence) {
    
    return sequence.getAnnotations(namespace.rdfs + 'label')

}

function comments(sequence) {

    return sequence.getAnnotations(namespace.rdfs + 'comment')

}

module.exports = summarizeSequence

