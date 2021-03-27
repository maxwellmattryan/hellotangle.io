/**
 * The deserializable base interface for all models.
 */
export interface Deserializable<T> {
    /**
     * Deserializes the input for corresponding model.
     * @param input The data to be deserialized, typically the corresponding model.
     * @returns `this`, the current object
     * @internal
     */
    deserialize(input: any): this;
}
