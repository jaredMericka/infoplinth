<?php

class GetUserHandler extends Handler
{
	public function run ()
	{
		global $user;

		registerClientAction(CONDUIT_SET_USER_DETAILS, $user->getClientUser());
	}
}