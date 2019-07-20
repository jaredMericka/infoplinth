
function build_entityOutput (DOM)
{
	var entityId = DOM.getAttribute('id');

	var entityOutput = getDiv('entityOutput');
	entityOutput.entityId = entityId;

	entityOutput.classPrefix	= 'o_';
	entityOutput.entityId		= entityId;
	var className				= entityOutput.classPrefix + entityId;
	entityOutput.classList.add(className);

	entityOutput.setAttribute('entityId', entityId);

	entityOutput.appendOutput = function (messages)
	{
		for (var i in messages)
		{
			if (isNaN(i)) continue;

			var message = messages[i];

			var messageDiv = getDiv('entityOutput_outputMessage');
			var bodyDiv = getDiv('entityOutput_outputBody');
			var metadataDiv = getDiv('entityOutput_outputMetadata k');

			messageDiv.appendChild(bodyDiv);
			messageDiv.appendChild(metadataDiv);
			bodyDiv.innerHTML = message.body;
			metadataDiv.appendChild(getText(getMetadataString(message)));

			this.appendChild(messageDiv);
		}

		notify(this);
		autoScrollByElement(this);
	};

	entityOutput.onresize = function ()
	{
		autoScrollByElement(this);
	};

//	FinaliseOutputHandler(entityOutput.entityId);
	FinaliseEntityElementHandler(className);

	return entityOutput;
}

function conduit_finaliseOutput (currentId, attributeObject)
{
	var outputs = document.getElementsByClassName('o_' + currentId);

	for (var i in outputs)
	{
		if (isNaN(i)) continue;

		var output = outputs[i];

		for (var j in attributeObject)
		{
			output[j] = attributeObject[j];

			switch(j)
			{
				case 'entityId':
					output.setAttribute(j, attributeObject[j]);
					output.classList.remove('o_' + currentId);
					output.classList.add('o_' + attributeObject[j]);
					break;
			}
		}

		if (output.onfinalise)
		{
			output.onfinalise();
		}
	}
}

function conduit_appendOutput (entityId, messages)
{
	var outputs = document.getElementsByClassName('o_' + entityId);

	if (outputs.length === 0)
	{
		var layoutXML = '<entityOutput id="' + entityId + '" />';
		var outputWindow = getCWindow(layoutXML, null, 'desktop');
		outputWindow.focus();
		outputs = document.getElementsByClassName('o_' + entityId);

		outputs[0].onfinalise = function ()
		{
			outputWindow.setTitle(this.entityName);
		};
	}

	for (var i in outputs)
	{
		if (isNaN(i)) continue;

		var output = outputs[i];

		output.appendOutput(messages);
	}
}