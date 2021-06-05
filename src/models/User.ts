import Sequelize, {DataTypes, Model, Optional} from 'sequelize';
import database from '../services/database';

interface UserInterface {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    readonly password: string;
}

interface UserCreationInterface extends Optional<UserInterface, "user_id"> {}

class User extends Model<UserInterface, UserCreationInterface> implements  UserInterface {
    public user_id: number;
    public first_name: string;
    public last_name: string;
    public email: string;
    public readonly password: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}

User.init({
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: DataTypes.STRING(128),
    last_name: DataTypes.STRING(128),
    email: DataTypes.STRING(),
    password: DataTypes.STRING()
}, { tableName: 'users', sequelize: database });

export default User;