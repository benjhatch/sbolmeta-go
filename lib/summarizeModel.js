
var namespace = require('./namespace')

function summarizeModel(model) {

    return {
        uri: model.uri + '',
        name: name(model),
        id: id(model),
        pid: pid(model),
        version: version(model),
        wasDerivedFrom: wasDerivedFrom(model),
	creator: creator(model),
	created: created(model),
	modified: modified(model),
        igemDescription: igemDescription(model),
        igemNotes: igemNotes(model),
        dcTermsSource: dcTermsSource(model),
        igemResults: igemResults(model),
        igemStatus: igemStatus(model),
        igemPartStatus: igemPartStatus(model),
        description: description(model),

        source: source(model),
        framework: framework(model),
	language: language(model),

	comments: comments(model),
        labels: labels(model),
    }
}

function name(model) {

    return model.name || model.displayId

}

function id(model) {

    return model.displayId /* or last fragment of URI? */

}

function pid(model) {

    return model.persistentIdentity

}

function version(model) {

    return model.version

}

function wasDerivedFrom(model) {

    return model.wasDerivedFrom

}

function source(model) {
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

function description(model) {

    if(model.description)
        return model.description

    var commentAnnotations = comments(model)

    if(commentAnnotations)
        return commentAnnotations.join('\n')

    return ''
}

function creator(model) {
    
    var creatorStr = model.getAnnotations(namespace.dcterms + 'creator')
    return {
	description: creatorStr
    }
    
}

function created(model) {
    
    
    var resultStr = model.getAnnotations(namespace.dcterms + 'created')
    return {
	name: resultStr,
	description: resultStr.toString().replace('T',' ').replace('Z','')
    }
}

function modified(model) {
    
    var resultStr = model.getAnnotations(namespace.dcterms + 'modified')
    return {
	name: resultStr,
	description: resultStr.toString().replace('T',' ').replace('Z','')
    }
}

function igemDescription(model) {
    
    return model.getAnnotations(namespace.igem + 'description')

}

function igemNotes(model) {
    
    return model.getAnnotations(namespace.igem + 'notes')

}

function dcTermsSource(model) {
    
    return model.getAnnotations(namespace.dcterms + 'source')

}

function igemResults(model) {
    
    var resultUri = model.getAnnotations(namespace.igem + 'results')
    return {
	uri: resultUri,
	description: resultUri.toString().replace(namespace.igem + "results/",'')
    }

}

function igemStatus(model) {
    
    var statusUri = model.getAnnotations(namespace.igem + 'status')
    return {
	uri: statusUri,
	description: statusUri.toString().replace(namespace.igem + "status/",'')
    }

}

function igemPartStatus(model) {
    
    var partStatusStr = model.getAnnotations(namespace.igem + 'partStatus')
    return {
	description: partStatusStr
    }

}

function labels(model) {
    
    return model.getAnnotations(namespace.rdfs + 'label')

}

function comments(model) {

    return model.getAnnotations(namespace.rdfs + 'comment')

}

module.exports = summarizeModel
