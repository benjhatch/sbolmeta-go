
var namespace = require('./namespace')

var URI = require('urijs')

function summarizeGenericTopLevel(genericTopLevel) {

    if (genericTopLevel instanceof URI)
	return {
            uri: genericTopLevel + '',
	    id: genericTopLevel + ''
	}

    return {
        uri: genericTopLevel.uri + '',
        name: name(genericTopLevel),
        id: id(genericTopLevel),
        pid: pid(genericTopLevel),
        version: version(genericTopLevel),
        wasDerivedFrom: wasDerivedFrom(genericTopLevel),
	creator: creator(genericTopLevel),
	created: created(genericTopLevel),
	modified: modified(genericTopLevel),
        mutableDescription: mutableDescription(genericTopLevel),
        mutableNotes: mutableNotes(genericTopLevel),
        dcTermsSource: dcTermsSource(genericTopLevel),
        description: description(genericTopLevel),

	comments: comments(genericTopLevel),
        labels: labels(genericTopLevel),
    }
}

function name(genericTopLevel) {

    return genericTopLevel.name || genericTopLevel.displayId

}

function id(genericTopLevel) {

    return genericTopLevel.displayId /* or last fragment of URI? */

}

function pid(genericTopLevel) {

    return genericTopLevel.persistentIdentity

}

function version(genericTopLevel) {

    return genericTopLevel.version

}

function wasDerivedFrom(genericTopLevel) {

    return genericTopLevel.wasDerivedFrom

}

function description(genericTopLevel) {

    if(genericTopLevel.description)
        return genericTopLevel.description

    var commentAnnotations = comments(genericTopLevel)

    if(commentAnnotations)
        return commentAnnotations.join('\n')

    return ''
}

function creator(genericTopLevel) {
    
    var creatorStr = genericTopLevel.getAnnotations(namespace.dcterms + 'creator')
    if (creatorStr.toString() === '') {
	creatorStr = genericTopLevel.getAnnotations(namespace.dc + 'creator')
    }
    return {
	description: creatorStr
    }
    
}

function created(genericTopLevel) {
    
    
    var resultStr = genericTopLevel.getAnnotations(namespace.dcterms + 'created')
    return {
	name: resultStr,
	description: resultStr.toString().replace('T',' ').replace('Z','')
    }
}

function modified(genericTopLevel) {
    
    var resultStr = genericTopLevel.getAnnotations(namespace.dcterms + 'modified')
    return {
	name: resultStr,
	description: resultStr.toString().replace('T',' ').replace('Z','')
    }
}

function mutableDescription(genericTopLevel) {
    
    return genericTopLevel.getAnnotations(namespace.synbiohub + 'mutableDescription')

}

function mutableNotes(genericTopLevel) {
    
    return genericTopLevel.getAnnotations(namespace.synbiohub + 'mutableNotes')

}

function dcTermsSource(genericTopLevel) {
    
    return genericTopLevel.getAnnotations(namespace.synbiohub + 'mutableProvenance')

}

function labels(genericTopLevel) {
    
    return genericTopLevel.getAnnotations(namespace.rdfs + 'label')

}

function comments(genericTopLevel) {

    return genericTopLevel.getAnnotations(namespace.rdfs + 'comment')

}

module.exports = summarizeGenericTopLevel

