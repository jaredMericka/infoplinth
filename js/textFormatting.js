////////////////////////////////////////////////////////////////////////////////
//
//	AT SOME POINT YOU NEED TO WEED ALL THIS DUPLICATED
//	CAPABILITY OUT OF ENTITYINPUT.JS!
//
////////////////////////////////////////////////////////////////////////////////

textFormatter = {

	'formatString' : function (string, stripTags)
	{
		this.string = string;
		this.stripTags = stripTags ? true : false;

		this.chars = this.string.split('');
		this.iPoints = new Array(this.chars.length);

	//	this.chars.push('&nbsp;');
		this.chars.push(' ');

		// Remove potential html tag or entity characters
		this.replaceChars('<', '&lt;');
		this.replaceChars('>', '&gt;');
		this.replaceChars('&', '&amp;');

		// This makes it possible to see the caret and selection across new lines
		this.replaceChars('\n', '&nbsp;\n');

//		var isCommand = this.string[0] === '>';

		this.renderText();

		this.resolveInjections();

		var displayString = this.chars.join('');

		return displayString;
	},

	////////////////////////////////////////////////////////////////////////////////
	//
	//	SELECTIVE RENDER FUNCTIONS
	//
	////////////////////////////////////////////////////////////////////////////////

	'renderText' : function ()
	{
		this.formatTag('r');
		this.formatTag('g');
		this.formatTag('b');
		this.formatTag('c');
		this.formatTag('y');
		this.formatTag('m');
		this.formatTag('rh');
		this.formatTag('gh');
		this.formatTag('bh');
		this.formatTag('ch');
		this.formatTag('yh');
		this.formatTag('mh');
		this.formatTag('ru');
		this.formatTag('gu');
		this.formatTag('bu');
		this.formatTag('cu');
		this.formatTag('yu');
		this.formatTag('mu');

		this.formatTag('rb');
		this.formatTag('rbh');
		this.formatTag('rbu');
		this.formatTag('sv');
	},

	////////////////////////////////////////////////////////////////////////////////
	//
	//	PARSING & PRESENTATION FUNCTIONS
	//
	////////////////////////////////////////////////////////////////////////////////

	'inject' : function (tag, index)
	{
		if (this.iPoints[index])
		{
			var otherTag = tag.opposite();
			for (var i in this.iPoints[index])
			{
				if (otherTag.equals(this.iPoints[index][i]))
				{
					this.iPoints[index][i] = undefined;
					return;
				}
			}
		}
		else
		{
			this.iPoints[index] = [];
		}

		if (tag.isOpenTag)
		{
			this.iPoints[index].push(tag);
		}
		else
		{
			this.iPoints[index].unshift(tag);
		}

	},

	'resolveInjections' : function ()
	{
		var currentState = {
			'order': []
		};
		var reps		= this.iPoints.length;
		var openTags	= 0;

		for (var stringIndex = 0; stringIndex <= reps; stringIndex++)
		{
			if (this.iPoints[stringIndex])
			{
				var currentTags = this.iPoints[stringIndex];

				for (var currentTagIndex in currentTags)
				{
					var tag = currentTags[currentTagIndex];

					if (!tag) continue;

					if (tag.isOpenTag)
					{
						// We're opening a new tag.

						if (currentState[tag.type] === undefined) currentState[tag.type] = 0;

	//					var beforeState = Boolean(currentState[tag.type]);
						currentState[tag.type]++;

						currentState.order.push(tag.type);
					}
					else
					{

						// We're attempting to close a tag.

						if (currentState[tag.type] === undefined || currentState[tag.type] < 1)
						{
	//						alert('Attempting to close tag that was never opened.');
							continue;
						}

						currentState[tag.type]--;

						var lastIndex = currentState.order.lastIndexOf(tag.type);

						currentState.order.splice(lastIndex, 1);
					}

					// End of current tags
				}

				var tagString = ('</span>').repeat(openTags);

				for (var i in currentState.order)
				{
					tagString = tagString + '<span class="' + currentState.order[i] + '">';
				}
				openTags = currentState.order.length;


	//			this.iPoints[stringIndex] = '</span><span class = "' + currentState.order.join(' ') + '">';
				this.iPoints[stringIndex] = tagString;

			}
		}

		for (var stringIndex = reps; stringIndex >= 0; stringIndex--)
		{
			if (this.iPoints[stringIndex])
			{
				Array.prototype.splice.call(this.chars, stringIndex, 0, this.iPoints[stringIndex]);
			}
		}
	},

	'indexesOf' : function (string)
	{
		var index = undefined;
		var indexes = [];

		do
		{
			index = this.string.indexOf(string, index +1);
			if (index !== -1) indexes.push(index);
		}
		while (index !== -1)

		return indexes;
	},

	'replaceChars' : function (char, replacement)
	{
		var indexes = this.indexesOf(char);

		for (var i in indexes)
		{
			this.chars[indexes[i]] = replacement;
		}
	},

	'tagString' : function (string, tag)
	{
		var indexes = this.indexesOf(string);
		var offset = string.length;

		var open = new Tag(tag);
		var close = new Tag('/' + tag);

		for (var i in indexes)
		{
			this.inject(open, indexes[i]);
			this.inject(close, indexes[i] + offset);
		}
	},

	'removeString' : function (string)
	{
		var indexes = this.indexesOf(string);
		var offset = string.length;

		for (var i in indexes)
		{
			for (var j = 0; j < offset; j++)
			{
				this.chars[indexes[i] + j] = '';
			}
		}
	},

	'injectBefore' : function (string, tag)
	{
		var indexes = this.indexesOf(string);

		var iTag = new Tag(tag);

		for (var i in indexes)
		{
			this.inject(iTag, indexes[i]);
		}
	},

	'injectAfter' : function (string, tag)
	{
		var indexes = this.indexesOf(string);
		var offset = string.length;
		var iTag = new Tag(tag);

		for (var i in indexes)
		{
			this.inject(iTag, indexes[i] + offset);
		}
	},

	'formatTag' : function (tag)
	{
		this.injectAfter('[' + tag + ']', tag);
		this.injectBefore('[/' + tag + ']', '/' + tag);

		if (this.stripTags)
		{
			this.removeString('[' + tag + ']');
			this.removeString('[/' + tag + ']');
		}
		else
		{
			this.tagString('[' + tag + ']', 'k');
			this.tagString('[/' + tag + ']', 'k');
		}
	}
};