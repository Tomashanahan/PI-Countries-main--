const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("country", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { args: true, msg: "Falta el nombre" },
			},
		},
		img_bandera: {
			type: DataTypes.STRING,
			allowNull: false,
			validator: {
				isUrl: true,
				notNull: { args: true, msg: "Falta el img" },
			},
		},
		continente: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { args: true, msg: "Falta el continente" },
			},
		},
		capital: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: { args: true, msg: "Falta el capital" },
			},
		},
		subregion: {
			type: DataTypes.STRING,
		},
		area: {
			type: DataTypes.STRING,
		},
		poblacion: {
			type: DataTypes.INTEGER,
			validator: {
				min: 0,
			},
		},
	},
	{
		timestamps : false
	}
	);
};
