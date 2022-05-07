const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define("activity", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		dificultad: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 5,
			},
		},
		duracion: {
			type: DataTypes.INTEGER,
            validator : { 
                min : 0
            }
		},
		temporada: {
			type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
		},
	});
};
