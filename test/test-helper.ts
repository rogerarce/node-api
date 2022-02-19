import { Connection, createConnection } from "typeorm";
import Database from "better-sqlite3";
import { User, Todos } from "../src/models";

export default class TestHelper {
    private static _instance: TestHelper;

    private dbConnection: Connection;

    private testDatabase: any;

    constructor() {}

    public static get instance(): TestHelper {
        if (!this._instance) {
            this._instance = new TestHelper();
        }

        return this._instance;
    }

    async setupDatabase() {
        this.testDatabase = new Database(':memory:');

        this.dbConnection = await createConnection({
            type: 'better-sqlite3',
            name: 'default',
            database: ':memory:',
            entities: [
                User,
                Todos,
            ],
            synchronize: true,
            logging: false,
        })
    }

    teardownTestDB() {
        this.testDatabase.close();
        this.dbConnection.close();
    }
}