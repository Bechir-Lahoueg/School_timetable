import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Pour l'animation

const MenuHome = () => {
  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('./homee.png')", // Assure-toi que l'image est bien dans le dossier public
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Conteneur principal pour centrer le texte et bouton */}
      <motion.div
        className="absolute top-1/4 text-left px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{ left: '5%' }} // Déplace le texte plus à gauche
      >
        <motion.div
          className="text-6xl lg:text-8xl font-bold text-[#3b82f6] mb-4" // Couleur bleu pour "Plateforme"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Plateforme
        </motion.div>

        <motion.div
          className="text-4xl font-bold text-[#b24c6a] mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Gestion étudiants
        </motion.div>

        <motion.div
          className="text-4xl font-bold text-[#b24c6a] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ marginLeft: '200px' }} // Déplace le "et" un peu plus à l'avant
        >
          et emplois du temps
        </motion.div>

        {/* Bouton sous le texte, déplacé à droite */}
        <Link to="/login">
          <button
            className="bg-[#b24c6a] hover:bg-[#9e2145] text-white py-3 px-8 rounded-md text-lg shadow-lg transition-all duration-300 ease-in-out ml-20"
          >
            Consulter votre emploi du temps
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default MenuHome;
