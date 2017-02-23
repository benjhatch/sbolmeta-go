
var namespace = require('./namespace')

var URI = require('urijs')

function summarizeModuleDefinition(moduleDefinition) {

    if (moduleDefinition instanceof URI)
	return {
            uri: moduleDefinition + '',
	    id: moduleDefinition + ''
	}

    var summary = {

        uri: moduleDefinition.uri + '',

        name: name(moduleDefinition),
        id: id(moduleDefinition),
        pid: pid(moduleDefinition),
        version: version(moduleDefinition),
        wasDerivedFrom: wasDerivedFrom(moduleDefinition),
	creator: creator(moduleDefinition),
	created: created(moduleDefinition),
	modified: modified(moduleDefinition),
        mutableDescription: mutableDescription(moduleDefinition),
        mutableNotes: mutableNotes(moduleDefinition),
        source: source(moduleDefinition),
        description: description(moduleDefinition),

        numSubModules: moduleDefinition.modules.length,
        numSubModulesTotal: 0,

        comments: comments(moduleDefinition),
        labels: labels(moduleDefinition)
    }

    var uploadedBy = moduleDefinition.getAnnotation(namespace.synbiohub + 'uploadedBy')

    if(uploadedBy) {

        summary.synbiohub = {
            uploadedBy: uploadedBy
        }
    }

    return summary
}

module.exports = summarizeModuleDefinition


function name(moduleDefinition) {

    return moduleDefinition.name || moduleDefinition.displayId

}

function id(moduleDefinition) {

    return moduleDefinition.displayId /* or last fragment of URI? */

}

function pid(moduleDefinition) {

    return moduleDefinition.persistentIdentity

}

function version(moduleDefinition) {

    return moduleDefinition.version

}

function wasDerivedFrom(moduleDefinition) {

    return moduleDefinition.wasDerivedFrom

}

function description(moduleDefinition) {

    if(moduleDefinition.description)
        return moduleDefinition.description

    var commentAnnotations = comments(moduleDefinition)

    if(commentAnnotations)
        return commentAnnotations.join('\n')

    return ''
}

function creator(moduleDefinition) {

    var creatorStr = moduleDefinition.getAnnotations(namespace.dcterms + 'creator')
    if (creatorStr.toString() === '') {
	creatorStr = moduleDefinition.getAnnotations(namespace.dc + 'creator')
    }
    return {
	description: creatorStr
    }
    
}

function created(moduleDefinition) {
    
    
    var resultStr = moduleDefinition.getAnnotations(namespace.dcterms + 'created')
    return {
	name: resultStr,
	description: resultStr.toString().replace('T',' ').replace('Z','')
    }
}

function modified(moduleDefinition) {
    
    var resultStr = moduleDefinition.getAnnotations(namespace.dcterms + 'modified')
    return {
	name: resultStr,
	description: resultStr.toString().replace('T',' ').replace('Z','')
    }
}

function mutableDescription(moduleDefinition) {
    
    return moduleDefinition.getAnnotations(namespace.synbiohub + 'mutableDescription')

}

function mutableNotes(moduleDefinition) {
    
    return moduleDefinition.getAnnotations(namespace.synbiohub + 'mutableNotes')

}

function source(moduleDefinition) {
    
    return moduleDefinition.getAnnotations(namespace.dcterms + 'source')

}

function labels(moduleDefinition) {
    
    return moduleDefinition.getAnnotations(namespace.rdfs + 'label')

}

function comments(moduleDefinition) {

    return moduleDefinition.getAnnotations(namespace.rdfs + 'comment')

}





