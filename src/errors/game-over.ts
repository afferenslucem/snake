export class GameOver extends Error {
    public constructor(message?: string) {
        super(message);
    }
}
