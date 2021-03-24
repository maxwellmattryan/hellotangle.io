/**
 * The PostgreSQL error codes packed into an easily accessible enum with the most commonly encountered errors.
 * @property NOT_NULL_VIOLATION 23502
 * @property FOREIGN_KEY_VIOLATION 23503
 * @property UNIQUE_VIOLATION 23505
 * @property VALUE_TOO_LONG 22001
 */
export enum PostgresErrors {
    NOT_NULL_VIOLATION = '23502',
    FOREIGN_KEY_VIOLATION = '23503',
    UNIQUE_VIOLATION = '23505',
    VALUE_TOO_LONG = '22001'
}
