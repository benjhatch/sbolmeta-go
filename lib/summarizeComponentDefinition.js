
var namespace = require('./namespace')

var summarizeProtein = require('./summarizeProtein')

function summarizeComponentDefinition(componentDefinition) {

    var summary = {

        name: name(componentDefinition),
        description: description(componentDefinition),
        type: type(componentDefinition),

        numSubComponents: 0,
        numSubComponentsTotal: 0,
        numSequences: 0,

        comments: comments(componentDefinition),
        labels: labels(componentDefinition)
    }

    switch(summary.type) {

        case 'Protein':
            summary.protein = summarizeProtein(componentDefinition)
            break
    }

    return summary
}

module.exports = summarizeComponentDefinition


function name(componentDefinition) {

    return componentDefinition.name || componentDefinition.displayId

}

function description(componentDefinition) {

    if(componentDefinition.description)
        return componentDefinition.description

    var labelAnnotations = labels(componentDefinition)

    if(labelAnnotations)
        return labelAnnotations.join('\n')

    return ''
}

function labels(componentDefinition) {
    
    return componentDefinition.getAnnotations(namespace.rdfs + 'label')

}

function comments(componentDefinition) {

    return componentDefinition.getAnnotations(namespace.rdfs + 'comment')

}






