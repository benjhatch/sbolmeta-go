
var namespace = require('./namespace')

function summarizeProtein(componentDefinition) {

    var summary = {
    }

    var pI = componentDefinition.getAnnotations(namespace.sybio + 'pI')

    if(pI.length > 0) {
        summary.pI = pI[0]
    }

    return summary
}

module.exports = summarizeProtein

