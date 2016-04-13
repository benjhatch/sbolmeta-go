
var namespace = require('./namespace')

function summarizeProtein(componentDefinition) {

    var summary = {
    }

    var pI = componentDefinition.getAnnotations(namespace.sybio + 'pI')

    if(pI.length > 0) {
        summary.pI = pI[0]
    }

    var encodedBy = componentDefinition.getAnnotations(namespace.sybio + 'en_by')

    if(encodedBy.length > 0) {

        summary.encodedBy = encodedBy

    }

    return summary
}

module.exports = summarizeProtein

