<?php

/** entityId, metadata */
const CONDUIT_ADD_METADATA = 'conduit_addMetadata';
/** <b>DEPRECATED</b> */
const CONDUIT_ALLOCATE_INCOMING_ENTITIES = 'conduit_allocateIncomingEntities';
/** entities */
const CONDUIT_ALLOCATE_TREE_VIEW_ENTITIES = 'conduit_allocateTreeViewEntities';
/** sourceTreeView, entity */
const CONDUIT_ALLOCATE_TREE_VIEW_ROOT_ENTITY = 'conduit_allocateTreeViewRootEntity';
/** entityId, comments */
const CONDUIT_APPEND_COMMENTS = 'conduit_appendComments';
/** entityId, messages */
const CONDUIT_APPEND_OUTPUT = 'conduit_appendOutput';
/** entityId */
const CONDUIT_CLEAR_FOCUS = 'conduit_clearFocus';
/** <b>DEPRECATED</b> */
const CONDUIT_CORRECT_FEED_ID = 'conduit_correctFeedId';
/** DOM, title, icon */
const CONDUIT_CREATE_CWINDOW = 'conduit_createCwindow';
/** message */
const CONDUIT_DEBUG_OUTPUT = 'conduit_debugOutput';
/** message */
const CONDUIT_ERROR_OUTPUT = 'conduit_errorOutput';
/** currentId, attributeObject */
const CONDUIT_FINALISE_ENTITY_ELEMENT = 'conduit_finaliseEntityElement';
/** <b>DEPRECATED</b> */
const CONDUIT_FINALISE_FEED = 'conduit_finaliseFeed';
/** currentId, attributeObject */
const CONDUIT_FINALISE_INPUT = 'conduit_finaliseInput';
/** currentId, attributeObject */
const CONDUIT_FINALISE_OUTPUT = 'conduit_finaliseOutput';
/** entityId, title, icon, originElementId */
const CONDUIT_OPEN_ENTITY = 'conduit_openEntity';
/** HTML, title, icon */
const CONDUIT_RENDER_HTML_IN_CWINDOW = 'conduit_renderHtmlInCwindow';
/** searchTerm, results */
const CONDUIT_RENDER_SEARCH_RESULTS = 'conduit_renderSearchResults';
/** entityId, label, context, data */
const CONDUIT_SET_CONTEXT = 'conduit_setContext';
/** <b>DEPRECATED</b> */
const CONDUIT_SET_USER_DETAILS = 'conduit_setUserDetails';

$conduitFunctionNames =
[
	'CONDUIT_ADD_METADATA' => 'conduit_addMetadata',
	'CONDUIT_ALLOCATE_INCOMING_ENTITIES' => 'conduit_allocateIncomingEntities',
	'CONDUIT_ALLOCATE_TREE_VIEW_ENTITIES' => 'conduit_allocateTreeViewEntities',
	'CONDUIT_ALLOCATE_TREE_VIEW_ROOT_ENTITY' => 'conduit_allocateTreeViewRootEntity',
	'CONDUIT_APPEND_COMMENTS' => 'conduit_appendComments',
	'CONDUIT_APPEND_OUTPUT' => 'conduit_appendOutput',
	'CONDUIT_CLEAR_FOCUS' => 'conduit_clearFocus',
	'CONDUIT_CORRECT_FEED_ID' => 'conduit_correctFeedId',
	'CONDUIT_CREATE_CWINDOW' => 'conduit_createCwindow',
	'CONDUIT_DEBUG_OUTPUT' => 'conduit_debugOutput',
	'CONDUIT_ERROR_OUTPUT' => 'conduit_errorOutput',
	'CONDUIT_FINALISE_ENTITY_ELEMENT' => 'conduit_finaliseEntityElement',
	'CONDUIT_FINALISE_FEED' => 'conduit_finaliseFeed',
	'CONDUIT_FINALISE_INPUT' => 'conduit_finaliseInput',
	'CONDUIT_FINALISE_OUTPUT' => 'conduit_finaliseOutput',
	'CONDUIT_OPEN_ENTITY' => 'conduit_openEntity',
	'CONDUIT_RENDER_HTML_IN_CWINDOW' => 'conduit_renderHtmlInCwindow',
	'CONDUIT_RENDER_SEARCH_RESULTS' => 'conduit_renderSearchResults',
	'CONDUIT_SET_CONTEXT' => 'conduit_setContext',
	'CONDUIT_SET_USER_DETAILS' => 'conduit_setUserDetails',
];
