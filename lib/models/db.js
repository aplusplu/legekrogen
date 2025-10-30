const mongoose = require("mongoose");

// Opretter en asynkron funktion til at forbinde til MongoDB
const connectDB = async () => {
  try {
    // Forsøger at forbinde til MongoDB med connection string
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Hvis forbindelsen lykkes, log besked med host navn
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Hvis der sker en fejl, log fejlbesked og afslut programmet
    console.error(`MongoDB Fejl: ${error.message}`);

    //Koden (1) betyder en fejltilstand. Process.exit stopper programmet med det samme, uden at vente.
    process.exit(1);
  }
};

// Eksporterer connectDB funktionen som module
module.exports = connectDB;
