
var namespace = require('./namespace')

var summarizeProtein = require('./summarizeProtein')
var summarizeSequence = require('./summarizeSequence')

var base64 = require('./base64')

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

function creator(componentDefinition) {
    
    return componentDefinition.getAnnotations(namespace.dcterms + 'creator')

}

function created(componentDefinition) {
    
    return componentDefinition.getAnnotations(namespace.dcterms + 'created')

}

function modified(componentDefinition) {
    
    return componentDefinition.getAnnotations(namespace.dcterms + 'modified')

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
	uri: '/search/igemResults/' + base64.encode(resultUri),
	description: 'igem:' + resultUri.toString().replace(namespace.igem + "results/",'')
    }

}

function igemStatus(componentDefinition) {
    
    var statusUri = componentDefinition.getAnnotations(namespace.igem + 'status')
    return {
	uri: '/search/igemStatus/' + base64.encode(statusUri),
	description: 'igem:' + statusUri.toString().replace(namespace.igem + "status/",'')
    }

}

function igemPartStatus(componentDefinition) {
    
    return componentDefinition.getAnnotations(namespace.igem + 'partStatus')

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





