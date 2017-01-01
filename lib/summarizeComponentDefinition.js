
var namespace = require('./namespace')

var summarizeProtein = require('./summarizeProtein')
var summarizeSequence = require('./summarizeSequence')

function summarizeComponentDefinition(componentDefinition) {

    var summary = {

        uri: componentDefinition.uri + '',

        name: name(componentDefinition),
        id: id(componentDefinition),
        wasDerivedFrom: wasDerivedFrom(componentDefinition),
	creator: creator(componentDefinition),
	created: created(componentDefinition),
	modified: modified(componentDefinition),
        igemDescription: igemDescription(componentDefinition),
        igemNotes: igemNotes(componentDefinition),
        source: source(componentDefinition),
        igemResults: igemResults(componentDefinition),
        igemStatus: igemStatus(componentDefinition),
        igemPartStatus: igemPartStatus(componentDefinition),
        description: description(componentDefinition),
        type: type(componentDefinition),
        types: types(componentDefinition),

        roles: roles(componentDefinition),

        numSubComponents: componentDefinition.components.length,
        numSubComponentsTotal: 0,
        numSequences: 0,

        comments: comments(componentDefinition),
        labels: labels(componentDefinition),

        sequences: sequences(componentDefinition)
    }

    switch(summary.type) {

        case 'Protein':
            summary.protein = summarizeProtein(componentDefinition)
            break
    }

    var uploadedBy = componentDefinition.getAnnotation(namespace.synbiohub + 'uploadedBy')

    if(uploadedBy) {

        summary.synbiohub = {
            uploadedBy: uploadedBy
        }
    }

    return summary
}

module.exports = summarizeComponentDefinition


function name(componentDefinition) {

    return componentDefinition.name || componentDefinition.displayId

}

function id(componentDefinition) {

    return componentDefinition.displayId /* or last fragment of URI? */

}

function wasDerivedFrom(componentDefinition) {

    return componentDefinition.wasDerivedFrom

}

function type(componentDefinition) {

    /* TODO pick DNA/RNA/protein if one of those types is in the list
     */
    return types(componentDefinition)[0]

}

function types(componentDefinition) {

    return componentDefinition.types.map((uri) => {

        uri = '' + uri

        var prefix = namespace.biopax

        if(uri.indexOf(prefix) === 0) {

            var biopaxTerm = uri.slice(prefix.length)

            return {
                uri: uri,
                term: biopaxTerm,
                description: { name: biopaxTerm }
            }
        }

        for(var i = 0; i < namespace.so.length; ++ i) {

            var prefix = namespace.so[i]

            if(uri.indexOf(prefix) === 0) {

                var soTerm = uri.slice(prefix.length).split('_').join(':')

                var sequenceOntology = require('./sequence-ontology')

                return {
                    uri: uri,
                    term: soTerm,
                    description: sequenceOntology[soTerm]
                }
            }
        }

        return {
            uri: uri
        }
    })
}

function description(componentDefinition) {

    if(componentDefinition.description)
        return componentDefinition.description

    var commentAnnotations = comments(componentDefinition)

    if(commentAnnotations)
        return commentAnnotations.join('\n')

    return ''
}

function creator(componentDefinition) {
    
    var creatorStr = componentDefinition.getAnnotations(namespace.dcterms + 'creator')
    return {
	description: creatorStr
    }
    
}

function created(componentDefinition) {
    
    
    var resultStr = componentDefinition.getAnnotations(namespace.dcterms + 'created')
    return {
	name: resultStr,
	description: resultStr.toString().replace('T',' ').replace('Z','')
    }
}

function modified(componentDefinition) {
    
    var resultStr = componentDefinition.getAnnotations(namespace.dcterms + 'modified')
    return {
	name: resultStr,
	description: resultStr.toString().replace('T',' ').replace('Z','')
    }
}

function igemDescription(componentDefinition) {
    
    return componentDefinition.getAnnotations(namespace.igem + 'description')

}

function igemNotes(componentDefinition) {
    
    return componentDefinition.getAnnotations(namespace.igem + 'notes')

}

function source(componentDefinition) {
    
    return componentDefinition.getAnnotations(namespace.dcterms + 'source')

}

function igemResults(componentDefinition) {
    
    var resultUri = componentDefinition.getAnnotations(namespace.igem + 'results')
    return {
	uri: resultUri,
	description: 'igem:' + resultUri.toString().replace(namespace.igem + "results/",'')
    }

}

function igemStatus(componentDefinition) {
    
    var statusUri = componentDefinition.getAnnotations(namespace.igem + 'status')
    return {
	uri: statusUri,
	description: 'igem:' + statusUri.toString().replace(namespace.igem + "status/",'')
    }

}

function igemPartStatus(componentDefinition) {
    
    var partStatusStr = componentDefinition.getAnnotations(namespace.igem + 'partStatus')
    return {
	description: partStatusStr
    }

}

function labels(componentDefinition) {
    
    return componentDefinition.getAnnotations(namespace.rdfs + 'label')

}

function comments(componentDefinition) {

    return componentDefinition.getAnnotations(namespace.rdfs + 'comment')

}

function sequences(componentDefinition) {

    return componentDefinition.sequences.map(summarizeSequence)

}

function roles(componentDefinition) {
 
    return componentDefinition.roles.map((uri) => {

        uri = '' + uri

        for(var i = 0; i < namespace.so.length; ++ i) {

            var prefix = namespace.so[i]

            if(uri.indexOf(prefix) === 0) {

                var soTerm = uri.slice(prefix.length).split('_').join(':')

                var sequenceOntology = require('./sequence-ontology')

                return {
                    uri: uri,
                    term: soTerm,
                    description: sequenceOntology[soTerm]
                }
            }
        }

        return {
            uri: uri
        }
    })
}





