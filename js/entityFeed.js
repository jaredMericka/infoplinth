
var feedsRegister = [];

function build_entityFeed (DOM)
{

	var entityId = DOM.getAttribute('id');
	var entityFeed = getDiv('entityFeed');

	entityFeed.lastCommentSeqNo = 0;

	entityFeed.classPrefix	= 'f_';
	entityFeed.entityId		= entityId;
	var className			= entityFeed.classPrefix + entityId;
	entityFeed.classList.add(className);

	entityFeed.onremove = function ()
	{
		feedsRegister.splice(feedsRegister.indexOf(this),1);
	};

	entityFeed.appendComments = function (comments)
	{
		var showNotification = this.lastCommentSeqNo ? true : false;

		for (var i in comments)
		{
			if (isNaN(i)) continue;

			var comment = comments[i];

			if (comment.seqNo <= this.lastCommentSeqNo) continue;

			var commentDiv		= getDiv('entityFeed_comment');

			var commentBody		= getDiv('entityFeed_commentBody');
			var commentMetadata	= getDiv('entityFeed_commentMetadata k');
			var commentName		= getDiv('entityFeed_commentName wh');

//			commentBody.appendChild(getText(comment.body));
			commentBody.innerHTML = textFormatter.formatString(comment.body, true);
			commentName.appendChild(getText(' ' + comment.creatorName + ' '));
			commentMetadata.appendChild(getText(getMetadataString(comment)));

			commentDiv.appendChild(commentName);
			commentDiv.appendChild(commentBody);
			commentDiv.appendChild(commentMetadata);

			this.appendChild(commentDiv);

			this.lastCommentSeqNo = comment.seqNo;
		}

		autoScrollByElement(this);
		if (showNotification) notify(this);
	};

	entityFeed.onfinalise = function ()
	{
		GetCommentsHandler(this.entityId, 0);
	};

	FinaliseEntityElementHandler(className);

	feedsRegister.push(entityFeed);

	return entityFeed;
}

function updateFeeds (forcedIds)
{
	var checkedIds = [];

	for (var i in feedsRegister)
	{
		if (isNaN(i)) continue;

		var feed = feedsRegister[i];

		if (checkedIds.indexOf(feed.entityId) >= 0) continue;

		GetCommentsHandler(feed.entityId, feed.lastCommentSeqNo);
		checkedIds.push(feed.entityId);
	}

	for (var i in forcedIds)
	{
		if (isNaN(i)) continue;

		if (checkedIds.indexOf(forcedIds[i]) >= 0) continue;

		GetCommentsHandler(forcedIds[i], 0);
		checkedIds.push(forcedIds[i]);
	}
}

//function conduit_finaliseFeed (currentId, attributeObject)
//{
//	var feeds = document.getElementsByClassName('f_' + currentId);
//
//	for (var i in feeds)
//	{
//		if (isNaN(i)) continue;
//
//		var feed = feeds[i];
//
//		for (var j in attributeObject)
//		{
//			feed[j] = attributeObject[j];
//
//			switch(j)
//			{
//				case 'entityId':
//					feed.setAttribute(j, attributeObject[j]);
//					feed.classList.remove('f_' + currentId);
//					feed.classList.add('f_' + attributeObject[j]);
//					break;
//			}
//		}
//
//		if (feed.onfinalise)
//		{
//			feed.onfinalise();
//		}
//	}
//
//	GetCommentsHandler(feed.entityId, 0);
//}

function conduit_appendComments (entityId, comments)
{
	var entityFeeds = document.getElementsByClassName('f_' + entityId);

	if (entityFeeds.length === 0)
	{
		var layoutXML = '<entityFeed id="' + entityId + '" />';
		var feedWindow = getCWindow(layoutXML, null, 'comment');
		feedWindow.focus();
		entityFeeds = document.getElementsByClassName('f_' + entityId);

		entityFeeds[0].onfinalise = function ()
		{
			feedWindow.setTitle(this.entityName);
		};
	}

	for (var i in entityFeeds)
	{
		if (isNaN(i)) continue;

		entityFeeds[i].appendComments(comments);
	}
}