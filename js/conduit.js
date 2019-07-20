
var conduit =
{
	'payload' : [],
	'register' : [],

	'sendTimer' : null,

	'add' : function (component)
	{
		var index = JSON.stringify(component);
		if (this.register.indexOf(index) >= 0) return;

		this.register.push(index);

		this.payload.push(component);

		if (this.sendTimer === null)
		{
			var that  = this;
			this.sendTimer = setTimeout(function ()
			{
				that.sendTimer = null;
				that.send();

			}, 100);
		}
	},

	'send' : function ()
	{
		if (!this.payload.length) return;

		var request = new XMLHttpRequest();
		var payload = JSON.stringify(this.payload);

		request.open("POST","server/conduit.php","true");
		request.setRequestHeader("Content-type","application/x-www-form-urlencoded");

		request.send('p=' + payload);

		request.onreadystatechange = function ()
		{
			if (this.readyState === 4 && this.status === 200)
			{
				try
				{
					var components = JSON.parse(this.responseText);
				}
				catch (e)
				{
					errorOutput('<rh> RESPONSE ERROR </rh>' + this.responseText);
//					alert(this.responseText);
					return;
				}

				if (components)
				{
					for (var index in components)
					{
						var component = components[index];

						var method = window[component.method];

						// Do checking for valid function here

						method.apply(window, component.params);
					}
				}
				else
				{
					// Some kind of JSON parse error on the returned data.
				}
			}
		};

		this.payload = [];
		this.register = [];
	}
};
