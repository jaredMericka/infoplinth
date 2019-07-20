<?php if(false){ ?><script><?php }

class CancelCommand extends ClientCommand
{
	public $aliases = ['cn', 'cncl'];

	public function getDescription()
	{
		return 'Cancels the current comment context.';
	}

	public function getInputTypes()
	{
		return [];
	}

	public function clientJs()
	{ ?>

	this.clearContext();
	this.clear();
	this.focus();

<?php }
}
