import { Model, DataTypes } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password_hash: DataTypes.STRING,
                admin: DataTypes.BOOLEAN,
            },
            {
                sequelize,
                modelName: 'User',
            }
        );
        return this;
    }
}

export default User;
