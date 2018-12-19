
var namespace = require('./namespace')
var summarizeGenericTopLevel = require('./summarizeGenericTopLevel')

var URI = require('sboljs').URI

function summarizeModel(model) {

    if (model instanceof URI)
	return {
            uri: model + '',
	    id: model + ''
	}

    var summary = summarizeGenericTopLevel(model)

    return Object.assign(summary,{
        modelSource: modelSource(model),
        framework: framework(model),
	language: language(model),
    })
}

function modelSource(model) {
    return model.source
}

function framework(model) {
    return {
	uri: model.framework,
	name: mapFramework(model.framework)
    }
}

function mapFramework(encoding) {

    return ({
	"http://identifiers.org/biomodels.sbo/SBO:0000004": "Modeling Framework",
	"http://identifiers.org/biomodels.sbo/SBO:0000062": "Continuous Framework",
	"http://identifiers.org/biomodels.sbo/SBO:0000293": "Non-spatial Continuous Framework",
	"http://identifiers.org/biomodels.sbo/SBO:0000292": "Spatial Continuous Framework",
	"http://identifiers.org/biomodels.sbo/SBO:0000063": "Discrete Framework", 
	"http://identifiers.org/biomodels.sbo/SBO:0000295": "Non-spatial Discrete Framework", 
	"http://identifiers.org/biomodels.sbo/SBO:0000294": "Spatial Discrete Framework",
	"http://identifiers.org/biomodels.sbo/SBO:0000624": "Flux Balance Framework",
	"http://identifiers.org/biomodels.sbo/SBO:0000234": "Logical Framework",
	"http://identifiers.org/biomodels.sbo/SBO:0000547": "Boolean Logical Framework"
    })[encoding]

}

function language(model) {
    return {
	uri: model.language,
	name: mapLanguage(model.language)
    }
}

function mapLanguage(encoding) {

    return ({
	"http://identifiers.org/edam/format_1915": "Format",
	"http://identifiers.org/edam/format_2585": "SBML",
	"http://identifiers.org/edam/format_3240": "CellML",
	"http://identifiers.org/edam/format_3156": "BioPAX"
    })[encoding]

}

module.exports = summarizeModel

