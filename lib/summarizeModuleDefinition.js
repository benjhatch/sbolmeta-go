
var namespace = require('./namespace')

function summarizeModuleDefinition(moduleDefinition) {

    var summary = {

        uri: moduleDefinition.uri + '',

        name: name(moduleDefinition),
        id: id(moduleDefinition),
        wasDerivedFrom: wasDerivedFrom(moduleDefinition),
	creator: creator(moduleDefinition),
	created: created(moduleDefinition),
	modified: modified(moduleDefinition),
        igemDescription: igemDescription(moduleDefinition),
        igemNotes: igemNotes(moduleDefinition),
        source: source(moduleDefinition),
        igemResults: igemResults(moduleDefinition),
        igemStatus: igemStatus(moduleDefinition),
        igemPartStatus: igemPartStatus(moduleDefinition),
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

function igemDescription(moduleDefinition) {
    
    return moduleDefinition.getAnnotations(namespace.igem + 'description')

}

function igemNotes(moduleDefinition) {
    
    return moduleDefinition.getAnnotations(namespace.igem + 'notes')

}

function source(moduleDefinition) {
    
    return moduleDefinition.getAnnotations(namespace.dcterms + 'source')

}

function igemResults(moduleDefinition) {
    
    var resultUri = moduleDefinition.getAnnotations(namespace.igem + 'results')
    return {
	uri: resultUri,
	description: 'igem:' + resultUri.toString().replace(namespace.igem + "results/",'')
    }

}

function igemStatus(moduleDefinition) {
    
    var statusUri = moduleDefinition.getAnnotations(namespace.igem + 'status')
    return {
	uri: statusUri,
	description: 'igem:' + statusUri.toString().replace(namespace.igem + "status/",'')
    }

}

function igemPartStatus(moduleDefinition) {
    
    var partStatusStr = moduleDefinition.getAnnotations(namespace.igem + 'partStatus')
    return {
	description: partStatusStr
    }

}

function labels(moduleDefinition) {
    
    return moduleDefinition.getAnnotations(namespace.rdfs + 'label')

}

function comments(moduleDefinition) {

    return moduleDefinition.getAnnotations(namespace.rdfs + 'comment')

}




