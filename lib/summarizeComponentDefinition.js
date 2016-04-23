
var namespace = require('./namespace')

var summarizeProtein = require('./summarizeProtein')
var summarizeSequence = require('./summarizeSequence')

function summarizeComponentDefinition(componentDefinition) {

    var summary = {

        uri: componentDefinition.uri + '',

        name: name(componentDefinition),
        id: id(componentDefinition),
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

function type(componentDefinition) {

    /* TODO pick DNA/RNA/protein if one of those types is in the list
     */
    return types(componentDefinition)[0]

}

function types(componentDefinition) {

    return componentDefinition.types.map((type) => (({

        'http://www.biopax.org/release/biopax-level3.owl#DnaRegion': 'DNA',
        'http://www.biopax.org/release/biopax-level3.owl#Protein': 'Protein'

    })[type] || type))

}

function description(componentDefinition) {

    if(componentDefinition.description)
        return componentDefinition.description

    var commentAnnotations = comments(componentDefinition)

    if(commentAnnotations)
        return commentAnnotations.join('\n')

    return ''
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





