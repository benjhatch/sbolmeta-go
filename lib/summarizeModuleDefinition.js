
var namespace = require('./namespace')
var summarizeGenericTopLevel = require('./summarizeGenericTopLevel')

var URI = require('sboljs').URI

function summarizeModuleDefinition(moduleDefinition) {

    if (moduleDefinition instanceof URI)
	return {
            uri: moduleDefinition + '',
	    id: moduleDefinition + ''
	}

    var summary = summarizeGenericTopLevel(moduleDefinition)

    summary = Object.assign(summary,{
        numSubModules: moduleDefinition.modules.length,
        numSubModulesTotal: 0,
    })

    var uploadedBy = moduleDefinition.getAnnotation(namespace.synbiohub + 'uploadedBy')

    if(uploadedBy) {

        summary.synbiohub = {
            uploadedBy: uploadedBy
        }
    }

    return summary
}

module.exports = summarizeModuleDefinition





