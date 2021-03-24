/**
 * The content of a message (in plain text).
 */
export type MessageContent = string | object;

/**
 * The address(es) used in messages, namely the recipient address.
 */
export type MessageAddress = string;

/**
 * The transaction hash of a message, generated when broading the message to the IOTA Tangle.
 */
export type MessageHash = string;
