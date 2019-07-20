
entityRegistry = {};

treeViewEntityRegistry =
{
	'entities' : {},

	'lostChildren' : {},

	'register' : function (entity)
	{
		var key			= '_' + entity.id;
		var parentKey	= '_' + entity.parentId;
		var parentEntity;

		entity.registered = true;
		entity.hasFetched = false;

		// Update or add?
		if (this.entities[key])
		{
			// Update!
			var existingEntity = this.entities[key];

			if (existingEntity.checksum === entity.checksum)
			{
				// This entity is already here and established.

				return existingEntity;
			}
			else
			{
				// The entity is different so we need to change some shit.


			}
		}
		else
		{
			// Add!
			this.entities[key] = entity;

			// Look for lost children
			if (this.lostChildren[key])
			{
				entity.children = this.lostChildren[key];
				delete this.lostChildren[key];
			}
		}

		// Link to parent
		if (this.entities[parentKey])
		{
			var parentEntity = this.entities[parentKey];

			if (!parentEntity.children) parentEntity.children = {};

			parentEntity.children[key] = entity;

			for (var i in parentEntity.divs)
			{
				if (isNaN(i)) continue;

				parentEntity.divs[i].expanderIcon.style.display = 'block';
//				parentEntity.divs[i].toggleExpanded(true);
			}
		}
		else
		{
			if (!this.lostChildren[parentKey]) this.lostChildren[parentKey] = {};

			this.lostChildren[parentKey][key] = entity;
		}

		return entity;
	}
};

function build_treeView (DOM)
{
	var rootNodeId = DOM.getAttribute('id');

	var treeView = getDiv('treeView', getGuiHash());
	treeView.entityDivs = {};
	treeView.scrollDiv = getDiv('treeView_scrollDiv');
	treeView.appendChild(treeView.scrollDiv);

	treeView.addEntity = function (newEntity)
	{
		newEntity.parentEntity	= null;
		newEntity.nestLevel		= 0;

		var entityDiv = getTreeViewEntity(newEntity);

		newEntity = entityDiv.entity;

		entityDiv.treeView = this;

		//	Make it all part of the TreeView.

		if (this.entityDivs['_' + newEntity.id] !== undefined)
		{
			//	This node is already present. We'll need to do something here at
			//	some point but just ditch for now.

			return;
		}

		this.entityDivs['_' + newEntity.id] = entityDiv;

		var parentEntityDiv = this.entityDivs['_' + newEntity.parentId];

		if (parentEntityDiv)
		{
			parentEntityDiv.childContainerDiv.appendChild(entityDiv);
			entityDiv.nestLevel = parentEntityDiv.nestLevel + 1;
		}
		else
		{
			this.scrollDiv.appendChild(entityDiv);
			entityDiv.nestLevel = 0;
		}

		entityDiv.rowContentDiv.style.marginLeft = (20 * entityDiv.nestLevel) + 'px';

		if (newEntity.children)
		{
			// Looks like we've got this node in another treeView so let's use
			// that data to populate this one, too.
			for (var i in newEntity.children)
			{
				if (i[0] === '_') this.addEntity(newEntity.children[i]);
			}
		}

	};

	GetTreeViewRootEntityHandler(treeView.id, rootNodeId);

	return treeView;
}

function getTreeViewEntity (entity)
{
	if (!entity.registered)
	{
		debugOutput('Attempting to add an unregistered entity to a treeView!', 'r');
	}

	var entityDiv = getDiv('treeView_div treeView_' + entity.id);

	entityDiv.entity = entity;
	entityDiv.treeView = null;

	if (entity.divs)
	{
		entity.divs.push(entityDiv);
	}
	else
	{
		entity.divs = new Array(entityDiv);
	}

	entityDiv.onremove = function ()
	{
		arrayRemove(this.entity.divs, this);
	};

	entityDiv.toggleExpanded	= function (expanded)
	{
		if (expanded !== undefined)
		{
			this.expanded = expanded;
		}
		else
		{
			this.expanded = !this.expanded;
		}

		if (this.expanded)
		{
			this.childContainerDiv.style.display = 'block';

			if (!this.entity.hasFetched)
			{
				//	This node has never been expanded so we need to fetch
				//	the child entities.
				GetTreeViewEntitiesHandler(this.entity.id);
				this.entity.hasFetched = true;
			}
			else
			{

			}

			this.expanderIcon.classList.add('fa-minus');
			this.expanderIcon.classList.remove('fa-plus');
		}
		else
		{
			this.childContainerDiv.style.display = 'none';

			this.expanderIcon.classList.add('fa-plus');
			this.expanderIcon.classList.remove('fa-minus');
		}
	};

	entityDiv.rowDiv			= getDiv('treeView_rowDiv');
	entityDiv.rowDiv.setAttribute('focused', 'false');

	entityDiv.rowContentDiv		= getDiv('treeView_rowContentDiv');

	var iconName = entity.type ? entity.type.toLowerCase() : 'cube';
	entityDiv.icon				= getFaIcon(iconName + ' treeView_entityIcon');

	entityDiv.labelDiv			= getDiv('treeView_label');
	entityDiv.childContainerDiv	= getDiv('treeView_childContainer treeView_children_' + entity.id);
	entityDiv.expanderIcon		= getFaIcon('plus treeView_expander');

	entityDiv.labelDiv.onclick = function(e)
	{
		openEntity(entity.id, this.id);
//		entityDiv.toggleExpanded(true);
	};

	entityDiv.rowContentDiv.appendChild(entityDiv.expanderIcon);
	entityDiv.rowContentDiv.appendChild(entityDiv.icon);
	entityDiv.rowContentDiv.appendChild(entityDiv.labelDiv);

	entityDiv.rowDiv.appendChild(entityDiv.rowContentDiv);

	entityDiv.appendChild(entityDiv.rowDiv);
	entityDiv.appendChild(entityDiv.childContainerDiv);

	entityDiv.labelDiv.appendChild(document.createTextNode(entity.name));

	entityDiv.expanderIcon.style.display = entity._childCount ? 'block' : 'none';
	entityDiv.expanderIcon.onclick = function () { entityDiv.toggleExpanded(); };

	return entityDiv;
}

////////////////////////////////////////////////////////////////////////////////
//
//	CONDUIT FUNCTIONS
//
////////////////////////////////////////////////////////////////////////////////

function conduit_allocateTreeViewRootEntity (sourceTreeView, entity)
{
	entity = treeViewEntityRegistry.register(entity);

	var treeView = document.getElementById(sourceTreeView);

	if (!treeView)
	{
		// Oosenupt - log this maybe?
		return;
	}

	treeView.addEntity(entity);
}

function conduit_allocateTreeViewEntities (entities)
{
	for (var i in entities)
	{
		if (isNaN(i)) continue;
		var entity = treeViewEntityRegistry.register(entities[i]);

		var parentNodes = document.getElementsByClassName('treeView_' + entity.parentId);

		for (var j in parentNodes)
		{
			if (isNaN(j)) continue;
			var parentNode = parentNodes[j];

			parentNode.treeView.addEntity(entity);
		}
	}
}