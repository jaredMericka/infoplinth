
function build_entityMetadata (DOM)
{
	var entityMetadata = getDiv('entityMetadata');

	var entityId = DOM.getAttribute('id');

	entityMetadata.classPrefix	= 'm_';
	entityMetadata.entityId		= entityId;
	var className				= entityMetadata.classPrefix + entityId;
	entityMetadata.classList.add(className);

	entityMetadata.table = document.createElement('table');
	entityMetadata.table.className = 'entityMetadata_table';

	entityMetadata.appendChild(entityMetadata.table);

	entityMetadata.metadata = {};

	entityMetadata.populate = function (metadata)
	{
		for (var i in metadata)
		{
			if (isNaN(i)) continue;

			var metadatum = metadata[i];

			if (metadatum.remove)
			{
				delete this.metadata[metadatum.name];
			}
			else
			{
				this.metadata[metadatum.name] = metadatum;
			}
		}

		this.displayMetadata();
	};

	entityMetadata.displayMetadata = function ()
	{
		this.table.innerHTML = '';

		var tableHeader = document.createElement('tr');

		var typeHeader	= document.createElement('th');
		var nameHeader	= document.createElement('th');
		nameHeader.setAttribute('colspan', 2); // This is to make sure the badge is under the name header
		var valueHeader	= document.createElement('th');

		tableHeader.appendChild(typeHeader);
		tableHeader.appendChild(nameHeader);
		tableHeader.appendChild(valueHeader);

		typeHeader.appendChild(getText('Type'));
		nameHeader.appendChild(getText('Name'));
		valueHeader.appendChild(getText('Value'));

		this.table.appendChild(tableHeader);

		for (var label in this.metadata)
		{

			var metadatum = this.metadata[label];

			var mdRow		= document.createElement('tr');

			var typeCell	= document.createElement('td');
			var badgeCell	= document.createElement('td');
			var nameCell	= document.createElement('td');
			var valueCell	= document.createElement('td');

			typeCell.className = 'k';
			badgeCell.className = 'entityMetadata_badgeCell';

			mdRow.appendChild(typeCell);
			mdRow.appendChild(badgeCell);
			mdRow.appendChild(nameCell);
			mdRow.appendChild(valueCell);

			typeCell.appendChild(getText(metadatum.type));
			nameCell.appendChild(getText(label));
			valueCell.innerHTML = this.renderMetadataValue(metadatum.type, metadatum.value);

			// Colour the name cell
			if (metadatum.systemDefined)
			{
				badgeCell.appendChild(getFaIcon('cogs', 'System metadatum'));
				nameCell.classList.add('g');
			}
			else if (metadatum.typeDefined)
			{
				nameCell.classList.add('c');
			}
			else
			{
//				nameCell.classList.add('b');
			}

			this.table.appendChild(mdRow);
		}
	};

	entityMetadata.renderMetadataValue = function (type, value)
	{
		var newValue = '';

		switch (type)
		{
			case 'id':
				newValue = '<b>' + value + '</b>';
				break;
			case 'text':
				newValue = textFormatter.formatString(value);
				break;
			case 'number':
				newValue = '<c>' + value + '</c>';
				break;
			case 'date':
				newValue = value;
				break;
			case 'boolean':
				newValue = '<i class="fa fa-' + (value ? 'check g' : 'close r') + '"></i>';
				break;
		}

		return newValue;
	};

	entityMetadata.onfinalise = function ()
	{
		GetMetadataHandler(this.entityId);
	};

	FinaliseEntityElementHandler(className);

	return entityMetadata;
}

function conduit_addMetadata (entityId, metadata)
{
	var metadataLists = document.getElementsByClassName('m_' + entityId);

	if (metadataLists.length === 0)
	{
		var layoutXML = '<entityMetadata id="' + entityId + '" />';
		var outputWindow = getCWindow(layoutXML, null, 'tags');
		outputWindow.focus();
		metadataLists = document.getElementsByClassName('m_' + entityId);

		metadataLists[0].onfinalise = function ()
		{
			outputWindow.setTitle(this.entityName);
		};
	}

	for (var i in metadataLists)
	{
		if (isNaN(i)) continue;

		var metadataList = metadataLists[i];

		metadataList.populate(metadata);
	}
}