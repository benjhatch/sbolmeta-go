
var namespace = require('./namespace')

var summarizeProtein = require('./summarizeProtein')
var summarizeSequence = require('./summarizeSequence')
var summarizeGenericTopLevel = require('./summarizeGenericTopLevel')

var URI = require('sboljs').URI

function summarizeComponentDefinition(componentDefinition) {

    if (componentDefinition instanceof URI)
	return {
            uri: componentDefinition + '',
	    id: componentDefinition + ''
	}

    var summary = summarizeGenericTopLevel(componentDefinition)

    summary = Object.assign(summary,{

        sbhBookmark: sbhBookmark(componentDefinition),
        sbhStar: sbhStar(componentDefinition),
        igemDominant: igemDominant(componentDefinition),
        igemDiscontinued: igemDiscontinued(componentDefinition),
        isReplacedBy: isReplacedBy(componentDefinition),
        type: type(componentDefinition),
        types: types(componentDefinition),

        roles: roles(componentDefinition),

        numSubComponents: componentDefinition.components.length,
        numSubComponentsTotal: 0,
        numSequences: 0,

        sequences: sequences(componentDefinition)
    })
    console.log("1:"+JSON.stringify(summary))
    
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

function igemDominant(componentDefinition) {
    
    var dominantStr = componentDefinition.getAnnotations(namespace.igem + 'dominant')
    return {
	description: dominantStr
    }

}

function isReplacedBy(componentDefinition) {
    
    var isReplacedByUri = componentDefinition.getAnnotations(namespace.dcterms + 'isReplacedBy')
    return {
	uri: isReplacedByUri
    }

}

function sbhBookmark(componentDefinition) {
    
    var bookmarkStr = componentDefinition.getAnnotations(namespace.synbiohub + 'bookmark')
    return {
	description: bookmarkStr
    }

}

function sbhStar(componentDefinition) {
    
    var starStr = componentDefinition.getAnnotations(namespace.synbiohub + 'star')
    return {
	description: starStr
    }

}

function igemDiscontinued(componentDefinition) {
    
    var discontinuedStr = componentDefinition.getAnnotations(namespace.igem + 'discontinued')
    return {
	description: discontinuedStr
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

        for(var i = 0; i < namespace.go.length; ++ i) {

            var prefix = namespace.go[i]

            if(uri.indexOf(prefix) === 0) {

                var goTerm = uri.slice(prefix.length).split('_').join(':')

                var geneOntology = require('./gene-ontology')

                return {
                    uri: uri,
                    term: goTerm,
                    description: geneOntology[goTerm]
                }
            }
        }

        return {
            uri: uri
        }
    })
}





