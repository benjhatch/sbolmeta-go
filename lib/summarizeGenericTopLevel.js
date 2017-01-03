
var namespace = require('./namespace')

function summarizeGenericTopLevel(genericTopLevel) {

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
        igemDescription: igemDescription(genericTopLevel),
        igemNotes: igemNotes(genericTopLevel),
        dcTermsSource: dcTermsSource(genericTopLevel),
        igemResults: igemResults(genericTopLevel),
        igemStatus: igemStatus(genericTopLevel),
        igemPartStatus: igemPartStatus(genericTopLevel),
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

function igemDescription(genericTopLevel) {
    
    return genericTopLevel.getAnnotations(namespace.igem + 'description')

}

function igemNotes(genericTopLevel) {
    
    return genericTopLevel.getAnnotations(namespace.igem + 'notes')

}

function dcTermsSource(genericTopLevel) {
    
    return genericTopLevel.getAnnotations(namespace.dcterms + 'source')

}

function igemResults(genericTopLevel) {
    
    var resultUri = genericTopLevel.getAnnotations(namespace.igem + 'results')
    return {
	uri: resultUri,
	description: 'igem:' + resultUri.toString().replace(namespace.igem + "results/",'')
    }

}

function igemStatus(genericTopLevel) {
    
    var statusUri = genericTopLevel.getAnnotations(namespace.igem + 'status')
    return {
	uri: statusUri,
	description: 'igem:' + statusUri.toString().replace(namespace.igem + "status/",'')
    }

}

function igemPartStatus(genericTopLevel) {
    
    var partStatusStr = genericTopLevel.getAnnotations(namespace.igem + 'partStatus')
    return {
	description: partStatusStr
    }

}

function labels(genericTopLevel) {
    
    return genericTopLevel.getAnnotations(namespace.rdfs + 'label')

}

function comments(genericTopLevel) {

    return genericTopLevel.getAnnotations(namespace.rdfs + 'comment')

}

module.exports = summarizeGenericTopLevel

